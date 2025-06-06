import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Group, Paper, TextInput } from '@mantine/core';
import { useContrastColor } from '../../theme/useContrastColor';
import { usePrimaryColor } from '../../theme/usePrimaryColor';
import classes from './ContactForm.module.css';

export default function ContactForm() {
  const formRef = useRef();
  const navColor = usePrimaryColor(9, 1);
  const contrastColor = useContrastColor(9, 1);
  const [turnstilePassed, setTurnstilePassed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const scriptId = 'cf-turnstile-script';

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.id = scriptId;

      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    window.onTurnstileSuccess = (token) => {
      setTurnstilePassed(true);
      // optionally: store token if sending to backend
    };

    window.onTurnstileExpired = () => {
      setTurnstilePassed(false);
    };

    window.onTurnstileError = () => {
      setTurnstilePassed(false);
      console.error('Turnstile encountered an error.');
    };
  }, []);

  const sendEmail = async () => {
    if (!turnstilePassed) {
      Swal.fire({
        icon: 'warning',
        title: 'Hold Up',
        text: 'Please verify you are human before submitting.',
      });
      return;
    }
    try {
      Swal.fire({
        title: 'Sending...',
        text: 'Your message is on its way.',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      Swal.fire({
        icon: 'success',
        title: 'Message Sent',
        text: 'We will get back to you soon.',
        timer: 3000,
        showConfirmButton: false,
      });

      reset();
    } catch (error) {
      console.error('Email send failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
      });
      window.turnstile?.reset(); // Resets the challenge
      setTurnstilePassed(false);
    }
  };

  return (
    <motion.div
      className={classes.formContainer}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <Paper shadow="md" radius="md" p="lg" className={classes.paper}>
        <form ref={formRef} onSubmit={handleSubmit(sendEmail)}>
          <TextInput
            label="Name"
            placeholder="Your name"
            {...register('name', { required: 'name is required' })}
            error={errors.name?.message}
            className={classes.input}
            styles={{
              label: { marginBottom: '10px', color: contrastColor, fontFamily: 'Gotham Light' },
              input: {
                color: navColor,
                backgroundColor: 'transparent',
                fontFamily: 'Gotham Light',
                '::placeholder': {
                  color: contrastColor,
                  fontFamily: 'Gotham Book',
                },
              },
              error: { fontFamily: 'Gotham Medium Italic' },
            }}
          />

          <TextInput
            label="Email"
            placeholder="you@example.com"
            {...register('email', {
              required: 'email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'enter a valid email address',
              },
            })}
            error={errors.email?.message}
            className={classes.input}
            styles={{
              label: { marginBottom: '10px', color: contrastColor, fontFamily: 'Gotham Light' },
              input: {
                color: navColor,
                backgroundColor: 'transparent',
                fontFamily: 'Gotham Light',
                '::placeholder': {
                  color: contrastColor,
                  fontFamily: 'Gotham Book',
                },
              },
              error: { fontFamily: 'Gotham Medium Italic' },
            }}
          />

          <TextInput
            label="Message"
            placeholder="You're tacky and I hate you."
            {...register('message', { required: `come now, don't be shy` })}
            error={errors.message?.message}
            className={classes.input}
            styles={{
              label: { marginBottom: '10px', color: contrastColor, fontFamily: 'Gotham Light' },
              input: {
                color: navColor,
                backgroundColor: 'transparent',
                fontFamily: 'Gotham Light',
                '::placeholder': {
                  color: contrastColor,
                  fontFamily: 'Gotham Book',
                },
              },
              error: { fontFamily: 'Gotham Medium Italic' },
            }}
          />

          <Group justify="flex-end" mt="md">
            <div
              className="cf-turnstile"
              data-sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
              data-callback="onTurnstileSuccess"
              data-expired-callback="onTurnstileExpired"
              data-error-callback="onTurnstileError"
            ></div>

            <motion.button
              type="submit"
              className={classes.submitButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </Group>
        </form>
      </Paper>
    </motion.div>
  );
}
