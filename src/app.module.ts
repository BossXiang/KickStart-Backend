import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './typeorm/entities/User';
import { Profile } from './typeorm/entities/Profile';
import { GeneralModule } from './api/v1/general/general.module';
import { ProductModule } from './api/v1/product/product.module';
import { OrderModule } from './api/v1/order/order.module';
import { Product } from './typeorm/entities/Product';
import { Order } from './typeorm/entities/Order';
import { Item } from './typeorm/entities/Item';
import * as dotenv from 'dotenv';
import { DeliveryInfo } from './typeorm/entities/DeliveryInfo';
import { PaymentModule } from './api/v1/payment/payment.module';
import { EmailService } from './api/v1/email/email.service';

dotenv.config();

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST || "127.0.0.1",
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [ Product, DeliveryInfo, Order, Item ],  // User and Profile are removed temporarily
      synchronize: true,
    }), UsersModule, GeneralModule, ProductModule, OrderModule, PaymentModule 
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
