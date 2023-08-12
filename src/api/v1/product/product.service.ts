import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
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

  async updateProduct(id: number, updateData: Product): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });
    if (!product) {
      throw new NotFoundException('update product not found!');
    }
    Object.assign(product, updateData);
    await this.productRepository.save(product);
    return product;
  }

  async deleteProduct(id: number, deleteData: Product): Promise<void> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });
    if (!product) {
      throw new NotFoundException('delete product not found!');
    }
    await this.productRepository.remove(product);
  }
}
