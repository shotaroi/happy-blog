import express from "express";
import { dirname } from "path";
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
// const __dirname = dirname(fileURLToPath(import.meta.url));
// const indexPath = __dirname + "/views/index.ejs";
// const postsPath =  + "/views/posts.ejs";
// const postPath = __dirname + "/views/post.ejs";

// Using middleware to use __dirnamestatic files in public folder.
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// View all blog posts. Manages get and post request to "/posts".
let blogList = [];

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/posts", (req, res) => {
    const blogTitle = req.body["blogTitle"];
    const blogBody = req.body["blogBody"];
    const date = new Date().toLocaleString();
    blogList.push({
        id: generateID(),
        title: blogTitle, 
        body: blogBody,
        date: date,
    });
    res.render("posts.ejs", {blogList: blogList});
});

// Viewing all the blog posts
app.get("/posts", (req, res) => {
    res.render("posts.ejs", {blogList: blogList});
});

function generateID() {
    return Math.random().toString(16).slice(2);
};

// Viewing individual blog post
app.get("/post/:id", (req, res) => {
    const postID = req.params.id;
    const post = blogList.find(post => post.id === postID);
    res.render("post.ejs", {post: post});
});

// Viewing editing page for the individual blog post
app.get("/edit/:id", (req, res) => {
    const postID = req.params.id;
    const post = blogList.find(post => post.id === postID);
    res.render("edit.ejs", {post: post});
});

// Edit a blog post
app.post("/edit/", (req, res) => {
    // const newTitle = req.body["blogTitle"];
    // const newBody = req.body["blogBody"];
    // const newDate = new Date().toLocaleString();
    // const postID = req.params.id;
    // console.log(postID);
    // const post = blogList.find(post => post.id === postID);
    // post["title"] = newTitle;
    // post["body"] = newBody;
    // post["date"] = newDate;
    // res.render("edit.ejs", {post: post});
    res.send("<h1>The Edit functionality is not done yet</h1>");
});

// Blog post deletion
app.post("/delete/:id", (req, res) => {
    const postID = req.params.id;
    blogList = blogList.filter(post => post.id !== postID);
    res.send(
        '<script>alert("The post is deleted successfully"); window.location="/";</script>'
    );
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});