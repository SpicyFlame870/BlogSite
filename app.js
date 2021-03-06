
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-rohan:Rohan@123@cluster0.r6kwo.mongodb.net/blogsdb",{useNewUrlParser: true , useUnifiedTopology: true});

const homeStartingContent = "Hey publish your first blog post by clicking the compose button!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


const postSchema = {
  title: String,
  content: String
}

const Post = new mongoose.model("Post",postSchema);



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){

  Post.find({},function(err,foundPosts){
    if(!err){
      
      if(foundPosts.length==0)
      res.render("home", {homeContent: homeStartingContent, posts: foundPosts});
      else res.render("home", {homeContent: " ", posts: foundPosts});

    }
  })
  
  
})

app.get("/about",function(req,res){

  res.render("about", {aboutContent: aboutContent});
})

app.get("/contact",function(req,res){

  res.render("contact", {contactContent: contactContent});
})

app.get("/compose",function(req,res){

  res.render("compose");
})

app.post("/compose",function(req,res){
  
  const post = new Post({
    title:  req.body.postTitle,
    content:  req.body.postBody
  })
  
  post.save();

  res.redirect("/");
})

app.get("/posts/:postId",function(req,res){

  const requestedId = req.params.postId;

   Post.findById(requestedId,function(err,foundPost){

      if(!err){

          res.render("post",{post: foundPost});
      }
      else{
          console.log("Not found");
      }
   })

})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
