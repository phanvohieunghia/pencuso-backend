import { FindAllProductParams, FindOneProductParams } from '@enigma-laboratory/shared';
import Joi, { ValidationResult } from 'joi';

export class ProductValidation {
  private static _instance: ProductValidation;

  public static get instance(): ProductValidation {
    if (!ProductValidation._instance) {
      this._instance = new ProductValidation();
    }
    return this._instance;
  }

  public postCreateProductValidate(params: any): ValidationResult<any> {
    const schema = Joi.object({
      name: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required(),
    });
    return schema.validate(params);
  }

  public getOneProductValidate(params: FindOneProductParams): ValidationResult<FindOneProductParams> {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    return schema.validate(params);
  }

  public getAllProductValidate(params: Partial<FindAllProductParams>): ValidationResult<FindAllProductParams> {
    const schema = Joi.object({
      scope: Joi.string(),
      page: Joi.number(),
      pageSize: Joi.number(),
      sorters: Joi.array().items(Joi.string()),
    });
    return schema.validate(params);
  }
}
