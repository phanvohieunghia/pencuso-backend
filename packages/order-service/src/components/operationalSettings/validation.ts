import {
  CreateOneOperationalSettingParams,
  CreateOneOperationalSettingResponse,
  UpdateOneOperationalSettingParams,
  UpdateOneOperationalSettingResponse,
} from '@enigma-laboratory/shared';
import Joi, { ValidationResult } from 'joi';

export class OperationalSettingValidation {
  private static _instance: OperationalSettingValidation;
  public static get instance(): OperationalSettingValidation {
    if (!OperationalSettingValidation._instance) {
      this._instance = new OperationalSettingValidation();
    }
    return this._instance;
  }

  public postAllGroupValidate(
    params: CreateOneOperationalSettingParams,
  ): ValidationResult<CreateOneOperationalSettingResponse> {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().optional(),
    });
    return schema.validate(params);
  }

  public putOperationalSettingValidate(
    params: UpdateOneOperationalSettingParams,
  ): ValidationResult<UpdateOneOperationalSettingResponse> {
    const schema = Joi.object({
      _id: Joi.string().required(),
      status: Joi.string().valid('opening', 'closed').required(),
    });
    return schema.validate(params);
  }
}
