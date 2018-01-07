/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import School from '../api/school/school.model';
import Activity from '../api/activity/activity.model';
import Student from '../api/student/student.model';
import Parent from '../api/parent/parent.model';
import Staffmember from '../api/staffmember/staffmember.model';
import Room from '../api/room/room.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin'
        },{
          provider: 'local',
          role: 'schoolAdmin',
          name: 'School Admin',
          email: 'schooladmin@dubinest.com',
          password: 'admin',
          active: true
        })
        .then(() => {
          console.log('finished populating users')
        })
        .catch(err => console.log('error populating users', err));
      });
    
    School.find({}).remove()
    .then(()=>{
      // TODO: get school admin id
      
      School.create({
        name: 'test school'
        //assign school admin id
      })
      .then(() => {
        //assign school id to school admin

        console.log('finished populating schools');
      })
      .catch(err => console.log('error populating schools', err))
    });
    
    Room.find({}).remove()
    .then(()=>{
      Room.create({
        name: 'test room'
      }).then(()=>{
        console.log('finished populating rooms');
      }).catch(err => console.log('error populating rooms', err))
    });

    Student.find({}).remove()
    .then(()=>{
      Student.create({
        name: 'test student'
      }).then(()=>console.log('finished populating students'))
    }).catch(err =>console.log('error populating students', err));
  
    Parent.find({}).remove()
    .then(()=>{
      Parent.create({
        name: 'test parent'
      }).then(() => console.log('finished populating parents'))
    }).catch(err => console.log('error populating parents.', err));
  }
}
