'use strict'
import mailgun from 'mailgun-js';
import config from '../config/environment';

class Mailgun{
    constructor(options){}

    test(){
        console.log("Testing Mail gun");
    }
}

export default Mailgun(options)

