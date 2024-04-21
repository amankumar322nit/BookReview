import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// Custom hook for API calls with request cancellation and interceptors
const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/", // Replace with your actual base URL
  });

  // Set up request and response interceptors
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      // Log or modify response here
      console.log("Received response from:", response.config.url);
      if (response.data.message == "User logged In Successfully") {
        Cookies.set("accessToken", response.data.data.accessToken);
        navigate("/");
      }
      if (response.data.message == "Created a new account") {
        navigate("/login");
      }

      return response;
    },
    (error) => {
      // Handle response error here
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const source = axios.CancelToken.source();
    return () => {
      // Cancel the request when the component unmounts
      source.cancel("Component unmounted: Request cancelled.");
    };
  }, []);
  // Making the API call with cancellation support
  const fetchData = async ({ url, method, data = {}, params }) => {
    setLoading(true);
    try {
      const result = await axiosInstance({
        url,
        method,
        data: data, // Only include data for non-GET requests
        params: params, // For GET requests, use data as query params
        cancelToken: axios.CancelToken.source().token,
      });
      setResponse(result.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled", error.message);
      } else {
        if (error.response.data.message == "Unauthorized request") {
          navigate("/login");
        }
        setError(error.response ? error.response.data : error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Expose the state and the fetchData function
  return { response, error, loading, fetchData };
};

export default useAxios;
