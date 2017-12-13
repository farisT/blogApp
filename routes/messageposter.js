module.exports = (app, client) => {
    
    app.post("/messageposter", (req, res)=> {

        var title = req.body.title
        var body = req.body.body
        var user = req.session.user.name

        console.log(req.body.title + ' and ' + req.body.body)
        console.log(user)


        const querypost = {
            text: `INSERT INTO messages (title,body,user_id) SELECT '${title}','${body}', users.id FROM users WHERE username = '${user}'`
        }

        client.query(querypost, (err, result) =>{
            console.log("querypost executed: ", result.rows)
            console.log("res.rows.length: ", result.rows.length)
            console.log("req.session.user.name: ", req.session.user.name)
            console.log("req.session.user.password: ", req.session.password.password)
            console.log("query 2 executed, inserting done")
            var text = "message posted!"
            res.render("profile", {username: req.session.user.name, text:text})

            })
    })
}