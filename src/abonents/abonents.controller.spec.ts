import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticatedGuard } from 'src/common/guards/auth.guard';
import { DatabaseModule } from 'src/db/database.module';
import { AbonentsController } from './abonents.controller';
import { AbonentsService } from './abonents.service';
import { UpdateAbonentDto } from './dto/update-abonent.dto';
import { abonentStub } from './__mocks__/stubs/abonent.stub';

jest.mock('./abonents.service.ts');

describe('AbonentsController', () => {
  let abonentsController: AbonentsController;
  let abonentsService: AbonentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbonentsController],
      providers: [AbonentsService],
      imports: [DatabaseModule],
    })
      .overrideProvider('KnexConnection')
      .useValue({})
      .compile();

    abonentsController = module.get<AbonentsController>(AbonentsController);
    abonentsService = module.get<AbonentsService>(AbonentsService);
    jest.clearAllMocks();
  });

  it('AbonentsController should be defined', () => {
    expect(abonentsController).toBeDefined();
  });

  describe('getAll', () => {
    describe('when getAll is called', () => {
      let abonents;

      beforeEach(async () => {
        abonents = await abonentsController.getAll();
      });

      it('should ensure the AuthenticatedGuard is applied to the method', () => {
        const guards = Reflect.getMetadata(
          '__guards__',
          AbonentsController.prototype.getAll,
        );
        const guard = new guards[0]();

        expect(guard).toBeInstanceOf(AuthenticatedGuard);
      });

      it('then it should call abonentsService', () => {
        expect(abonentsService.getAll).toBeCalled();
      });

      it('then it should return an array of abonents', () => {
        expect(abonents).toEqual([abonentStub()]);
      });
    });
  });

  describe('getOne', () => {
    describe('when getOne is called', () => {
      let abonent;

      beforeEach(async () => {
        abonent = await abonentsController.getOne(abonentStub().id);
      });

      it('should ensure the AuthenticatedGuard is applied to the method', () => {
        const guards = Reflect.getMetadata(
          '__guards__',
          AbonentsController.prototype.getOne,
        );
        const guard = new guards[0]();

        expect(guard).toBeInstanceOf(AuthenticatedGuard);
      });

      it('then it should call abonentsService', () => {
        expect(abonentsService.getOne).toBeCalledWith(abonentStub().id);
      });

      it('then it should return an abonent', () => {
        expect(abonent).toEqual(abonentStub());
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let result;
      let updateAbonentDto;

      beforeEach(async () => {
        updateAbonentDto = {
          username: 'Lallal',
        };
        result = await abonentsController.update(
          updateAbonentDto,
          abonentStub().id,
        );
      });

      it('should ensure the AuthenticatedGuard is applied to the method', () => {
        const guards = Reflect.getMetadata(
          '__guards__',
          AbonentsController.prototype.update,
        );
        const guard = new guards[0]();

        expect(guard).toBeInstanceOf(AuthenticatedGuard);
      });

      it('then it should call abonentsService', () => {
        expect(abonentsService.update).toBeCalledWith(
          updateAbonentDto,
          abonentStub().id,
        );
      });

      it('then it should return an answer', () => {
        expect(result).toEqual({ success: true });
      });
    });
  });

  describe('delete', () => {
    describe('when delete is called', () => {
      let result;

      beforeEach(async () => {
        result = await abonentsController.delete(abonentStub().id);
      });

      it('should ensure the AuthenticatedGuard is applied to the method', () => {
        const guards = Reflect.getMetadata(
          '__guards__',
          AbonentsController.prototype.delete,
        );
        const guard = new guards[0]();

        expect(guard).toBeInstanceOf(AuthenticatedGuard);
      });

      it('then it should call abonentsService', () => {
        expect(abonentsService.delete).toBeCalledWith(abonentStub().id);
      });

      it('then it should return an answer', () => {
        expect(result).toEqual({ success: true });
      });
    });
  });
});
