import React from 'react';
import PostCard from '@/components/molecules/PostCard';

interface Post {
  slug: string;
  data: {
    title: string;
    date: Date | string;
    tags?: string[];
    cover?: string | null;
  };
}

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default PostList;