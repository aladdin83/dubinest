'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newStudent;

describe('Student API:', function() {
  describe('GET /api/students', function() {
    var students;

    beforeEach(function(done) {
      request(app)
        .get('/api/students')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          students = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(students).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/students', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/students')
        .send({
          name: 'New Student',
          info: 'This is the brand new student!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newStudent = res.body;
          done();
        });
    });

    it('should respond with the newly created student', function() {
      expect(newStudent.name).to.equal('New Student');
      expect(newStudent.info).to.equal('This is the brand new student!!!');
    });
  });

  describe('GET /api/students/:id', function() {
    var student;

    beforeEach(function(done) {
      request(app)
        .get(`/api/students/${newStudent._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          student = res.body;
          done();
        });
    });

    afterEach(function() {
      student = {};
    });

    it('should respond with the requested student', function() {
      expect(student.name).to.equal('New Student');
      expect(student.info).to.equal('This is the brand new student!!!');
    });
  });

  describe('PUT /api/students/:id', function() {
    var updatedStudent;

    beforeEach(function(done) {
      request(app)
        .put(`/api/students/${newStudent._id}`)
        .send({
          name: 'Updated Student',
          info: 'This is the updated student!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedStudent = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStudent = {};
    });

    it('should respond with the updated student', function() {
      expect(updatedStudent.name).to.equal('Updated Student');
      expect(updatedStudent.info).to.equal('This is the updated student!!!');
    });

    it('should respond with the updated student on a subsequent GET', function(done) {
      request(app)
        .get(`/api/students/${newStudent._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let student = res.body;

          expect(student.name).to.equal('Updated Student');
          expect(student.info).to.equal('This is the updated student!!!');

          done();
        });
    });
  });

  describe('PATCH /api/students/:id', function() {
    var patchedStudent;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/students/${newStudent._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Student' },
          { op: 'replace', path: '/info', value: 'This is the patched student!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedStudent = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedStudent = {};
    });

    it('should respond with the patched student', function() {
      expect(patchedStudent.name).to.equal('Patched Student');
      expect(patchedStudent.info).to.equal('This is the patched student!!!');
    });
  });

  describe('DELETE /api/students/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/students/${newStudent._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when student does not exist', function(done) {
      request(app)
        .delete(`/api/students/${newStudent._id}`)
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
