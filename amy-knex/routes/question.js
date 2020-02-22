var express = require("express");
var router = express.Router();
var mockModelInterface = require("../mockModelInterface");
var instanceTokenAuthentication = require("../middlewares/instanceTokenAuthentication");
var validator = require("express-validator");
var db = require("../db");

const validate = [
  validator.body("question", "question doesn't exists").exists()
];

/* POST question. */
router.post("/", instanceTokenAuthentication, validate, async (req, res) => {
  const { instance } = res.locals;
  const { question } = req.body;

  const errors = validator.validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const answers = await mockModelInterface(question, instance.name);

  res.json({
    question,
    instanceId: instance.id,
    instanceName: instance.name,
    answers
  });

  await db("events").insert({
    instance_id: instance.id,
    payload: req.body,
    request: req.headers
  });
});

module.exports = router;
