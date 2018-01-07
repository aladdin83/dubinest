'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newSchool;

describe('School API:', function() {
  describe('GET /api/schools', function() {
    var schools;

    beforeEach(function(done) {
      request(app)
        .get('/api/schools')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          schools = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(schools).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/schools', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/schools')
        .send({
          name: 'New School',
          info: 'This is the brand new school!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newSchool = res.body;
          done();
        });
    });

    it('should respond with the newly created school', function() {
      expect(newSchool.name).to.equal('New School');
      expect(newSchool.info).to.equal('This is the brand new school!!!');
    });
  });

  describe('GET /api/schools/:id', function() {
    var school;

    beforeEach(function(done) {
      request(app)
        .get(`/api/schools/${newSchool._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          school = res.body;
          done();
        });
    });

    afterEach(function() {
      school = {};
    });

    it('should respond with the requested school', function() {
      expect(school.name).to.equal('New School');
      expect(school.info).to.equal('This is the brand new school!!!');
    });
  });

  describe('PUT /api/schools/:id', function() {
    var updatedSchool;

    beforeEach(function(done) {
      request(app)
        .put(`/api/schools/${newSchool._id}`)
        .send({
          name: 'Updated School',
          info: 'This is the updated school!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSchool = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSchool = {};
    });

    it('should respond with the updated school', function() {
      expect(updatedSchool.name).to.equal('Updated School');
      expect(updatedSchool.info).to.equal('This is the updated school!!!');
    });

    it('should respond with the updated school on a subsequent GET', function(done) {
      request(app)
        .get(`/api/schools/${newSchool._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let school = res.body;

          expect(school.name).to.equal('Updated School');
          expect(school.info).to.equal('This is the updated school!!!');

          done();
        });
    });
  });

  describe('PATCH /api/schools/:id', function() {
    var patchedSchool;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/schools/${newSchool._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched School' },
          { op: 'replace', path: '/info', value: 'This is the patched school!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedSchool = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedSchool = {};
    });

    it('should respond with the patched school', function() {
      expect(patchedSchool.name).to.equal('Patched School');
      expect(patchedSchool.info).to.equal('This is the patched school!!!');
    });
  });

  describe('DELETE /api/schools/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/schools/${newSchool._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when school does not exist', function(done) {
      request(app)
        .delete(`/api/schools/${newSchool._id}`)
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
