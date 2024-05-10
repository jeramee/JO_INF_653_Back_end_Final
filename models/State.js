// models/State.js
const mongoose = require('mongoose');

// Define the schema for the "states" collection
const stateSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    slug: String,
    code: {
        type: String,
        required: true
    },
    nickname: String,
    website: String,
    admission_date: Date,
    admission_number: Number,
    capital_city: String,
    capital_url: String,
    population: {
        type: Number,
        required: true
    },
    population_rank: Number,
    constitution_url: String,
    state_flag_url: String,
    state_seal_url: String,
    map_image_url: String,
    landscape_background_url: String,
    skyline_background_url: String,
    twitter_url: String,
    facebook_url: String,
    funfacts: [String]
});

// Define the model for the "states" collection
const State = mongoose.model('State', stateSchema, 'states');

module.exports = State;
