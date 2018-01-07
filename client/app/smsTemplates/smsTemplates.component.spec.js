'use strict';

describe('Component: SmsTemplatesComponent', function() {
  // load the controller's module
  beforeEach(module('dubinestApp.smsTemplates'));

  var SmsTemplatesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    SmsTemplatesComponent = $componentController('smsTemplates', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
