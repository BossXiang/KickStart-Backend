import {
  Body,
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { get } from 'http';

@Controller('api/v1/payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {
    
  }
  
  @Get('config')
  getConfig() {
    return this.paymentService.getPublisableKey();
  }

  @Post('create-payment-intent')
  createProducts(@Body() obj) {
    return this.paymentService.getPaymentIntent(obj);
  }

}
