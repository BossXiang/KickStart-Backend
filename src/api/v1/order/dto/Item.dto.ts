import { CreateProductDto } from '../../product/dto/CreateProduct.dto';

export class ItemDto {
  product: CreateProductDto;
  number: number;
  content: string;
  prompt: string;
  images: string[];
  comment: string;
}
