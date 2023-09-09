import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

@Injectable()
export class PaymentService {

  getPublisableKey() {
    return { publishableKey: process.env.STRIPE_PUBLISHABLE_KEY };
  }

  async getPaymentIntent(obj) {
    try {
      const cost = obj.amount ? obj.amount : 0
      const paymentIntent = await stripe.paymentIntents.create({
        amount: cost * 100,
        currency: "USD",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      return { clientSecret: paymentIntent.client_secret };
    } catch (e) {
      // console.log(e);
      return null;
    }
  }
}
