const router = require("express").Router();

router.get("/", (req, res) => {
    const test_json = {
        id: 1,
        timestamp: new Date(),
        msg: "Hello!!!!",
    };
    res.send(JSON.stringify(test_json));
});

module.exports = router;
