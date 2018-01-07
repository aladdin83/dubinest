/**
 * Staffmember model events
 */

'use strict';

import {EventEmitter} from 'events';
var StaffmemberEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StaffmemberEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Staffmember) {
  for(var e in events) {
    let event = events[e];
    Staffmember.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    StaffmemberEvents.emit(event + ':' + doc._id, doc);
    StaffmemberEvents.emit(event, doc);
  };
}

export {registerEvents};
export default StaffmemberEvents;
