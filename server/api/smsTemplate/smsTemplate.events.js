/**
 * SmsTemplate model events
 */

'use strict';

import {EventEmitter} from 'events';
var SmsTemplateEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SmsTemplateEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(SmsTemplate) {
  for(var e in events) {
    let event = events[e];
    SmsTemplate.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    SmsTemplateEvents.emit(event + ':' + doc._id, doc);
    SmsTemplateEvents.emit(event, doc);
  };
}

export {registerEvents};
export default SmsTemplateEvents;
