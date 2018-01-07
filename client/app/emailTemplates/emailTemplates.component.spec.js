'use strict';

describe('Component: EmailTemplatesComponent', function() {
  // load the controller's module
  beforeEach(module('dubinestApp.emailTemplates'));

  var EmailTemplatesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EmailTemplatesComponent = $componentController('emailTemplates', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
