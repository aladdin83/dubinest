'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var activityCtrlStub = {
  index: 'activityCtrl.index',
  show: 'activityCtrl.show',
  create: 'activityCtrl.create',
  upsert: 'activityCtrl.upsert',
  patch: 'activityCtrl.patch',
  destroy: 'activityCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var activityIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './activity.controller': activityCtrlStub
});

describe('Activity API Router:', function() {
  it('should return an express router instance', function() {
    expect(activityIndex).to.equal(routerStub);
  });

  describe('GET /api/activities', function() {
    it('should route to activity.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'activityCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/activities/:id', function() {
    it('should route to activity.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'activityCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/activities', function() {
    it('should route to activity.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'activityCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/activities/:id', function() {
    it('should route to activity.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'activityCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/activities/:id', function() {
    it('should route to activity.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'activityCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/activities/:id', function() {
    it('should route to activity.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'activityCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
