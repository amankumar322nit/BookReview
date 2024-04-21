import { Book } from "../models/book.model.js";
import { Review } from "../models/review.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getReviewList = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    bookId: req.query._id,
  });
  return res.status(200).json(new ApiResponse(200, reviews, "reviews data"));
});

const addFavourite = asyncHandler(async (req, res) => {
  const { bookId } = req.query;
  let user = await User.findById(req.user._id);
  if (user.favourite.includes(bookId)) {
    let index = user.favourite.indexOf(bookId);
    user.favourite.splice(index, 1);
    await user.save();
  } else {
    user.favourite.push(bookId);
    await user.save();
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Favourite added successfully"));
});

const reviewUpdate = asyncHandler(async (req, res) => {
  const { _id, rating, comment } = req.query;

  let book = await Book.findById(_id);
  if (!book) {
    return new ApiError(404, "Not found", "No such book exists");
  }
  let stars = book.numOfRating * book.rating + Number(rating);
  book.numOfRating++;
  book.rating = (stars / book.numOfRating).toFixed(1);
  await book.save();

  let review = await Review.create({
    userId: req.user._id,
    username: req.user.username,
    bookId: _id,
    comment,
    rating,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, review, "Review updated successfully"));
});

export { getReviewList, reviewUpdate, addFavourite };
