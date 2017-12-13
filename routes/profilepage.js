module.exports = (app) => {

    app.get("/profilepage", (req, res) => {
	    console.log("THE WHOLE SESSION", req.session)
	    if(req.session.user) {
			res.render("profile", {username:req.session.user.name})
			console.log(req.session.user.name)

		}
		else{
			res.redirect("/loginpage")
		}


    })
}

