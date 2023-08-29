import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/typeorm/entities/Product';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  getProducts() {
    return this.productRepository.find();
  }

  getProduct(id) {
    return this.productRepository.findOne({
      where: {
        id
      }
    });
  }

  createProduct(obj) {
    return this.productRepository.save(obj);
  }

  getTrendingProducts() {
    // Idea: calculate the popularity by the amount ordered and the amount of views
    // Now, It's implemented to get up to 5 random products from the products database
    return this.productRepository.find({
      take: 5,
    });
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

  async deleteProduct(id: number): Promise<void> {
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
