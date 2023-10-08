import { DeliveryInfoDto } from './DeliveryInfo.dto';
import { ItemDto } from './Item.dto';

export class CreateOrderDto {
  status: string;
  transactionTime: Date;
  comment: string;
  item: ItemDto[];
  deliveryInfo: DeliveryInfoDto;
}
