const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOrderEmail({ customerName, customerEmail, cart, totalPrice, totalDonation }) {
  const formattedCartRows = cart
    .map((item) => {
      return `
      <tr>
        <td>${item.slug}</td>
        <td>${item.quantity}</td>
        <td>$${item.totalDonation}</td>
        <td>$${item.totalPrice}</td>
      </tr>
    `;
    })
    .join('');

  const html = `
    <div style="font-family: sans-serif; color: #333;">
      <img src="http://progpedals.com/progpedals_logo.svg" alt="ProgPedals Logo" style="max-width: 200px;" />
      <h2>New Order Received</h2>
      <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
      <table style="width: 100%; border-collapse: collapse;" border="1" cellpadding="8">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Donation</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${formattedCartRows}
        </tbody>
      </table>
      <p><strong>Total Donation:</strong> $${totalDonation}</p>
      <p><strong>Total Price:</strong> $${totalPrice}</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: 'ethan@progpedals.com', // Use a domain you've verified in Resend
      to: 'ethan@progpedals.com', // Replace with your actual receiving email
      subject: 'New Order on ProgPedals',
      html,
    });
    console.log('✅ Resend: Order email sent successfully.');
  } catch (err) {
    console.error('❌ Resend: Failed to send order email', err);
    throw err;
  }
}

module.exports = sendOrderEmail;
