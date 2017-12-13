module.exports = (app,client) => {

    app.get("/feed", (req, res) => {

    	var user = req.session.user.name

        const querymessages = {
            text: `SELECT * FROM messages WHERE user_id =(SELECT id from users WHERE username='${user}');`
        }
	    console.log("THE WHOLE SESSION", req.session)
	    console.log(querymessages)
	    client.query(querymessages, (err, result) =>{
            console.log("querymessages executed: ", result.rows)
            console.log("res.rows.length: ", result.rows.length)
            console.log("req.session.user.name: ", req.session.user.name)
            console.log("querymessages executed, reading all messages")
            var allmessages = result.rows
			var text = "no messages posted yet!"
         	if (result.rows.length !== 0){
            	res.render("feed", {username:req.session.user.name, allmessages:allmessages})
            }
            else{
            	res.render("profile", {username: req.session.user.name, text:text})
				}
            })


    })
}

