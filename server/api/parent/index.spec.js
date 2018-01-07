'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var parentCtrlStub = {
  index: 'parentCtrl.index',
  show: 'parentCtrl.show',
  create: 'parentCtrl.create',
  upsert: 'parentCtrl.upsert',
  patch: 'parentCtrl.patch',
  destroy: 'parentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var parentIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './parent.controller': parentCtrlStub
});

describe('Parent API Router:', function() {
  it('should return an express router instance', function() {
    expect(parentIndex).to.equal(routerStub);
  });

  describe('GET /api/parents', function() {
    it('should route to parent.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'parentCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/parents/:id', function() {
    it('should route to parent.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'parentCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/parents', function() {
    it('should route to parent.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'parentCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/parents/:id', function() {
    it('should route to parent.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'parentCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/parents/:id', function() {
    it('should route to parent.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'parentCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/parents/:id', function() {
    it('should route to parent.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'parentCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
