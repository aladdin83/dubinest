/**
 * EmailTemplate model events
 */

'use strict';

import {EventEmitter} from 'events';
var EmailTemplateEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EmailTemplateEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(EmailTemplate) {
  for(var e in events) {
    let event = events[e];
    EmailTemplate.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    EmailTemplateEvents.emit(event + ':' + doc._id, doc);
    EmailTemplateEvents.emit(event, doc);
  };
}

export {registerEvents};
export default EmailTemplateEvents;
