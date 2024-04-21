import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import ReactStars from "react-rating-stars-component";
import PaginationButtons from "./PaginationButton";
import { Link } from "react-router-dom/dist";
import useAxios from "../../customHooks/useAxios";

const BookSec = () => {
  const [globalSearch, setGlobalSearch] = useState("");
  const [bookdata, setBookdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [param, setParam] = useState({
    limit: 21,
    page: 1,
    globalSearch: { value: "Internet" },
  });
  const { response, error, loading, fetchData } = useAxios();
  useEffect(() => {
    const url = `books/list?filter=${JSON.stringify(param)}`;
    fetchData({ url: url, method: "get" });
  }, [param]);

  useEffect(() => {
    if (response) setBookdata(response.data.books);
  }, [response]);

  useEffect(() => {
    setParam({
      ...param,
      page: currentPage,
      globalSearch: { value: globalSearch },
    });
  }, [globalSearch, currentPage]);

  const handleChange = (e) => {
    setGlobalSearch(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center h-1/2 mt-11">
        <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
      </div>
    );
  }

  return (
    <>
      {/* {open?<Modal handelClose={()=>setOpen(false)} data={modalData} openModal={true}/>:null} */}
      <span id="services"></span>
      <div className="py-10">
        <div className="container">
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary ">
              Trending Books
            </p>
            <h1 className="text-3xl font-bold">Best Books</h1>
            <p className="text-xs text-gray-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perspiciatis delectus architecto error nesciunt,
            </p>
            <input
              type="text"
              name="q"
              className="w-full border h-12 shadow p-4 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
              placeholder="search"
              onChange={debouncedResults}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-15 place-items-center">
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
      </div>
      <PaginationButtons
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={20}
      />
    </>
  );
};

export default BookSec;
