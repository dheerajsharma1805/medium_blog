import { SignInInputs, SignUpInputs } from "@dheeraj1805/medium-common";
import axios from "axios";
import {BASE_URL} from "../constants"


const getBaseUrl = () => {
    return BASE_URL;
}

const instance = axios.create({
    baseURL: getBaseUrl(),
    timeout: 30000,
});

export const signup = async (data: SignUpInputs) => {
    try {
        const res = await instance.post(`/user/signup`, data)
        return res
    } catch (error) {
        return error;
    }
}

export const signin = async (data: SignInInputs) => {
    try {
        const res = await instance.post('/user/signin', data);
        return res;
    } catch (error) {
        return error;
    }
}

export const fetchAllBlogs = async (token: string) => {
  try {
    const res = await instance.get("/blog/bulk", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}

export const viewBlog = async (id: string, token: string) => {
  try {
    const res = await instance.get(`/blog/${id}`, {
      headers : {
        Authorization: `Bearer ${token}`,
      }
    });
    return res.data;
  } catch (error) {
    return error;
  }
}

export const postBlog = async (data: any, token: string) => {
  try {
    const res = await instance.post("/blog", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};