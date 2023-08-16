import { CreateProductDto } from '../../product/dto/CreateProduct.dto';

export class ItemDto {
  product: CreateProductDto;
  number: number;
  comment: string;
}
