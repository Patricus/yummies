const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { Business, User } = require("../../db/models");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//Create

const validateBusiness = [
  check("ownerId").exists({ checkFalsy: true }).withMessage("Must be logged in."),
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a title.")
    .isLength({ max: 95 })
    .withMessage("Title must be 95 characters or less."),
  check("description").exists({ checkFalsy: true }).withMessage("Please provide a description."),
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an address.")
    .isLength({ max: 95 })
    .withMessage("Address must be 95 characters or less."),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a city.")
    .isLength({ max: 35 })
    .withMessage("City must be 35 characters or less."),
  check("state")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a state.")
    .isLength({ max: 15 })
    .withMessage("State must be 15 characters or less."),
  check("zipCode")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a zip code.")
    .isLength({ max: 10 })
    .withMessage("Xip code must be 10 characters or less."),
  handleValidationErrors,
];

router.post(
  "/",
  requireAuth,
  validateBusiness,
  asyncHandler(async (req, res, next) => {
    const { ownerId, title, description, address, city, state, zipCode } = req.body;

    const newBusiness = await Business.create({
      ownerId,
      title,
      description,
      address,
      city,
      state,
      zipCode,
    });

    res.status(201);
    res.json(JSON.stringify({ newBusiness })).end();
  })
);

//Read

//All
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const businesses = await Business.findAll();

    res.json(businesses);
  })
);

//One
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const business = await Business.findOne({
      where: {
        id,
      },
    });

    res.json(business);
  })
);

//Update

router.patch(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const { title, description, address, city, state, zipCode } = req.body;
    const business = await Business.findOne({
      where: {
        id,
      },
    });

    if (req.user.id === business.ownerId) {
      await business.update({
        title,
        description,
        address,
        city,
        state,
        zipCode,
      });

      res.status(201);
      res.json(business).end();
    } else {
      const err = Error("You do not own this business.");
      err.status = 401;
      err.title = "Unauthorized.";
      next(err);
    }
  })
);

//Delete

router.delete(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const business = await Business.findOne({
      where: {
        id,
      },
    });

    if (req.user.id === business.ownerId) {
      await business.delete();

      res.status(201);
      res.json({ message: "business deleted" }).end();
    } else {
      const err = Error("You do not own this business.");
      err.status = 401;
      err.title = "Unauthorized.";
      next(err);
    }
  })
);

module.exports = router;
