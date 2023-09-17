import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import handlebars from 'handlebars';
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
    // Read the HTML template file
    const templateSource = fs.readFileSync('src/email_templates/order_confirmation.html', 'utf8');
    // Create a Handlebars template function
    const template = handlebars.compile(templateSource);
    // Parse the request body to get variables
    const data = {
        id:'a56f4596-a611-4bb1-a0aa-7c3f509b1851',
        status:'processing',
        payTime: '2023-08-22T10:00:00Z',
        deliveryTime: '2023-09-17T06:56:04.054Z',
        transactionTime: '2023-08-22T10:30:00Z',
        comment: 'This is a test order',
        item: [
          {
            number: 7,
            comment: 'Two items of Product 1',
            product: 1,
            id: 13
          },
          {
            number: 7,
            comment: 'Three items of Product 2',
            product: 2,
            id: 14
          }
        ],
        deliveryinfo: {
          email: 'bosszheng220@gmail.com',
          firstName: 'Haha Yeeee',
          lastName: 'Doe',
          address: '123 Main St',
          country: 'USA',
          id: 10
        }
      };
    const { id, transactionTime, item, deliveryinfo } = data;
    // Compile the HTML with variables
    const htmlToSend = template({ id, transactionTime, item, deliveryinfo });

    const msg = {
      to: 'bosszheng220@gmail.com', // Change to your recipient
      from: 'no-reply@tailorbliss.com', // Change to your verified sender
      subject: '[Test] Order confirmation from tailor bliss',
      html: htmlToSend,
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

  async sendOrderConfirmationEmail(to: string, orderData: any) {
    const templateSource = fs.readFileSync('src/email_templates/order_confirmation.html', 'utf8');
    const template = handlebars.compile(templateSource);
    const { id, transactionTime, item, deliveryinfo } = orderData;
    const htmlToSend = template({ id, transactionTime, item, deliveryinfo });

    const msg = {
      to,
      from: 'no-reply@tailorbliss.com',
      subject: 'Order confirmation from tailor bliss',
      html: htmlToSend,
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
