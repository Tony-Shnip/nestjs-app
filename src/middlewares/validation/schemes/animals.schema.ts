import * as yup from 'yup';

export const createAnimalSchema = yup.object().shape({
  name: yup.string().max(50).required(),
  type: yup.string().max(100).required(),
  age: yup.number().required().positive().integer(),
  ownerId: yup.string().max(255).notRequired(),
});

export const updateAnimalSchema = yup.object().shape({
  name: yup.string().max(50),
  type: yup.string().max(100),
  age: yup.number().positive().integer(),
  ownerId: yup.string().max(255).notRequired(),
});
