const express = require("express");
const app = express();
let port = 1100;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

app.set("viewengine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let post = [
  {
    id: uuidv4(),
    username: "Apna College",
    content: "Programming is my Passion.",
  },
  {
    id: uuidv4(),
    username: "Om Rakibe",
    content: "I got my first internship",
  },
  {
    id: uuidv4(),
    username: "Shardha Khapra",
    content: "Hard Work is Key to Success.",
  },
];

app.post("/post", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  post.push({ id, username, content });
  // res.send("post request working");
  res.redirect("/post");
});

app.get("/post", (req, res) => {
  res.render("index.ejs", { post });
});

app.get("/post/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/post/:id", (req, res) => {
  let { id } = req.params;
  let posts = post.find((p) => id === p.id);
  console.log(posts);
  res.render("post.ejs", { posts });
});

app.patch("/post/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  // console.log(newContent);
  let posts = post.find((p) => id === p.id);
  posts.content = newContent;
  console.log(posts);
  res.redirect("/post");
});

app.get("/post/:id/edit", (req, res) => {
  let { id } = req.params;
  let posts = post.find((p) => id === p.id);
  res.render("edit.ejs", { posts });
});

app.delete("/post/:id", (req, res) => {
  let { id } = req.params;
  post = post.filter((p) => id !== p.id);
  res.redirect("/post");
});

app.listen(port, () => {
  console.log(`App is listening to ${port}`);
});
