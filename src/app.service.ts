import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { EmailService } from './api/v1/email/email.service';

@Injectable()
export class AppService {
  getHello(): string {
    // return uuid4();
    const emailService = new EmailService();
    emailService.testEmail();
    // emailService.sendOrderConfirmationEmail('bosszheng220@gmail.com', 'test');

    return 'Hello World!';
  }
}
