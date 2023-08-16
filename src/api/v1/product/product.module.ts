import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { Item } from 'src/typeorm/entities/Item';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Item])],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
