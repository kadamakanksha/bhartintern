const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to your database (e.g., MongoDB)
mongoose.connect('mongodb://localhost/blogdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for blog posts
const blogPostSchema = new mongoose.Schema({
    text: String,
    images: [String],
    videos: [String],
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API endpoint to save a new blog post
app.post('/api/blogposts', (req, res) => {
    const { text, images, videos } = req.body;

    const newPost = new BlogPost({
        text,
        images,
        videos,
    });

    newPost.save((err, post) => {
        if (err) {
            return res.status(500).json({ error: 'Error saving blog post' });
        }
        return res.json({ message: 'Blog post saved successfully', post });
    });
});

// Other API endpoints for retrieving and updating blog posts

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});