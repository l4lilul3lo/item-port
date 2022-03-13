const isAuthenticated = async (req, res) => {
  try {
    if (req.session.user) {
      return res.status(200).send({ message: "Authorized" });
    }
    return res.status(401).json({ message: "Not Authorized" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { isAuthenticated };
