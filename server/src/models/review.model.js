import mongoose, { Schema } from "mongoose";
import defaultStaticFunctions from "../utils/modalStaticFunctions.js";
import { User } from "./user.model.js";
import { Book } from "./book.model.js";

const reviewSchema = new Schema(
  {
    comment: {
      type: String,
    },
    rating: {
      type: Number,
    },
    userId:{
        type : Schema.Types.ObjectId,
        ref: User,
        required: [true, 'User ID is required']
    },
    username:{
      type : String,
      required: [true, 'Username is required']
  },
    bookId:{
        type : Schema.Types.ObjectId,
        ref: Book,
        required: [true, 'Book ID is required']
    }
  },
  {
    timestamps: true, //this will add createdAt and updatedAt
  }
);

reviewSchema.statics = {
  ...defaultStaticFunctions,
};

export const Review = mongoose.model("Review", reviewSchema);
