import mongoose, { Schema } from "mongoose";
import defaultStaticFunctions from "../utils/modalStaticFunctions.js";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the book"],
    },
    authors: {
      type: Array,
      required: [true, "Author name is required"],
    },
    categories: {
      type: Array,
    },
    shortDescription: {
      type: String,
    },
    status: {
      type: String,
    },
    longDescription: {
      type: String,
    },
    thumbnailUrl: {
      type: String,
      default: "https://www.goodreads.com/book/show/55196813-the-maid",
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    numOfRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, //this will add createdAt and updatedAt
  }
);

bookSchema.statics = {
  ...defaultStaticFunctions,
};

export const Book = mongoose.model("Book", bookSchema);
