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
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: "mysql",
    host: process.env.DB_HOST || "127.0.0.1",
    port: 3306,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [ User, Profile, Product, Order ],
    synchronize: true,
  }), UsersModule, GeneralModule, ProductModule, OrderModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
