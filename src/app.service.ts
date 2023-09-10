import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class AppService {
  getHello(): string {
    return uuid4();
    return 'Hello World!';
  }
}
