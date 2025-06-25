import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserCrudService } from './users.crud.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userCrudService: UserCrudService) {}

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userCrudService.getById(id);
  }

  @Get()
  getAll() {
    return this.userCrudService.getAll();
  }

  @Post()
  create(@Body() userDto: UserDto) {
    return this.userCrudService.create(userDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.userCrudService.update(id, userDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userCrudService.delete(id);
  }
}
