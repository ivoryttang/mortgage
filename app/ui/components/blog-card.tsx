import React from 'react';

const BlogCard = ({ image, title, caption }: { image: string, title: string, caption: string }) => {
  return (
    <div className="flex p-2 justify-center w-[500px]">
  <div className="card-body ml-4">
    <div className="h-[280px] mb-10 overflow-hidden">
    <img src={image} alt={title} className="mx-auto mb-5" />
    </div>
    <h3>{title}</h3>
    <i>{caption}</i>
  </div>
</div>
  );
};

export default BlogCard;