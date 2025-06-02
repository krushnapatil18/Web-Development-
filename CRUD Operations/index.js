const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Allows us to use PUT and DELETE methods in forms

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS as the templating engine
app.set('view engine', 'ejs');  
app.set('views', path.join(__dirname, 'views'));

let posts = [
    {
        id: uuidv4(),
        username: 'krsna',
        content : 'Hello, this is my first post!',
    },
    {
        id: uuidv4(),
        username: 'john',
        content : 'This is another post by John.',
    },
    {
        id: uuidv4(),
        username: 'jane',
        content : 'Jane here, sharing my thoughts!',
    }
];


//show you array post 
app.get('/posts', (req, res) => {
    res.render('index.ejs', {posts  }); 

});


// Create a new post
app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
});


// Handle form submission to create a new post
app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4(); 
    if (!username || !content) {
        return res.status(400).send('Username and content are required.');
    }
    posts.push({ id, username, content });
    res.redirect('/posts');
});

// Show a specific post by ID
app.get('/posts/:id', (req, res) => {
    let{ id } = req.params;
    let post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).send('Post not found.');
    }
    res.render('show.ejs', { post });
});

app.patch('/posts/:id', (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).send('Post not found.');
    }
    post.content = newContent;
    res.redirect('/posts/');
});

app.get('/posts/:id/edit', (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).send('Post not found.');
    }
    res.render('edit.ejs', { post });
});


app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;
    let postIndex = posts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
        return res.status(404).send('Post not found.');
    }
    posts = posts.filter((p) => p.id !== id); //or can use post.splice(postIndex, 1);
    res.redirect('/posts');
});

//
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
