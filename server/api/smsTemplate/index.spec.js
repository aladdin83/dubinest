'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var smsTemplateCtrlStub = {
  index: 'smsTemplateCtrl.index',
  show: 'smsTemplateCtrl.show',
  create: 'smsTemplateCtrl.create',
  upsert: 'smsTemplateCtrl.upsert',
  patch: 'smsTemplateCtrl.patch',
  destroy: 'smsTemplateCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var smsTemplateIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './smsTemplate.controller': smsTemplateCtrlStub
});

describe('SmsTemplate API Router:', function() {
  it('should return an express router instance', function() {
    expect(smsTemplateIndex).to.equal(routerStub);
  });

  describe('GET /api/smsTemplates', function() {
    it('should route to smsTemplate.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'smsTemplateCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/smsTemplates/:id', function() {
    it('should route to smsTemplate.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'smsTemplateCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/smsTemplates', function() {
    it('should route to smsTemplate.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'smsTemplateCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/smsTemplates/:id', function() {
    it('should route to smsTemplate.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'smsTemplateCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/smsTemplates/:id', function() {
    it('should route to smsTemplate.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'smsTemplateCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/smsTemplates/:id', function() {
    it('should route to smsTemplate.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'smsTemplateCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
