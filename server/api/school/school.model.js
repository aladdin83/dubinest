'use strict';

import mongoose, { Schema } from 'mongoose';
import {registerEvents} from './school.events';


var SchoolSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  address:{
    street1: String,
    street2: String,
    city: String,
    state: String,
    country: String,
    zipcode: String
  },
  phone: String,
  website: String,
  createdOn: Date,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

registerEvents(SchoolSchema);
export default mongoose.model('School', SchoolSchema);
