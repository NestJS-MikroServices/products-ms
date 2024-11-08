import {
  Injectable,
  HttpStatus,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from './common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsService');
  onModuleInit() {
    this.$connect();
    this.logger.log('DATABASE CONNECTED');
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.product.count({ where: { available: true } });
    const lastPage = Math.ceil(totalPages / limit);
    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { available: true },
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.product.findFirst({
      where: { id, available: true },
    });
    if (!product) {
      throw new RpcException({
        message: 'Product with ID lose',
        status: HttpStatus.BAD_REQUEST
      });
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // const { id: __, } = updateProductDto.id;
    await this.findOne(id);
    return this.product.update({
      where: { id },
      data: { ...updateProductDto }
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    const product = await this.product.update({
      where: { id },
      data: {
        available: false,
      },
    });
    return product;
    // return this.product.delete({where: {id},});  ELIMINACION FISICA
  }

  async validateProducts( ids: number[] ){
    ids = Array.from(new Set(ids));
    const products = await this.product.findMany({
      where: {
        id: {
          in: ids
        }
      }
    });

    if ( products.length != ids.lenght ){
      
    }



  }


}