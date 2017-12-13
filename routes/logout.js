module.exports = (app, client) => {

    app.post("/logout", (req, res) => {
        req.session.destroy();
        res.redirect("/")

    })
}