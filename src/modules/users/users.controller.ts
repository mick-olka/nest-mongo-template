import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  Delete,
  Patch,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'
import { User } from './schemas/user.schema'

@ApiTags('Products')
@Controller('products')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created user.',
  })
  //   @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async create(@Body() data: CreateUserDto) {
    return this.usersService.create(data)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched users.',
  })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched users.',
  })
  //   @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  getTodoById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id)
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully updated user.',
  })
  //   @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.updateOneById(id, data)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully deleted user.',
  })
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id)
  }
}
