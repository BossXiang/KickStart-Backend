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

  async testEmail() {
    const msg = {
      to: 'tom@tailorbliss.com', // Change to your recipient
      from: 'test@tailorbliss.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async sendOrderConfirmationEmail(to: string, orderId: string) {
    const msg = {
      to,
      from: 'no-reply@tailorbliss.com',
      subject: 'Order confirmation from tailor bliss',
      text: 'Tanks for your purchase! Below is your order id!',
      html: `<strong>${orderId}</strong>`,
    }
    
    try {
      sgMail
        .send(msg)
        .then(() => {
          console.log(`[Success] Email sent to ${to}`)
        })
        .catch((error) => {
          console.error(`[Fail] ${error}`)
        })
    } catch (error) {
      console.error('[Fail] Error sending email:', error);
    }
  }

}
