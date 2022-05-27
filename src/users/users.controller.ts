import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  SetMetadata,
  UseGuards,
  Render,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/common/guards/auth.guard';
import { roles } from 'src/enum/roles';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SetMetadata('roles', [roles.user, roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Get()
  @Render('getAllUsers')
  getAll(): object {
    return this.usersService.getAll();
  }

  @SetMetadata('roles', [roles.user, roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  @Render('getOneUser')
  getOne(@Param('id') id: string): object {
    return this.usersService.getOne(id);
  }

  @SetMetadata('roles', [roles.user, roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Get(':id/pets')
  @Render('userPets')
  getPets(@Param('id') id: string): object {
    return this.usersService.getPets(id);
  }

  @SetMetadata('roles', [roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Post()
  @Render('answer')
  create(@Body() createUserDto: CreateUserDto): object {
    return this.usersService.create(createUserDto);
  }

  @SetMetadata('roles', [roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Post(':id')
  @Render('answer')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): object {
    return this.usersService.update(updateUserDto, id);
  }

  @SetMetadata('roles', [roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Post(':id/delete')
  @Render('answer')
  delete(@Param('id') id: string): object {
    return this.usersService.delete(id);
  }
}
