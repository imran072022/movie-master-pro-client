import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieCardSkeleton = () => {
  return (
    <div className="card w-60 h-80 bg-base-200 rounded-xl p-4">
      <Skeleton height={150} className="mb-3" />

      <Skeleton height={20} className="mb-2" />
      <Skeleton height={20} width="60%" className="mb-4" />

      <Skeleton height={40} />
    </div>
  );
};

export default MovieCardSkeleton;
