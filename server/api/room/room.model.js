'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './room.events';

var RoomSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(RoomSchema);
export default mongoose.model('Room', RoomSchema);
