'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './smsTemplate.events';

var SmsTemplateSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(SmsTemplateSchema);
export default mongoose.model('SmsTemplate', SmsTemplateSchema);
