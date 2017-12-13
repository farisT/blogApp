module.exports = (app, client) => {
    app.post("/register", (req, res)=> {

        var userName = req.body.user
        var passWord = req.body.pass
        console.log(req.body.user + ' and ' + req.body.pass)

        const query1 = {
            text: `SELECT * FROM users WHERE username = '${userName}';`
        }

        const query2 = {
            text: `INSERT INTO users (username, password) values ('${userName}', '${passWord}');`
        }

        client.query(query1, (err, result) =>{
            console.log("query 1 executed: ", result.rows)
            console.log("res.rows.length: ", result.rows.length)
            if (result.rows.length <= 0){
                client.query(query2)
                req.session.user = {name: userName}
                req.session.password = { password: passWord }
                console.log("req.session.user.name: ", req.session.user.name)
                console.log("req.session.user.password: ", req.session.password.password)
                console.log("query 2 executed, inserting done")
                if(req.session.user.name){
                    res.render("profile", {username: req.session.user.name})
                }
            }
            else {
                res.redirect("/registerpage")
                // res.render("signup", {
                //     text: "Username already exist"
                // })
            }
        })
    })
}