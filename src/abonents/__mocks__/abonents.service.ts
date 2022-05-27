import { abonentStub } from './stubs/abonent.stub';

export const AbonentsService = jest.fn().mockReturnValue({
  getAll: jest.fn().mockReturnValue([abonentStub()]),
  getOne: jest.fn().mockReturnValue(abonentStub()),
  update: jest.fn().mockReturnValue({ success: true }),
  delete: jest.fn().mockReturnValue({ success: true }),
});
