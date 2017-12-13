module.exports = (app) => {

    app.get("/registerpage", (req, res) => {
        res.render("registerpage")

    })
}