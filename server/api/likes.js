const router = require("express").Router();
const { Like } = require("../db/models");
module.exports = router;

router.get("/:userId", async (req, res, next) => {
  try {
    const likes = await Like.findAll({ where: { userId: req.params.userId } });
    res.json(likes);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { userId, qId: questionId, status } = req.body;
    await Like.create({ userId, questionId, status });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { userId, qId: questionId, status } = req.body;
    await Like.update(
      {
        status
      },
      { where: { userId, questionId } }
    );
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});