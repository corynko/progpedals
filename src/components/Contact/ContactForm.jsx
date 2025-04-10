import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { Button, Group, Paper, TextInput } from '@mantine/core';
import { useContrastColor } from '../../theme/useContrastColor';
import { usePrimaryColor } from '../../theme/usePrimaryColor';
import classes from './ContactForm.module.css';

export default function ContactForm() {
  const navColor = usePrimaryColor(9, 1);
  const contrastColor = useContrastColor(9, 1);
  const invertColor = usePrimaryColor(1, 9);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);
  };

  return (
    <motion.div
      className={classes.formContainer}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <Paper shadow="md" radius="md" p="lg" className={classes.paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Name"
            placeholder="Your name"
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
            className={classes.input}
          />

          <TextInput
            label="Email"
            placeholder="you@example.com"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
            error={errors.email?.message}
            className={classes.input}
            styles={{
              input: {
                color: contrastColor,
                backgroundColor: 'transparent',
              },
            }}
          />
          <TextInput
            label="Message"
            placeholder="You're tacky and I hate you."
            {...register('message', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
            error={errors.email?.message}
            className={classes.input}
            c={navColor}
          />

          <Group justify="flex-end" mt="md">
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
