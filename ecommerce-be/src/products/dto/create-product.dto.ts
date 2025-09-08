import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Giá phải là số' })
  @IsPositive({ message: 'Giá phải lớn hơn 0' })
  price: number;

  @IsInt({ message: 'Stock phải là số nguyên' })
  @Min(0, { message: 'Stock không được âm' })
  stock: number;

  @IsInt({ message: 'CategoryId phải là số nguyên' })
  @IsPositive({ message: 'CategoryId phải lớn hơn 0' })
  categoryId: number;
}
