import * as yup from 'yup';

export const createUserSchema = yup.object().shape({
  name: yup.string().max(50).required(),
  surname: yup.string().max(50).required(),
  age: yup.number().required().positive().integer(),
});

export const updateUserSchema = yup.object().shape({
  name: yup.string().max(50),
  surname: yup.string().max(50),
  age: yup.number().positive().integer(),
});
