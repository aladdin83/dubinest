'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('smsTemplates', {
      url: '/sms_templates',
      template: '<sms-templates></sms-templates>'
    });
}
