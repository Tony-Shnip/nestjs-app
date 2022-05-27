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
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/common/guards/auth.guard';
import { roles } from 'src/enum/roles';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @SetMetadata('roles', [roles.user, roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Get()
  getAll(): object {
    return this.carsService.getAll();
  }

  @SetMetadata('roles', [roles.user, roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  getOne(@Param('id') id: string): object {
    return this.carsService.getOne(id);
  }

  @SetMetadata('roles', [roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Post()
  create(@Body() createCarDto: CreateCarDto): object {
    return this.carsService.create(createCarDto);
  }

  @SetMetadata('roles', [roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  update(@Body() updateCarDto: UpdateCarDto, @Param('id') id: string): object {
    return this.carsService.update(updateCarDto, id);
  }

  @SetMetadata('roles', [roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  delete(@Param('id') id: string): object {
    return this.carsService.delete(id);
  }
}
