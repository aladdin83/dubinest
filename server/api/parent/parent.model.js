'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './parent.events';

var ParentSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(ParentSchema);
export default mongoose.model('Parent', ParentSchema);
