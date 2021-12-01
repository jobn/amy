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

  const event = {
    name: "question",
    instance_id: instance.id,
    payload: { question },
    request: { ip: req.ip, userAgent: req.get("user-agent") }
  };

  console.log("event", JSON.stringify(event));

  await db("events").insert(event);
});

module.exports = router;
