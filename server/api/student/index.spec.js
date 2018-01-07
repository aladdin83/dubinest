'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var studentCtrlStub = {
  index: 'studentCtrl.index',
  show: 'studentCtrl.show',
  create: 'studentCtrl.create',
  upsert: 'studentCtrl.upsert',
  patch: 'studentCtrl.patch',
  destroy: 'studentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var studentIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './student.controller': studentCtrlStub
});

describe('Student API Router:', function() {
  it('should return an express router instance', function() {
    expect(studentIndex).to.equal(routerStub);
  });

  describe('GET /api/students', function() {
    it('should route to student.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'studentCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/students/:id', function() {
    it('should route to student.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'studentCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/students', function() {
    it('should route to student.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'studentCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/students/:id', function() {
    it('should route to student.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'studentCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/students/:id', function() {
    it('should route to student.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'studentCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/students/:id', function() {
    it('should route to student.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'studentCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
