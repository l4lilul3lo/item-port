let hits = 0;
const getUserInfo = async (req, res) => {
  const { user_name, user_image } = req.session.user;
  return res
    .status(200)
    .json({ user: { user_name: user_name, user_image: user_image } });
};

module.exports = { getUserInfo };
