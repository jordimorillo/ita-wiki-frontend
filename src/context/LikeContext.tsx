import { createContext, useEffect, useState } from "react";
import { getLikes } from "../api/likesApi";
import { useCtxUser } from "../hooks/useCtxUser";

interface LikeContextType {
  likedResourceIds: number[];
  refreshLikes: () => void;
  setLikedResourceIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export const LikeContext = createContext<LikeContextType>({
  likedResourceIds: [],
  refreshLikes: () => {},
  setLikedResourceIds: () => {},
});

export const LikesProvider = ({ children }: { children: React.ReactNode }) => {
  const [likedResourceIds, setLikedResourceIds] = useState<number[]>([]);
  const { user } = useCtxUser();

  const fetchLikes = async () => {
    if (!user?.github_id) return;
    const likes = await getLikes(user.github_id);
    const ids = likes.map((like) => like.resource_id);
    setLikedResourceIds(ids);
  };

  useEffect(() => {
    fetchLikes();
  }, [user?.github_id]);

  const value = {
    likedResourceIds,
    refreshLikes: fetchLikes,
    setLikedResourceIds,
  };

  return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
};
