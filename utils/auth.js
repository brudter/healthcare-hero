const withAuth = (req, res, next) => {
    if (!req.session.provider_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;
