"use strict";


const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let eventV4Schema = new Schema({
    // free schema
}, {"strict": false, "validateBeforeSave": false});

mongoose.model('EventV4', eventV4Schema);