import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateProductDto } from './dto/create-product.dto'
import { Product, ProductDocument } from './schemas/product.schema'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly ProductModel: Model<ProductDocument>,
  ) {}

  async create(data: CreateProductDto): Promise<Product> {
    const createdProduct = await this.ProductModel.create(data)
    return createdProduct
  }

  async findAll(): Promise<Product[]> {
    return this.ProductModel.find().exec()
  }

  async findOne(id: string): Promise<Product> {
    return this.ProductModel.findOne({ _id: id }).exec()
  }

  async update(id: string, data: CreateProductDto): Promise<Product> {
    return this.ProductModel.findOneAndUpdate({ _id: id }, data)
  }

  async delete(id: string) {
    const deletedProduct = await this.ProductModel.findByIdAndRemove({
      _id: id,
    }).exec()
    return deletedProduct
  }
}
