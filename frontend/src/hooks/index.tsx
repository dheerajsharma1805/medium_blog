import React from "react"
import { viewBlog } from "../server";
import { useNavigate } from "react-router-dom";

export const useBlog = ({id} : {id: string}) => {
    const [blog, setBlog] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(()=>{
        async function fetchBlog () {
            const token: string | null = localStorage.getItem("token");
            if(!token) {
                navigate("/signin");
                return;
            } else {
                const res = await viewBlog(id, token);
                console.log("response ", res);
                if(res && res.blog) {
                    setBlog(res.blog);
                }
            }
        }

        fetchBlog();
    },[])

    if(blog) {
        return blog;
    }
}