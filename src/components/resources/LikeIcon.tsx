import { FC } from "react";
import { Triangle } from "lucide-react";

interface LikeIconProps {
  liked?: boolean;
}

const LikeIcon: FC<LikeIconProps> = ({ liked = false }) => {
  return (
    <Triangle
      size={16}
      fill={liked ? "green" : "none"}
      color={liked ? "green" : "gray"}
      aria-label={liked ? "Me gusta" : ""}
    />
  );
};

export default LikeIcon;
