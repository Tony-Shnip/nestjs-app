import * as yup from 'yup';

import { roles } from '../../../enum/roles';

export const createAbonentSchema = yup.object().shape({
  username: yup.string().min(5).max(50).required(),
  password: yup.string().min(8).max(120).required(),
  role: yup.string().max(20).oneOf(Object.values(roles)).required(),
  email: yup.string().email().max(50).required(),
});

export const updateAbonentSchema = yup.object().shape({
  username: yup.string().min(5).max(50),
  password: yup.string().min(8).max(120),
  role: yup.string().max(20).oneOf(Object.values(roles)),
  email: yup.string().email().max(50),
});
