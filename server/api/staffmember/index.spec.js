'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var staffmemberCtrlStub = {
  index: 'staffmemberCtrl.index',
  show: 'staffmemberCtrl.show',
  create: 'staffmemberCtrl.create',
  upsert: 'staffmemberCtrl.upsert',
  patch: 'staffmemberCtrl.patch',
  destroy: 'staffmemberCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var staffmemberIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './staffmember.controller': staffmemberCtrlStub
});

describe('Staffmember API Router:', function() {
  it('should return an express router instance', function() {
    expect(staffmemberIndex).to.equal(routerStub);
  });

  describe('GET /api/staffmembers', function() {
    it('should route to staffmember.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'staffmemberCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/staffmembers/:id', function() {
    it('should route to staffmember.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'staffmemberCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/staffmembers', function() {
    it('should route to staffmember.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'staffmemberCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/staffmembers/:id', function() {
    it('should route to staffmember.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'staffmemberCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/staffmembers/:id', function() {
    it('should route to staffmember.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'staffmemberCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/staffmembers/:id', function() {
    it('should route to staffmember.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'staffmemberCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
