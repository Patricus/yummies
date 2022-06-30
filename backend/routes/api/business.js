const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { Business, Review } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//Create

const validateBusiness = [
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
    .isLength({ max: 10, min: 5 })
    .withMessage("Zip code must be 5 to 10 characters.")
    .isInt({ min: 1 })
    .withMessage("Zip code must be a positive number."),
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
    res.json(newBusiness).end();
  })
);

//Read

//All
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const businesses = await Business.findAll({
      include: {
        model: Review,
        attributes: ["rating"],
      },
    });

    businesses.forEach(business => {
      business.dataValues.reviewPercentage = parseFloat(
        (
          (business.Reviews.reduce((total, rating) => total + rating.rating, 0) /
            business.Reviews.length) *
          20
        ).toFixed(1)
      );
    });

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
      include: {
        model: Review,
        attributes: ["rating"],
      },
    });

    business.dataValues.reviewPercentage = parseFloat(
      (
        (business.Reviews.reduce((total, rating) => total + rating.rating, 0) /
          business.Reviews.length) *
        20
      ).toFixed(1)
    );

    res.json(business);
  })
);

//Update

router.patch(
  "/:id(\\d+)",
  requireAuth,
  validateBusiness,
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
      await business.destroy();

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
