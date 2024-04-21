import React, { useEffect, useState } from 'react'
import useAxios from '../customHooks/useAxios';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

const FavBooks = () => {
    const [bookdata,setBookdata]=useState([]);
    const { response, error, loading, fetchData } = useAxios();
    useEffect(()=>{
        fetchData({ url: 'users/fav', method: "get" });
    },[])
    useEffect(() => {
        if (response) setBookdata(response.data.books);
        console.log(response);
      }, [response]);

      if (loading) {
        return (
            <div className='h-1/2'>
          <div className="flex justify-center">
            <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
          </div>
          </div>
        );
      }

  return (
    <div className="container">
    <div className="text-center mb-20 max-w-[400px] mx-auto">
    <h1 className="text-3xl mt-10 font-bold">Favourite Books</h1>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-15 place-items-center mt-30 mb-10">
    {bookdata.map((service, i) => (
      <Link
        key={i}
        to={{ pathname: `/${service._id}`, state: service }}
      >
        <div
          key={i}
          data-aos="zoom-in"
          className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group w-[300px]"
        >
          <div className="h-[100px]">
            <img
              src={service.thumbnailUrl}
              alt=""
              className="max-w-[100px] block mx-auto transform -translate-y-14
          group-hover:scale-105  duration-300 shadow-md"
            />
          </div>
          <div className="p-4 text-center">
            <div className="w-full flex items-center justify-center gap-1">
              <ReactStars
                count={5}
                size={24}
                edit={false}
                value={service.rating}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
            </div>
            <h1 className="truncate text-xl font-bold">
              {service.title}
            </h1>
            <h6 key={i} className="truncate text font-bold">
              {service.authors[0]}
            </h6>
            <p className="truncate text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
              {service.longDescription}
            </p>
          </div>
        </div>
      </Link>
    ))}
  </div>
  </div>
  )
}

export default FavBooks