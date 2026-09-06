import { useState } from "react";
import type { PostWithImage } from "./Posts.types";
import { postsWithMockImages } from "./Posts.utils";

export function usePosts() {
  const [posts, setPosts] = useState<PostWithImage[]>(postsWithMockImages);

  const [newComment, setNewComment] = useState<Record<string, string>>({});

  const [busca, setBusca] = useState("");

  const postsVisiveis = posts.filter((post) =>
    `${post.company} ${post.segment} ${post.content}`.toLocaleLowerCase().includes(busca.trim().toLocaleLowerCase()),
  );

  const handleAddComment = (postId: string) => {
    if (!newComment[postId]?.trim()) return;
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
          ...post,
          comments: [...post.comments, { author: "Você", text: newComment[postId] }],
        }
        : post,
    );
    setPosts(updatedPosts);
    setNewComment((prev) => ({ ...prev, [postId]: "" }));
  };

  return { newComment, setNewComment, busca, setBusca, postsVisiveis, handleAddComment };
}
