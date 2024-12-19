const API_URL =
  process.env.REACT_APP_ENV === "prod"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

export default API_URL;