

module.exports = function (req, res, next) {
    // forbidden 403
    if (!req.user.isAdmin) return res.status(403).send('Access denied');

    next();
}