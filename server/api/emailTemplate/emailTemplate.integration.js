'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newEmailTemplate;

describe('EmailTemplate API:', function() {
  describe('GET /api/email_templates', function() {
    var emailTemplates;

    beforeEach(function(done) {
      request(app)
        .get('/api/email_templates')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          emailTemplates = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(emailTemplates).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/email_templates', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/email_templates')
        .send({
          name: 'New EmailTemplate',
          info: 'This is the brand new emailTemplate!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newEmailTemplate = res.body;
          done();
        });
    });

    it('should respond with the newly created emailTemplate', function() {
      expect(newEmailTemplate.name).to.equal('New EmailTemplate');
      expect(newEmailTemplate.info).to.equal('This is the brand new emailTemplate!!!');
    });
  });

  describe('GET /api/email_templates/:id', function() {
    var emailTemplate;

    beforeEach(function(done) {
      request(app)
        .get(`/api/email_templates/${newEmailTemplate._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          emailTemplate = res.body;
          done();
        });
    });

    afterEach(function() {
      emailTemplate = {};
    });

    it('should respond with the requested emailTemplate', function() {
      expect(emailTemplate.name).to.equal('New EmailTemplate');
      expect(emailTemplate.info).to.equal('This is the brand new emailTemplate!!!');
    });
  });

  describe('PUT /api/email_templates/:id', function() {
    var updatedEmailTemplate;

    beforeEach(function(done) {
      request(app)
        .put(`/api/email_templates/${newEmailTemplate._id}`)
        .send({
          name: 'Updated EmailTemplate',
          info: 'This is the updated emailTemplate!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedEmailTemplate = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEmailTemplate = {};
    });

    it('should respond with the updated emailTemplate', function() {
      expect(updatedEmailTemplate.name).to.equal('Updated EmailTemplate');
      expect(updatedEmailTemplate.info).to.equal('This is the updated emailTemplate!!!');
    });

    it('should respond with the updated emailTemplate on a subsequent GET', function(done) {
      request(app)
        .get(`/api/email_templates/${newEmailTemplate._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let emailTemplate = res.body;

          expect(emailTemplate.name).to.equal('Updated EmailTemplate');
          expect(emailTemplate.info).to.equal('This is the updated emailTemplate!!!');

          done();
        });
    });
  });

  describe('PATCH /api/email_templates/:id', function() {
    var patchedEmailTemplate;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/email_templates/${newEmailTemplate._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched EmailTemplate' },
          { op: 'replace', path: '/info', value: 'This is the patched emailTemplate!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedEmailTemplate = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedEmailTemplate = {};
    });

    it('should respond with the patched emailTemplate', function() {
      expect(patchedEmailTemplate.name).to.equal('Patched EmailTemplate');
      expect(patchedEmailTemplate.info).to.equal('This is the patched emailTemplate!!!');
    });
  });

  describe('DELETE /api/email_templates/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/email_templates/${newEmailTemplate._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when emailTemplate does not exist', function(done) {
      request(app)
        .delete(`/api/email_templates/${newEmailTemplate._id}`)
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
