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
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @SetMetadata('roles', [roles.user, roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Get()
  @Render('getAllAnimals')
  getAll(): object {
    return this.animalsService.getAll();
  }

  @SetMetadata('roles', [roles.user, roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  @Render('getOneAnimal')
  getOne(@Param('id') id: string): object {
    return this.animalsService.getOne(id);
  }

  @SetMetadata('roles', [roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Post()
  @Render('answer')
  create(@Body() createAnimalDto: CreateAnimalDto): object {
    return this.animalsService.create(createAnimalDto);
  }

  @SetMetadata('roles', [roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Post(':id')
  @Render('answer')
  update(
    @Body() updateAnimalDto: UpdateAnimalDto,
    @Param('id') id: string,
  ): object {
    return this.animalsService.update(updateAnimalDto, id);
  }

  @SetMetadata('roles', [roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Post(':id/delete')
  @Render('answer')
  delete(@Param('id') id: string): object {
    return this.animalsService.delete(id);
  }
}
