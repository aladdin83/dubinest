'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './smsTemplates.routes';

export class SmsTemplatesComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('dubinestApp.smsTemplates', [uiRouter])
  .config(routes)
  .component('smsTemplates', {
    template: require('./smsTemplates.html'),
    controller: SmsTemplatesComponent,
    controllerAs: 'smsTemplatesCtrl'
  })
  .name;
