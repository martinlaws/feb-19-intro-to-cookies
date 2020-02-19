const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  if (req.cookies.language === "english") {
    res.render("english");
  } else if (req.cookies.language === "french") {
    res.render("french");
  } else {
    res.render("choose-language");
  }
});

router.get("/lang/:language", (req, res) => {
  const languageSelection = req.params.language;

  res.cookie("language", languageSelection);
  res.redirect("/");
});

router.get("/clear-language", (req, res) => {
  res.clearCookie("language");
  res.redirect("/");
});

// DEMO 2 BELOW:
const usersDB = [{ username: "mlaws", password: "123", superpower: "eating" }];

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/treasure", (req, res) => {
  const findUser = username => usersDB.find(user => user.username === username);

  const currentUser = findUser(req.cookies.username);
  res.render("treasure", { currentUser });
});

router.post("/login", (req, res) => {
  // let's use the function below to validate username and password
  const validateUser = (username, password) => {
    // we need to return the _found_ user object
    return usersDB.find(
      // find loops over everything in usersDB and returns the first case where the conditions match
      user => user.username === username && user.password === password
    );
  };

  const { username, password } = req.body;

  if (validateUser(username, password)) {
    res.cookie("username", username);
    res.redirect("/treasure");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
