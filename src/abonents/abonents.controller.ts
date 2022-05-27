import {
  Controller,
  Body,
  Param,
  Get,
  Put,
  Delete,
  SetMetadata,
  UseGuards,
  Render,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/common/guards/auth.guard';
import { roles } from 'src/enum/roles';
import { AbonentsService } from './abonents.service';
import { UpdateAbonentDto } from './dto/update-abonent.dto';

@Controller('abonents')
export class AbonentsController {
  constructor(private readonly abonentsService: AbonentsService) {}

  @SetMetadata('roles', [roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Get()
  @Render('getAllAbonents')
  getAll(): object {
    return this.abonentsService.getAll();
  }

  @SetMetadata('roles', [roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  @Render('getOneAbonent')
  getOne(@Param('id') id: string): object {
    return this.abonentsService.getOne(id);
  }

  @SetMetadata('roles', [roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  update(
    @Body() updateAbonentDto: UpdateAbonentDto,
    @Param('id') id: string,
  ): object {
    return this.abonentsService.update(updateAbonentDto, id);
  }

  @SetMetadata('roles', [roles.admin])
  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  delete(@Param('id') id: string): object {
    return this.abonentsService.delete(id);
  }
}
