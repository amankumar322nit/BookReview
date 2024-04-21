import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";
import ReactStars from "react-rating-stars-component";
import { Review } from "./Review";
import { CgProfile } from "react-icons/cg";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useAxios from "../../customHooks/useAxios";

export const Product = () => {
  const { productId } = useParams();
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({});
  const { response, error, loading, fetchData } = useAxios();
  useEffect(() => {
    let url = `books/${productId}`;
    fetchData({ url: url, method: "get" });
    fetchData({ url: "/users", method: "get" });
  }, []);

  const addFavourite = () => {
    let url = `reviews/addFav`;
    fetchData({
      url: url,
      params: {
        bookId: productId,
      },
      method: "put",
    })
    if(userData?.favourite.includes(productId)){
      const favourite=userData?.favourite.filter((item)=>item!==productId)
      setUserData({...userData,favourite:favourite})
    }else if(userData?.favourite){
      const favourite=userData.favourite;
      favourite.push(productId)
      setUserData({...userData,favourite:favourite})
    }
  };
  console.log(userData.favourite);
  useEffect(() => {
    if (response?.message=='User Details') {
      setUserData(response.data.user);
    }
    if(response?.message=='Successfully retrieved the book'){
      setData(response.data.book);
    }
  }, [response]);

  console.log("userData", userData);
  return (
    <main>
      <div className="main-wrapper md:px-[200px] md:py-[100px] relative">
        <div className="flex flex-col md:flex-row ">
          <div className="image md:basis-1/2 md:flex md:flex-col md:justify-between">
            <div className=" md:block large-image">
              <img
                className="object-cover cursor-pointer rounded-xl w-[400px] h-[400px] mt-20"
                src={data.thumbnailUrl}
                alt="snekers-photo"
              />
            </div>
            <div className="small-images hidden md:flex mt-7 justify-between w-[400px]"></div>
          </div>
          <div className="authors relative p-6 md:basis-1/2 md:py-[40px] ">
            {!userData?.favourite?.includes(productId) ? (
              <div
                className="absolute top-5 right-5 text-3xl"
                onClick={addFavourite}
              >
                <AiOutlineHeart style={{ color: "#ffffff", size: "100px" }} />
              </div>
            ) : (
              <div
                className="absolute top-5 right-5 text-3xl"
                onClick={addFavourite}
              >
                <AiFillHeart style={{ color: "red", size: "100px" }} />
              </div>
            )}
            <h1 className="text-3xl md:text-4xl capitalize font-[700]">
              {data.title}
            </h1>
            <p className=" md:block text-darkGrayishBlue my-10 leading-7">
              {(data.shortDescription || data.longDescription || "").substring(
                0,
                300
              ) + "..."}
            </p>
            <p className="text-orange text-[14px] tracking-widest uppercase font-[700] mb-2">
              Authors
            </p>
            {data?.authors?.map((author, i) => {
              return (
                <div className="md:flex md:flex-row ml-2" key={i}>
                  <CgProfile />
                  <p className="text-orange  text-[14px] tracking-widest uppercase font-[300] mb-2 ml-2">
                    {author}
                  </p>
                </div>
              );
            })}
            <div className="w-full flex items-center gap-1">
              {data?.rating && (
                <ReactStars
                  count={5}
                  size={24}
                  edit={true}
                  value={data?.rating || 5}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              )}
              {`${data.numOfRating} Rating`}
            </div>
          </div>
        </div>
        <Review />
      </div>
    </main>
  );
};
