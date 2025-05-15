require('dotenv').config();
const axios = require('axios');

(async () => {
  try {
    const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        customer_name: 'Test User',
        customer_email: 'test@example.com',
        cart_items: '<tr><td>example-item</td><td>1</td><td>$5</td><td>$125</td></tr>',
        cart_total: '125.00',
        cart_donation: '5.00',
      },
    });
    console.log('✅ Email sent!', response.data);
  } catch (error) {
    console.error('❌ Failed to send email:', error.response?.data || error.message);
  }
})();
