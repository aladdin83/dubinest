'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var schoolCtrlStub = {
  index: 'schoolCtrl.index',
  show: 'schoolCtrl.show',
  create: 'schoolCtrl.create',
  upsert: 'schoolCtrl.upsert',
  patch: 'schoolCtrl.patch',
  destroy: 'schoolCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var schoolIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './school.controller': schoolCtrlStub
});

describe('School API Router:', function() {
  it('should return an express router instance', function() {
    expect(schoolIndex).to.equal(routerStub);
  });

  describe('GET /api/schools', function() {
    it('should route to school.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'schoolCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/schools/:id', function() {
    it('should route to school.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'schoolCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/schools', function() {
    it('should route to school.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'schoolCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/schools/:id', function() {
    it('should route to school.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'schoolCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/schools/:id', function() {
    it('should route to school.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'schoolCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/schools/:id', function() {
    it('should route to school.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'schoolCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
