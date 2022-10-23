// Middleware functions execute between requests

// If userId is not is session, redirect to login page
const checkSession = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }

  res.redirect("/auth/login");
};

module.exports = checkSession;
