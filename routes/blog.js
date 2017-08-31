const User = require('../models/user'); // Import User Model Schema
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {

    router.post('/newBlog', (req,res) => {
       res.send('test');
    });

    return router;
};