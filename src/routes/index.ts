import { Express } from 'express';
import AuthRoute from './auth/authRoutes';
import SessionRoute from './session/sessionRoutes';
import ProductRoute from './product/productRoutes';
import OrderRoute from './order/orderRoutes';
import CustomerRoute from './customer/customerRoutes';
import AdditionalHttpStatusCodes from './serverError/serverError';
import SwaggerUI from '../utils/api-doc';

function routes(app: Express) {
  app.use('/api-docs', SwaggerUI.instance.serve, SwaggerUI.instance.setup());
  app.use('/auth', AuthRoute);
  app.use('/session', SessionRoute);
  app.use('/product', ProductRoute);
  app.use('/order', OrderRoute);
  app.use('/customer', CustomerRoute);
  app.use(AdditionalHttpStatusCodes);
}

export default routes;
