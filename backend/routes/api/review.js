const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { Review, Business } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//Create

const validateReview = [
  check("userId").exists({ checkFalsy: true }).withMessage("Must be logged in."),
  check("businessId")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a businessId.")
    .if(id => Business.findByPk(id))
    .withMessage("Restaurant does not exist."),
  check("rating")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a rating.")
    .isLength({ min: 1 })
    .withMessage("Rating must be 1 or more.")
    .isLength({ max: 5 })
    .withMessage("Rating must be 5 or less."),
  handleValidationErrors,
];

router.post(
  "/",
  requireAuth,
  validateReview,
  asyncHandler(async (req, res, next) => {
    const { userId, businessId, rating, comment } = req.body;

    const newReview = await Review.create({
      userId,
      businessId,
      rating,
      comment,
    });

    res.status(201);
    return res.json(newReview);
  })
);

//Read

//All from business
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    let reviews;
    if (req.body.businessId) {
      const businessId = req.body.businessId;
      reviews = await Review.findAll({
        where: {
          businessId,
        },
      });

      return res.json(reviews);
    } else {
      const err = Error("Bad request.");
      err.errors = ["No business id."];
      err.status = 400;
      err.title = "Bad request.";
      next(err);
    }
  })
);

//One
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const review = await Review.findOne({
      where: {
        id,
      },
    });

    return res.json(review);
  })
);

//Update

router.patch(
  "/:id(\\d+)",
  requireAuth,
  validateReview,
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const { rating, comment } = req.body;

    const review = await Review.findOne({
      where: {
        id,
      },
    });

    if (req.user.id === review.userId) {
      await review.update({
        rating,
        comment,
      });

      res.status(201);
      return res.json(review);
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
    const review = await Review.findOne({
      where: {
        id,
      },
    });

    if (req.user.id === review.userId) {
      await review.destroy();

      res.status(201);
      res.json({ message: "review deleted" }).end();
    } else {
      const err = Error("You do not own this review.");
      err.status = 401;
      err.title = "Unauthorized.";
      next(err);
    }
  })
);

module.exports = router;
