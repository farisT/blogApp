module.exports = (app, client, bcrypt) => {
    app.post("/loginroute", (req, res) => {
        var userName = req.body.username
        var passWord = req.body.password
        console.log(req.body.username + ' and ' + req.body.password)

        const query1 = {
                    text: `SELECT * FROM users WHERE username = '${userName}';`
                }

        client.query(query1, (err, result) => {
            console.log("result.rows query1 = ", result.rows)
            console.log("res.rows.length: ", result.rows.length)
            if (!result.rows[0]){ // so if there is no match with username > go to sign up
                res.render("registerpage", {
                    text: "Username does not exist, please sign up first"
                })
            }
            else { // so if there is a match with username, compare the hashed password
                bcrypt.compare(passWord, result.rows[0].password, function(err, result) {
                    if (result == true) { // if the password is correct > go to profile 
                        req.session.user = {name: userName}
                        console.log("req.session.user.name: ", req.session.user.name)
                        if(req.session.user.name){
                            res.render("profile", {username: req.session.user.name})
                        }
                    }
                    else { // if the password is incorrect 
                        res.render("loginpage", {
                            text: "Username and password combination is incorrect, please try again"
                        })
                    }
                })
            }
        }) 
    })
}



