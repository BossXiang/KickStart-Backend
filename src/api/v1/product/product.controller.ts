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
import { ProductService } from './product.service';
import { Product } from 'src/typeorm/entities/Product';
import { CreateProductDto } from './dto/CreateProduct.dto';

@Controller('api/v1/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.getProduct();
  }

  @Post()
  createProducts(@Body() input_obj: CreateProductDto) {
    // [To do] Check if input_obj is in the correct format
    return this.productService.createProduct(input_obj);
  }

  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Product,
  ): Promise<Product> {
    return this.productService.updateProduct(id, updateData);
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.productService.deleteProduct(id);
  }
  @Get('trending')
  getTrendingProducts() {
    return this.productService.getTrendingProducts();
  }
}
