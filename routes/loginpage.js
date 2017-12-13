module.exports = (app, client) => {

    app.get("/loginpage", (req, res) => {
        res.render("loginpage")

    })
}