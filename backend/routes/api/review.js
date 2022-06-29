const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { Review, Business, User } = require("../../db/models");
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
    newReviewUser = await Review.findOne({
      where: { id: newReview.id },
      include: User,
    });
    return res.json(newReviewUser);
  })
);

//Read

//All from business
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const businessId = req.params.id;
    reviews = await Review.findAll({
      where: {
        businessId,
      },
      include: User,
    });

    return res.json(reviews);
  })
);

//Update

router.patch(
  "/",
  requireAuth,
  validateReview,
  asyncHandler(async (req, res, next) => {
    console.log("req.body", req.body);
    console.log("req.user.id", req.user.id);
    const id = req.body.id;
    const { rating, comment } = req.body;

    const review = await Review.findByPk(id);

    console.log("review", review);

    if (!review) {
      const err = Error("Review not found.");
      err.status = 404;
      err.title = "Not Found.";
      next(err);
    } else {
      if (req.user.id === review.userId) {
        await review.update({
          rating,
          comment,
        });

        res.status(201);
        updatedReviewUser = await Review.findOne({
          where: { id: review.id },
          include: User,
        });
        return res.json(updatedReviewUser);
      } else {
        const err = Error("You do not own this business.");
        err.status = 401;
        err.title = "Unauthorized.";
        next(err);
      }
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
      res.json({ message: "Review deleted." }).end();
    } else {
      const err = Error("You do not own this review.");
      err.status = 401;
      err.title = "Unauthorized.";
      next(err);
    }
  })
);

module.exports = router;
