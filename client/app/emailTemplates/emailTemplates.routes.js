'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('emailTemplates', {
      url: '/email_templates',
      template: '<email-templates></email-templates>'
    });
}
