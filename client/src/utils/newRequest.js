import axios from "axios"

export const newRequest = axios.create({
    baseURL: "http://localhost:8800/api/",
    credentials: 'include',
    withCredentials:true

  });
  

export const Ai_api = axios.create({
    baseURL:"http://localhost:5000/",
    credentials: 'include',
    withCredentials:true

})

export default newRequest