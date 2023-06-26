import axios from "axios"

export const newRequest = axios.create({
    baseURL: "http://localhost:8800/api/",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  });
  

export const Ai_api = axios.create({
    baseURL:"http://localhost:5000/",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    withCredentials:true

})

export default newRequest