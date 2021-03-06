const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Platform = require("../../models/Platform");

//API for counting total number of users for leaderboard pagination
router.route("/count").get((req, res) => {
  return User.countDocuments({isPlatform:false}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      return res.json(data);
    }
  });
});

router.route("/").get((req, res) => {
  const page = req.query.page || 0;
  const size = req.query.size || 10;
  return User.find(
    {isPlatform:false},
    {},
    {
      skip: (page - 1) * size,
      limit: size,
      sort: {
        score: -1,
      },
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        return res.json({ data: data, currentPage: page });
      }
    }
  );
});
// @route POST api/users/register
// @desc Register user
// @access Public

router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        bio: req.body.bio,
        score: 0,
        isPlatform: req.body.isPlatform || false,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              //Check if user type is platform, if yes, create a platform entry automatically using user details
              if (user.isPlatform) {
                const newPlatform = new Platform({
                  name: req.body.name,
                  description: req.body.description,
                  owner_ID: user._id,
                  tags: "",
                });
                newPlatform.save().then((platform) => res.json(user));
              } else {
                res.json(user);
              }
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public

router.put("/:id/update-score", async (req, res) => {
  const currentState = await User.findOne({ _id: req.params.id });

  const updateScore = (currentState.score || 0) + req.body.pointsScored;

  const badgesEarned = req.body.badgesEarned;

  const updatedScore = await User.findOneAndUpdate(
    { _id: req.params.id },
    { score: updateScore, badges: badgesEarned },
    { new: true }
  );
  return res
    .status(200)
    .json({ score: updatedScore.score, badges: updatedScore.badges });
});

router.put("/:id/update-avatar", async (req, res) => {
  const updatedAvatar = await User.findOneAndUpdate(
    { _id: req.params.id },
    { avatarId: req.body.avatarId },
    { new: true }
  );
  return res.status(200).json({ avatarId: updatedAvatar.avatarId });
});

router.put("/:id/update", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.params.id },
    { email: req.body.email, name: req.body.name, bio: req.body.bio },
    { new: true }
  );
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    bio: user.bio,
    date: user.date,
    isPlatform: user.isPlatform,
    score: user.score,
    avatarId: user.avatarId,
  };

  // Sign token
  jwt.sign(
    payload,
    keys.secretOrKey,
    {
      expiresIn: 31556926, // 1 year in seconds
    },
    (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token,
      });
    }
  );
});

router.get("/:id/stats", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  return res
    .status(200)
    .json({ score: user.score, badges: user.badges, avatarId: user.avatarId });
});

router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          date: user.date,
          isPlatform: user.isPlatform,
          score: user.score,
        };

        //Check if user type platform and include platform_ID field on token payload if yes
        if (user.isPlatform) {
          Platform.findOne({ owner_ID: user._id }).then((platform) => {
            payload["platform_ID"] = platform._id;
            // Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 31556926, // 1 year in seconds
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                });
              }
            );
          });
        } else {
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926, // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        }
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
