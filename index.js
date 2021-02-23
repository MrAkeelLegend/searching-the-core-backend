const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Blog = require('./models/blog');

app.use(cors());
app.use(bodyParser.json());


const dbUri = "mongodb+srv://akeellegend:root@cluster0.jjnom.mongodb.net/searching_the_core?retryWrites=true&w=majority";

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Successfully connected to database");
    //listening to the server
    app.listen(5000);
  })
  .catch((err) => console.log(err));


/*app.use((req, res, next) => {
  res.header({"Access-Control-Allow-Origin": "*"});
}) */

//routes
app.get('/', (req, res) => {
  res.send('<h1> Helooo world there!!!! </h1>')
});

/*app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: "the third post to be checked",
    body: "this is the third post after cors policy issue resolved",
    author: "Akeellegend"
  });

  blog.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});*/



app.post('/add-blog', (req, res) => {
  //const newBlog = JSON.parse(req.body);
  /*const blog = new Blog({
    title: newBlog.title,
    body: newBlog.body,
    author: newBlog.author
  });*/

  console.log(req.body.title);

  const blog = new Blog({
    title: req.body.title,
    body: req.body.body,
    author: req.body.author
  });

 // const blog = new Blog(JSON.parse(req.body));

  blog.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) =>{
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/:blogId', (req, res) => {
  Blog.findById(req.params.blogId)
    .then((result) =>{
      res.json(result);
      console.log(req.params.blogId);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/:blogId', (req, res) => {
  Blog.remove({_id: req.params.blogId})
    .then((result) =>{
      res.json(result);
      console.log(`blog: ${req.params.blogId} deleted successfully`);
    })
    .catch((err) => {
      console.log(err);
    });
});

