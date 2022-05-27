import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CanActivate, INestApplication } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { DatabaseModule } from 'src/db/database.module';
import { UsersController } from 'src/users/users.controller';
import { AuthenticatedGuard } from 'src/common/guards/auth.guard';
import { MockedUsersService } from './__mocks__/users.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

describe('Users', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let usersController: UsersController;

  beforeAll(async () => {
    const mock_AuthGuard: CanActivate = { canActivate: jest.fn(() => true) };

    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: MockedUsersService,
        },
      ],
    })
      .overrideProvider('KnexConnection')
      .useValue({})
      .overrideGuard(AuthenticatedGuard)
      .useValue(mock_AuthGuard)
      .compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('/GET request', () => {
    let users;
    let user;

    beforeEach(async () => {
      users = await usersController.getAll();
      user = await usersController.getOne(
        'a1aad2d4-8abb-40aa-95a1-51e99355e5fa',
      );
    });

    it(`/users (GET) should return all users with 200 status code`, () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect(({ body }) => {
          expect(body).toEqual(users);
        });
    });

    it('/ (GET) should return "not found" with 404 status code', () => {
      return request(app.getHttpServer()).get('/').expect(404).expect({
        statusCode: 404,
        error: 'Not Found',
        message: 'Cannot GET /',
      });
    });

    it('/users/:id (GET) should return an actual user with 200 status code', () => {
      return request(app.getHttpServer())
        .get('/users/userId')
        .expect(200)
        .expect(({ body }) => {
          expect(body).toEqual(user);
        });
    });
  });

  describe('/PUT request', () => {
    let result: object;
    let dto: UpdateUserDto;

    beforeEach(async () => {
      result = await usersController.update(
        dto,
        'a1aad2d4-8abb-40aa-95a1-51e99355e5fa',
      );
    });

    it(`/users/:id (PUT) should return "success" with 200 status code`, () => {
      return request(app.getHttpServer())
        .put('/users/userId')
        .expect(200)
        .expect(({ body }) => {
          expect(body).toEqual(result);
        });
    });

    it(`/users (PUT) should return "not found" with 404 status code`, () => {
      return request(app.getHttpServer()).put('/users').expect(404).expect({
        statusCode: 404,
        error: 'Not Found',
        message: 'Cannot PUT /users',
      });
    });
  });

  describe('/POST request', () => {
    let result: object;
    let dto: CreateUserDto;

    beforeEach(async () => {
      result = await usersController.create(dto);
    });

    it(`/users (POST) should return "success" with 201 status code`, () => {
      return request(app.getHttpServer())
        .post('/users')
        .expect(201)
        .expect(({ body }) => {
          expect(body).toEqual(result);
        });
    });

    it(`/ (POST) should return "not found" with 404 status code`, () => {
      return request(app.getHttpServer()).post('/').expect(404).expect({
        statusCode: 404,
        error: 'Not Found',
        message: 'Cannot POST /',
      });
    });
  });

  describe('/DELETE request', () => {
    let result: object;

    beforeEach(async () => {
      result = await usersController.delete(
        'a1aad2d4-8abb-40aa-95a1-51e99355e5fa',
      );
    });

    it(`/users/:userId (DELETE) should return "success" with 200 status code`, () => {
      return request(app.getHttpServer())
        .delete('/users/:userId')
        .expect(200)
        .expect(({ body }) => {
          expect(body).toEqual(result);
        });
    });

    it(`/users (DELETE) should return "not found" with 404 status code`, () => {
      return request(app.getHttpServer()).delete('/users').expect(404).expect({
        statusCode: 404,
        error: 'Not Found',
        message: 'Cannot DELETE /users',
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
