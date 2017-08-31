/* ===================
 Import Node Modules
 =================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

// Validate Function to check title length
let titleLengthChecker = (title) => {
    // Check if title exists
    if (!title) {
        return false; // Return error
    } else {
        // Check the length of title string
        if (title.length < 5 || title.length > 50) {
            return false; // Return error if not within proper length
        } else {
            return true; // Return as valid title
        }
    }
};

// Validate Function to check if valid title format
let alphaNumericTitleChecker = (title) => {
    // Check if title exists
    if (!title) {
        return false; // Return error
    } else {
        // Regular expression to test for a valid title
        const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
        return regExp.test(title); // Return regular expression test results (true or false)
    }
};

// Array of Title Validators
const titleValidators = [
    {
        validator: titleLengthChecker(),
        message: 'Title must be at least 5 characters but no more than 50'
    },
    {
        validator: alphaNumericTitleChecker(),
        message: 'Only alphanumeric characters allowed'
    }
];

// Validate Function to check body length
let bodyLengthChecker = (body) => {
    // Check if body exists
    if (!body) {
        return false; // Return error
    } else {
        // Check length of body string
        if (body.length < 5 || body.length > 500) {
            return false; // Return error if does not meet length requirement
        } else {
            return true; // Return as valid body
        }
    }
};

// Array of Body validators
const bodyValidators = [
    {
        validator: bodyLengthChecker,
        message: 'Body must be at least 5 characters but no more than 500'
    },
];

// Validate Function to check comment length
let commentLengthChecker = (comment) => {
    // Check if comment exists
    if (!comment[0]) {
        return false; // Return error
    } else {
        // Check password length
        if (comment[0].length < 1 || comment[0].length > 200) {
            return false; // Return error if comment length requirement is not met
        } else {
            return true; // Return password as valid
        }
    }
};


// Array of Comment validators
const commentValidators = [
    {
        validator: commentLengthChecker,
        message: 'Comments may not exceed 200 characters'
    },
];

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate: titleValidators
    },
    body: {
        type: String,
        required: true,
        validate: bodyValidators
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: {
        type: Array
    },
    dislikes: {
        type: Number,
        default: 0
    },
    dislikedBy: {
        type: Array
    },
    comments: [
        {
            comment: {
                type: String,
                validate: commentValidators
            },
            commentator: {
                type: String
            }
        }
    ]
});


// Export Module/Schema
module.exports = mongoose.model('Blog', blogSchema);
