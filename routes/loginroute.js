module.exports = (app, client) => {
    app.post("/loginroute", (req, res) => { //login form

        var userName = req.body.username
        var passWord = req.body.password
        console.log(req.body.username + ' and ' + req.body.password)

        const querylogin = {
            text: `SELECT * FROM users WHERE username = ('${userName}') AND password = ('${passWord}');`
        }
        console.log("THE QUERY", querylogin)
        client.query(querylogin.text, (err, result) => {
            if (err) console.log("THE ERROR", err)
            console.log("querylogin executed: ", result)
            console.log("res.rows.length: ", result.rows.length)
            if (result.rows.length !== 0) {
                req.session.user = { name: userName }
                req.session.password = { password: passWord }
                console.log("req.session.user.name: ", req.session.user.name)
                console.log("req.session.user.password: ", req.session.password.password)

                res.render("profile", { username: req.session.user.name })
            } else {
                res.redirect("/loginpage")
            }

        })

    })
}