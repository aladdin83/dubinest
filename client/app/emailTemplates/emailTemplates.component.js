'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './emailTemplates.routes';

export class EmailTemplatesComponent {
  $http;
  templates = []

  /*@ngInject*/
  constructor($http) {
    this.$http = $http
  }

  $onInit(){
    this.templates = $http.get('/api/email_templates/')
    .then(response => {
      this.templates = response.data;
    }).catch();
  }
}

export default angular.module('dubinestApp.emailTemplates', [uiRouter])
  .config(routes)
  .component('emailTemplates', {
    template: require('./emailTemplates.html'),
    controller: EmailTemplatesComponent,
    controllerAs: 'emailTemplatesCtrl'
  })
  .name;
