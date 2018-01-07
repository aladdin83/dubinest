'use strict';

import mongoose, { Schema } from 'mongoose';
import {registerEvents} from './student.events';

var StudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  status: String,
  address:[{
    description: String,
    street1: String,
    street2: String,
    city: String,
    country: String,
    mapLocation: {
      lat: String,
      lng: String
    }
  }],
  school: {
    type: Schema.Types.ObjectId,
    ref: "School"
  },
  parents: [{
    type: Schema.Types.ObjectId,
    ref: "Parent"
  }],
  rooms: [{
    type: Schema.Types.ObjectId,
    ref: 'Room'
  }],
  EmergencyContacts: [{
    name: String,
    relation: String,
    mobile: String,
    phone: String,
    priority: Number
  }],
  info: String,
  active: Boolean
});

registerEvents(StudentSchema);
export default mongoose.model('Student', StudentSchema);
