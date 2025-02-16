import ProductModel from '@/models/product.model';
import { FindOneProductParams, FindOneProductResponse } from '@enigma-laboratory/shared';

export async function getOneProduct(params: FindOneProductParams): Promise<FindOneProductResponse> {
  try {
    const product = await ProductModel.findOne(params);
    return product?.toJSON() as any;
  } catch (e: any) {
    throw new Error(e);
  }
}
