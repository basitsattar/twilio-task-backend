import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/', controller.create)
  .get('/phoneNumbers/:code', controller.getPhoneNumbers)
  .get('/:id', controller.byId);
