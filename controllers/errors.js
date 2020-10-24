exports.four_o_four = (req, res, next) => {
    res.status(404).render('404', {pageTitle: ':(', path:'', isAuthenticated: req.isLoggedIn});
}