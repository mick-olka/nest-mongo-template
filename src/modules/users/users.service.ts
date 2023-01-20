import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
  ) {}

  async create(
    data: CreateUserDto,
  ): Promise<User & { _id: mongoose.Types.ObjectId }> {
    const createdUser = await this.UserModel.create(data)
    return createdUser
  }

  async findAll(): Promise<User[]> {
    return this.UserModel.find().exec()
  }

  async findById(id: string): Promise<User & { _id: mongoose.Types.ObjectId }> {
    return this.UserModel.findOne({ _id: id }).exec()
  }

  async findOne(
    params: Partial<User>,
  ): Promise<User & { _id: mongoose.Types.ObjectId }> {
    return this.UserModel.findOne(params).exec()
  }

  async updateOneById(id: string, data: UpdateUserDto): Promise<User> {
    return this.UserModel.findOneAndUpdate({ _id: id }, data)
  }

  async updateOne(
    searchParams: mongoose.FilterQuery<
      mongoose.Document<unknown, any, User> &
        User & {
          _id: mongoose.Types.ObjectId
        }
    >,
    data: UpdateUserDto,
  ): Promise<User> {
    return this.UserModel.findOneAndUpdate(searchParams, data)
  }

  async delete(id: string) {
    const deletedProduct = await this.UserModel.findByIdAndRemove({
      _id: id,
    }).exec()
    return deletedProduct
  }
}
