import { DeliveryInfoDto } from './DeliveryInfo.dto';
import { ItemDto } from './Item.dto';

export class CreateOrderDto {
  status: string;
  payTime: Date;
  deliveryTime: Date;
  transactionTime: Date;
  comment: string;
  items: ItemDto[];
  deliveryInfo: DeliveryInfoDto;
}
