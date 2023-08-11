import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  getProduct() {
    return this.productRepository.find();
  }

  createProduct(obj) {
    return this.productRepository.save(obj);
  }

  getTrendingProducts() {
    return 'test';

  }

}
