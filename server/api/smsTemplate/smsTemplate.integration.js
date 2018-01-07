'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newSmsTemplate;

describe('SmsTemplate API:', function() {
  describe('GET /api/smsTemplates', function() {
    var smsTemplates;

    beforeEach(function(done) {
      request(app)
        .get('/api/smsTemplates')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          smsTemplates = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(smsTemplates).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/smsTemplates', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/smsTemplates')
        .send({
          name: 'New SmsTemplate',
          info: 'This is the brand new smsTemplate!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newSmsTemplate = res.body;
          done();
        });
    });

    it('should respond with the newly created smsTemplate', function() {
      expect(newSmsTemplate.name).to.equal('New SmsTemplate');
      expect(newSmsTemplate.info).to.equal('This is the brand new smsTemplate!!!');
    });
  });

  describe('GET /api/smsTemplates/:id', function() {
    var smsTemplate;

    beforeEach(function(done) {
      request(app)
        .get(`/api/smsTemplates/${newSmsTemplate._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          smsTemplate = res.body;
          done();
        });
    });

    afterEach(function() {
      smsTemplate = {};
    });

    it('should respond with the requested smsTemplate', function() {
      expect(smsTemplate.name).to.equal('New SmsTemplate');
      expect(smsTemplate.info).to.equal('This is the brand new smsTemplate!!!');
    });
  });

  describe('PUT /api/smsTemplates/:id', function() {
    var updatedSmsTemplate;

    beforeEach(function(done) {
      request(app)
        .put(`/api/smsTemplates/${newSmsTemplate._id}`)
        .send({
          name: 'Updated SmsTemplate',
          info: 'This is the updated smsTemplate!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSmsTemplate = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSmsTemplate = {};
    });

    it('should respond with the updated smsTemplate', function() {
      expect(updatedSmsTemplate.name).to.equal('Updated SmsTemplate');
      expect(updatedSmsTemplate.info).to.equal('This is the updated smsTemplate!!!');
    });

    it('should respond with the updated smsTemplate on a subsequent GET', function(done) {
      request(app)
        .get(`/api/smsTemplates/${newSmsTemplate._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let smsTemplate = res.body;

          expect(smsTemplate.name).to.equal('Updated SmsTemplate');
          expect(smsTemplate.info).to.equal('This is the updated smsTemplate!!!');

          done();
        });
    });
  });

  describe('PATCH /api/smsTemplates/:id', function() {
    var patchedSmsTemplate;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/smsTemplates/${newSmsTemplate._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched SmsTemplate' },
          { op: 'replace', path: '/info', value: 'This is the patched smsTemplate!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedSmsTemplate = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedSmsTemplate = {};
    });

    it('should respond with the patched smsTemplate', function() {
      expect(patchedSmsTemplate.name).to.equal('Patched SmsTemplate');
      expect(patchedSmsTemplate.info).to.equal('This is the patched smsTemplate!!!');
    });
  });

  describe('DELETE /api/smsTemplates/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/smsTemplates/${newSmsTemplate._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when smsTemplate does not exist', function(done) {
      request(app)
        .delete(`/api/smsTemplates/${newSmsTemplate._id}`)
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
