exports.four_o_four = (req, res, next) => {
    res.status(404).render('404', {pageTitle: ':(', path:'', isAuthenticated: req.session.isLoggedIn});
}

exports.fiveHundred = (req, res, next) => {
    res.status(404).render('500', {pageTitle: 'Some Error Occured', path:'', isAuthenticated: req.session.isLoggedIn});
}