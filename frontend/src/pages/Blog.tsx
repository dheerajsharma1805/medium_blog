
import { useBlog } from "../hooks";
import { useLocation } from "react-router-dom";
import Avatar from "../components/Avatar";

const Blog = () => {
  const location = useLocation();
  const url = location.pathname;
  const id = url.substring(url.lastIndexOf('/') + 1);
  const blog: any = useBlog({id});

  return (
    <div className="grid grid-cols-12 py-10 px-20">
      <div className="col-span-8">
        <div className="text-2xl font-bold my-3">{blog?.title}</div>
        <div className="text-sm text-slate-400 mb-3">Posted on {blog?.publishedDate? blog?.publishedDate : "02 Feb 2024"}</div>
        <div className="py-3">{blog?.content} Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, fugiat debitis cumque, illo commodi explicabo eveniet aperiam architecto iusto, error minima dolorum! Magnam quam ut distinctio aliquid, autem quia eveniet.</div>
      </div>
      <div className="col-span-1">
      </div>
      <div className="col-span-3">
        <div>
          Author
        </div>
        <div className="text-lg font-bold">
          <Avatar name={"Dheeraj"}/>
          {(blog.author && blog.author.name) || "Anonymous"}
        </div>
      </div>
    </div>
  );
};

export default Blog;
