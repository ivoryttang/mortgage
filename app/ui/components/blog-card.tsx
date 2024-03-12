import React from 'react';

const BlogCard = ({ image, title, caption }: { image: string, title: string, caption: string }) => {
  return (
    <div className="card flex p-2 justify-center">
  <div className="card-body ml-4">
    <img src={image} alt={title} width="300px" className="mx-auto mb-5" />
    <h3>{title}</h3>
    <i>{caption}</i>
  </div>
</div>
  );
};

export default BlogCard;