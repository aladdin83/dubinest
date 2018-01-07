'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newStaffmember;

describe('Staffmember API:', function() {
  describe('GET /api/staffmembers', function() {
    var staffmembers;

    beforeEach(function(done) {
      request(app)
        .get('/api/staffmembers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          staffmembers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(staffmembers).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/staffmembers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/staffmembers')
        .send({
          name: 'New Staffmember',
          info: 'This is the brand new staffmember!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newStaffmember = res.body;
          done();
        });
    });

    it('should respond with the newly created staffmember', function() {
      expect(newStaffmember.name).to.equal('New Staffmember');
      expect(newStaffmember.info).to.equal('This is the brand new staffmember!!!');
    });
  });

  describe('GET /api/staffmembers/:id', function() {
    var staffmember;

    beforeEach(function(done) {
      request(app)
        .get(`/api/staffmembers/${newStaffmember._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          staffmember = res.body;
          done();
        });
    });

    afterEach(function() {
      staffmember = {};
    });

    it('should respond with the requested staffmember', function() {
      expect(staffmember.name).to.equal('New Staffmember');
      expect(staffmember.info).to.equal('This is the brand new staffmember!!!');
    });
  });

  describe('PUT /api/staffmembers/:id', function() {
    var updatedStaffmember;

    beforeEach(function(done) {
      request(app)
        .put(`/api/staffmembers/${newStaffmember._id}`)
        .send({
          name: 'Updated Staffmember',
          info: 'This is the updated staffmember!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedStaffmember = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStaffmember = {};
    });

    it('should respond with the updated staffmember', function() {
      expect(updatedStaffmember.name).to.equal('Updated Staffmember');
      expect(updatedStaffmember.info).to.equal('This is the updated staffmember!!!');
    });

    it('should respond with the updated staffmember on a subsequent GET', function(done) {
      request(app)
        .get(`/api/staffmembers/${newStaffmember._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let staffmember = res.body;

          expect(staffmember.name).to.equal('Updated Staffmember');
          expect(staffmember.info).to.equal('This is the updated staffmember!!!');

          done();
        });
    });
  });

  describe('PATCH /api/staffmembers/:id', function() {
    var patchedStaffmember;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/staffmembers/${newStaffmember._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Staffmember' },
          { op: 'replace', path: '/info', value: 'This is the patched staffmember!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedStaffmember = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedStaffmember = {};
    });

    it('should respond with the patched staffmember', function() {
      expect(patchedStaffmember.name).to.equal('Patched Staffmember');
      expect(patchedStaffmember.info).to.equal('This is the patched staffmember!!!');
    });
  });

  describe('DELETE /api/staffmembers/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/staffmembers/${newStaffmember._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when staffmember does not exist', function(done) {
      request(app)
        .delete(`/api/staffmembers/${newStaffmember._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
