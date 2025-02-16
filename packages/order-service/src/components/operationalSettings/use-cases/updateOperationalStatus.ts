import OperationalSettingModel from '@/models/operationalSetting.model';
import OrderModel from '@/models/order.model';
import { removeFieldsNotUse } from '@/shared/transformedData';
import {
  OperationalSettingEvent,
  UpdateOneOperationalSettingParams,
  UpdateOneOperationalSettingResponse,
} from '@enigma-laboratory/shared';

import { BadRequestError, InternalServerError } from '@/errors';

import { CreateApplication } from '@/app';
import { OperationalSettingValidation } from '../validation';

export async function updateOperationalStatus(
  params: UpdateOneOperationalSettingParams,
): Promise<UpdateOneOperationalSettingResponse> {
  try {
    const validate = OperationalSettingValidation.instance.putOperationalSettingValidate(params);
    if (validate.error) throw new BadRequestError(validate.error.message);

    const orders = await OrderModel.find({ groupId: params?._id });

    if ((orders || []).some(order => Object.values(order.usersStatus || {}).some(value => value !== 'done'))) {
      throw new BadRequestError('The order status is not done ');
    }

    const groups = await OperationalSettingModel.findByIdAndUpdate(
      params._id,
      { status: params.status },
      {
        new: true,
      },
    ).lean();

    if (!groups) throw new BadRequestError("Don't have the group updated.");

    const operationalSettings = removeFieldsNotUse(groups);

    CreateApplication.instance.broadcastEvent(OperationalSettingEvent.UPDATED, operationalSettings);
    return operationalSettings;
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
}
