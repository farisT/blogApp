const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const pg = require('pg');
const Client = pg.Client
require('dotenv').load();
var cookieParser = require("cookie-parser");
const session = require('express-session');
var bcrypt = require('bcrypt');


app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.set("view engine", "pug")


const client = new Client({
    user: process.env.POSTGRES_USER,
    host: 'localhost',
    database: 'blogapp',
    password: process.env.POSTGRES_PASSWORD,
    port: 5432
})
client.connect()

var sess = {
	secret: 'the session',
	cookie: {}

}
app.use(session(sess))

app.get("/", (req,res)=> {
	res.render("index", {user: req.session.user})
})



require('./routes/loginroute.js')(app, client,bcrypt)
require('./routes/logout.js')(app,client)
require('./routes/loginpage.js')(app,client)
require('./routes/registerpage.js')(app)
require('./routes/register.js')(app,client,bcrypt)
require('./routes/blogposts.js')(app)
require('./routes/messageposter.js')(app, client)
require('./routes/profilepage.js')(app)
require('./routes/feed.js')(app, client)




// app.post("/postmessage", (req, res)=> { // this is to check if the user is allowed to post a message
// 	if(req.session.user) {
// 		console.log("INSERTING MESSAGE IN DATABASE", req.body.body)
// 		res.status(200).end()
// 	}
// 	else {
// 		res.status(300).redirect("/")
// 	}
// })



app.get("/supersecretroute", (req,res)=> {
	console.log("THE WHOLE SESSION", req.session)
	if(req.session.user) {
		res.render("secretpage", {user:req.session.user})
	}
	else{
		res.redirect("/")
	}
})



app.listen(3000, function() {
	console.log("running on 3000")
})


// STRUCTURE OF THE BLOG POSTING
// POST username
// POST title
// post body
// 	comment username
// 	comment title
// 	comment body
// ...leave comment (which links back to the original post)

// SELECT postsusers.name AS postsusername,
// commentsusers.name AS commentusername, postsusers.body
// AS postsbody, postsusers.title AS poststitle,
// commentsusers.body AS commentbody, commentsusers
// commentsusers.title AS commentitle

// (
// 	SELECT users.name, posts.title,
// 	posts.body
// 	FROM posts
// 	LEFT JOIN users
// 	on users.id = posts.user_id
// )	AS postsusers

// (
// 	SELECT users.name,
// 	comments.title, comments.body,
// 	FROM comments
// 	LEFT JOIN users
// 	ON users.id = comment.user_id
// ) AS commentsusers
// ORDER BY posts.title