import { userStub } from './stubs/user.stub';

export const MockedUsersService = {
  getAll: jest.fn().mockReturnValue([userStub()]),
  getOne: jest.fn().mockReturnValue(userStub()),
  update: jest.fn().mockReturnValue({ success: true }),
  create: jest.fn().mockReturnValue({ success: true }),
  delete: jest.fn().mockReturnValue({ success: true }),
};
