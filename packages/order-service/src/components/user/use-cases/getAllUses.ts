import { ConflictError } from '@/errors';
import UserModel from '@/models/user.model';
import { removeFieldsNotUse } from '@/shared/transformedData';
import { FindAllUserResponse } from '@enigma-laboratory/shared';

export async function getAllUsers(): Promise<FindAllUserResponse> {
  try {
    const users = await UserModel.find().lean().exec();
    return {
      count: users.length,
      rows: users?.map(user => removeFieldsNotUse(user)),
    };
  } catch (error: any) {
    throw new ConflictError(error.message);
  }
}
