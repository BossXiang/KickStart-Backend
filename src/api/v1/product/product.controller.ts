import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('api/v1/product')
export class ProductController {

  constructor(private productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.getProduct();
  }

  @Post()
  createProducts(@Body() input_obj) {
    // [To do] Check if input_obj is in the correct format
    return this.productService.createProduct(input_obj);
  }


  @Get('trending') 
  getTrendingProducts() {
    return this.productService.getTrendingProducts();
  }
}
