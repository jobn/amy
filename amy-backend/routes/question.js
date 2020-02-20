var express = require("express");
var router = express.Router();

const answers = [
  {
    content: "This is the answer content",
    additionalContent: "This is additional content"
  },
  {
    content: "This is the answer content",
    additionalContent: "This is additional content"
  }
];

function buildResponse(question) {
  return [
    ...answers,
    {
      content: question,
      additionalContent: "bla bla"
    }
  ];
}

/* POST question */
router.post("/", function(req, res) {
  if (!req.body) {
    res.status(400).send("Bad Request");
  }
  console.log(req.body);

  return res.json(buildResponse(req.body.question));
});

module.exports = router;
