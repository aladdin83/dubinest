'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var emailTemplateCtrlStub = {
  index: 'emailTemplateCtrl.index',
  show: 'emailTemplateCtrl.show',
  create: 'emailTemplateCtrl.create',
  upsert: 'emailTemplateCtrl.upsert',
  patch: 'emailTemplateCtrl.patch',
  destroy: 'emailTemplateCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var emailTemplateIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './emailTemplate.controller': emailTemplateCtrlStub
});

describe('EmailTemplate API Router:', function() {
  it('should return an express router instance', function() {
    expect(emailTemplateIndex).to.equal(routerStub);
  });

  describe('GET /api/email_templates', function() {
    it('should route to emailTemplate.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'emailTemplateCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/email_templates/:id', function() {
    it('should route to emailTemplate.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'emailTemplateCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/email_templates', function() {
    it('should route to emailTemplate.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'emailTemplateCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/email_templates/:id', function() {
    it('should route to emailTemplate.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'emailTemplateCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/email_templates/:id', function() {
    it('should route to emailTemplate.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'emailTemplateCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/email_templates/:id', function() {
    it('should route to emailTemplate.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'emailTemplateCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
