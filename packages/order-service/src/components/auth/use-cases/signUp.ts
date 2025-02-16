import { BadRequestError, InternalServerError } from '@/errors';
import UserModel from '@/models/user.model';
import { removeFieldsNotUse } from '@/shared/transformedData';
import { CreateUserParams, User } from '@enigma-laboratory/shared';
import { AuthValidation } from '../validation';

export async function signUp(params: CreateUserParams): Promise<User> {
  const validate = AuthValidation.instance.signUpValidate(params);
  if (validate.error) throw new BadRequestError(validate.error.message);

  try {
    // Check if email already exists
    const existingUser = await UserModel.findOne({ email: params.email });
    if (existingUser) throw new BadRequestError('Email already exists.');

    const user = await UserModel.create(params);
    if (!user) throw new BadRequestError('Can not create user.');

    return removeFieldsNotUse(user).toJSON();
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
}
