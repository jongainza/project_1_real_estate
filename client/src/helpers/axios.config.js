import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:3000/api" });

export default instance;
// axios.config.js
// import axios from "axios";
// import { selectToken } from "../redux/selectors"; // Adjust the path as per your project structure
// import { store } from "../redux/store"; // Import your Redux store
// const instance = axios.create({ baseURL: "http://localhost:3000/api" });

// instance.interceptors.request.use(
//   async (config) => {
//     // Get the _token from the Redux store using the selector function
//     const _token = selectToken(store.getState());

//     if (_token) {
//       config.headers.Authorization = `Bearer ${_token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default instance;
