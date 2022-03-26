const { getUserByUsername } = require("../../models/users/users");
const checkUsernameExists = async (req, res) => {
  console.log(req.body.username);
  const { username } = req.body;

  const user = await getUserByUsername(username);

  if (user) {
    return res.status(409).send("");
  }
  return res.status(200).send("");
};

module.exports = { checkUsernameExists };
