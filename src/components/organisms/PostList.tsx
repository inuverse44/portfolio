import PostCard from '@/components/molecules/PostCard';

interface Post {
  id: string;
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
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;