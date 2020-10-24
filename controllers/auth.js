exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req
    // .get('Cookie')
    // .split(';')[2]
    // .trim()
    // .split('=')[1];
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login Here',
        isAuthenticated: false
    });
}

exports.postLogin = (req, res, next) => {
    // setting a cookie
    // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
    
    //storing session in memory
    req.session.isLoggedIn = true;
    res.redirect('/');
}