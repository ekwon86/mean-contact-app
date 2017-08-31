const User = require('../models/user'); // Import User Model Schema
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {

    router.post('/newBlog', (req,res) => {
       if(!req.body.title){
           res.json({ success: false, message: 'Blog title is required' });
       } else {
           if(!req.body.body){
               res.json({ success: false, message: 'Blog body is required' });
           } else {
               if(!req.body.createdBy){
                   res.json({ success: false, message: 'Blog creator is required' });
               } else {
                   const blog = new Blog({
                       title: req.body.title,
                       body: req.body.body,
                       createdBy: req.body.createdBy
                   });
                   blog.save((err) => {
                       // Check if error
                       if (err) {
                           // Check if error is a validation error
                           if (err.errors) {
                               // Check if validation error is in the title field
                               if (err.errors.title) {
                                   res.json({ success: false, message: err.errors.title.message }); // Return error message
                               } else {
                                   // Check if validation error is in the body field
                                   if (err.errors.body) {
                                       res.json({ success: false, message: err.errors.body.message }); // Return error message
                                   } else {
                                       res.json({ success: false, message: err }); // Return general error message
                                   }
                               }
                           } else {
                               res.json({ success: false, message: err }); // Return general error message
                           }
                       } else {
                           res.json({ success: true, message: 'Blog saved!' }); // Return success message
                       }
                   });
               }
           }
       }
    });

    router.get('/allBlogs', (req, res) => {
        Blog.find({}, (err,blogs) => {
           if (err) {
               res.json({ success: false, message: err });
           } else {
               if (!blogs) {
                   res.json({ success: false, message: 'No blogs found' });
               } else {
                   res.json({ success: true, blogs: blogs });
               }
           }
        }).sort({ '_id': -1 }); // Sort by descending order (new on top)
    });

    return router;
};