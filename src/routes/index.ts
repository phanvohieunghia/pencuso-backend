import SwaggerUI from '@/services/api-doc';
import { Express } from 'express';
import AuthRoute from './auth/authRoutes';
import OrderRoute from './order/orderRoutes';
import OrderDetailRoute from './orderDetail/orderDetailRoutes';
import ProductRoute from './product/productRoutes';
import AdditionalHttpStatusCodes from './serverError/serverError';
import SessionRoute from './session/sessionRoutes';
import UserRoute from './user/userRoutes';
import { accessToken } from '@/middleware/accessToken';
function routes(app: Express) {
  app.use('/api-docs', SwaggerUI.instance.serveAndSetup());
  app.use('/auth', accessToken, AuthRoute);
  app.use('/sessions', accessToken, SessionRoute);
  app.use('/products', accessToken, ProductRoute);
  app.use('/orders', accessToken, OrderRoute);
  app.use('/order-details', accessToken, OrderDetailRoute);
  app.use('/users', accessToken, UserRoute);
  app.use(AdditionalHttpStatusCodes);
}

export default routes;
