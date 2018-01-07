'use strict';

import mongoose, { Schema } from 'mongoose';
import {registerEvents} from './emailTemplate.events';

var EmailTemplateSchema = new mongoose.Schema({
  name: String,
  templateType: String,
  language: String,
  description: String,
  school: {
    type: Schema.Types.ObjectId,
    ref: "School"
  },
  info: String,
  active: Boolean,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdOn: Date,
  
});

registerEvents(EmailTemplateSchema);
export default mongoose.model('EmailTemplate', EmailTemplateSchema);
