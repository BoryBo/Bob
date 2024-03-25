const db = require('../models');

exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error('Missing user`s id');
    const user = await db.User.findOrCreate({
      where: { user_id: id }
    });
    res.status(200).send({ id });
  } catch (error) {
    res
      .status(401)
      .send({ message: error.message });
  }
};
