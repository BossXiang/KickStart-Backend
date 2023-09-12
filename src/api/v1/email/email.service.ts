import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    
  }

  async sendOrderConfirmationEmail(to: string, orderId: string) {
    const msg = {
      to,
      from: 'noreply@tailorbliss.com',
      subject: 'Order confirmation from tailor bliss',
      text: 'Tanks for your purchase! Below is your order id!',
      html: `<strong>${orderId}</strong>`,
    }
    
    try {
      sgMail
        .send(msg)
        .then(() => {
          console.log(`Email sent to ${to}`)
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

}
