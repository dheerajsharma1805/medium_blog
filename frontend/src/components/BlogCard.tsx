import React from "react";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center p-5 m-5">
      <div className="max-w-xl border-b border-slate-200 cursor-pointer" onClick={() => navigate(`/blog/${id}`)}>
        <div className="flex items-center my-2">
          <Avatar name={null}/>
          <div className="text-xs">{authorName}</div> &nbsp;
          <div className="text-xs text-slate-400">{publishedDate}</div>
        </div>
        <div>
          <div className="text-xl font-bold">{title}</div>
          <div className="text-xl text-slate-500">
            {content} Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Doloribus odio at labore rerum ipsum eveniet. Ratione, unde! Nemo
            at, id hic officiis impedit, ipsam, doloremque voluptatum ipsum cum
            suscipit aspernatur.{" "}
          </div>
          <div className="text-slate-500">{content.length} minute(s) read</div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
