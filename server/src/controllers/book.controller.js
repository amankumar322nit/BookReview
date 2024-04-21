import { Book } from "../models/book.model.js";
import { Review } from "../models/review.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateListQuery } from "../utils/service.js";
import { CONTROLLERS } from "../constant.js";

const getBookList = asyncHandler(async (req, res) => {
  const query = await generateListQuery(req, CONTROLLERS.BOOK);
  query.pagination.totalCount = await Book.totalCount(query);
  const books = await Book.list(query);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { books, pagination: query.pagination },
        "books data"
      )
    );
});

const getBook=asyncHandler(async (req,res)=>{
   let book =await Book.findById(req.params.id);
   if(!book){
     throw new ApiError(404,"No such book exists!");
   }
   return res.status(200).json(new ApiResponse(200,{book},'Successfully retrieved the book'));
})


export { getBookList,getBook };
