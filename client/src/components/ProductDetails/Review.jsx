import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom/dist";
import useAxios from "../../customHooks/useAxios";

export const Review = () => {
  const { productId } = useParams();
  const { response, error, loading, fetchData } = useAxios();
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [reviewsData, setReviewsData] = useState([]);
  useEffect(() => {
    fetchData({
      url: `/reviews/list`,
      method: "get",
      params: {
        _id: productId,
      },
    });
  }, []);

  useEffect(() => {
    if (response?.message == "reviews data") {
      setReviewsData(response?.data);
    } else if(response){
      setReviewsData([ response.data,...reviewsData]);
      setNewReview({...newReview,comment:""});
    }
  }, [response]);

  const handelSubmit = () => {
    if (newReview.comment.length && newReview.rating) {
      fetchData({
        url: `/reviews/reviewUpdate`,
        method: "post",
        params: {
          _id: productId,
          ...newReview,
        },
      });
    }
  };
  console.log(newReview, reviewsData);
  return (
    <>
      <h5 className="text-3xl md:text-4xl capitalize font-[300] mb-10">
        Reviews
      </h5>
      <div className="mb-6">
        <ReactStars
          count={5}
          size={24}
          edit={true}
          value={newReview.rating}
          isHalf={true}
          onChange={(rating) => setNewReview({ ...newReview, rating })}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Write Review
        </label>
        <input
          type="text"
          id="large-input"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
          value={newReview.comment}
        ></input>
        {newReview.comment.length && newReview.rating ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded relative right mt-5"
            onClick={handelSubmit}
          >
            Submit
          </button>
        ) : (
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed mt-5">
            Submit
          </button>
        )}
      </div>
      {reviewsData.map((review) => {
        return (
          <div key={review._id} className="mb-5">
            <div className="flex flex-col md:flex-row">
              <CgProfile />
              <p className="text-[13px] font-[200] ml-2 ">{review.username}</p>
            </div>
            <ReactStars
              count={5}
              size={24}
              edit={false}
              value={review.rating}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
            <p className="text-[13px] font-[200] ml-2 pb-2">{review.comment}</p>
          </div>
        );
      })}
    </>
  );
};
