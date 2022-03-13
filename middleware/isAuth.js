const isAuth = async (req, res, next) => {
  try {
    console.log(req.sessionID);
    console.log(req.session);
    if (req.session.user) {
      return next();
    }
    return res.status(401).json({ message: "Not Authorized" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { isAuth };
