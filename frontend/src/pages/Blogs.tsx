import React from 'react'
import { fetchAllBlogs } from '../server';
import BlogCard from '../components/BlogCard';
import { useNavigate } from 'react-router-dom';

interface blogInterFace {
    id: string,
    authorName?: string,
    title: string,
    content: string,
    publishedDate: string,
}

const Blogs = () => {
    const navigate = useNavigate();

    const [blogs, setBlogs] = React.useState<Array>([])
    React.useEffect(() => {
        const fetchBlogs = async () =>  {
            const token: string | null = localStorage.getItem("token");
            if(!token) {
                navigate("/signin");
            } else {
                const res: any = await fetchAllBlogs(token);
                if(res && res.data && res.data.blogs) {
                    setBlogs(res.data.blogs);
                }
            }
        };
        fetchBlogs();
    },[])
  return (
    <div>
        {blogs && blogs.length && blogs.map((blog: blogInterFace) => {
            return (
                <div key={blog.id}>
                    <BlogCard 
                        id={blog.id}
                        authorName={blog.authorName ? blog.authorName : "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={blog.publishedDate ? blog.publishedDate : "Unknown"}
                    />
                </div>
            )
        })}
        {
            blogs && blogs.length && <div key={blogs[0].id}>
            <BlogCard 
                authorName={blogs[0].authorName ? blogs[0].authorName : "Unknown"}
                title={blogs[0].title}
                content={blogs[0].content}
                publishedDate={blogs[0].publishedDate ? blogs[0].publishedDate : "Unknown"}
            />
        </div>
        }
    </div>
  )
}

export default Blogs