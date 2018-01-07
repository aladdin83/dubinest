'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './staffmember.events';

var StaffmemberSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(StaffmemberSchema);
export default mongoose.model('Staffmember', StaffmemberSchema);
