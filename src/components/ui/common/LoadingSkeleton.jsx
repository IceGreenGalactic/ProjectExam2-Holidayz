import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonSection = ({
  width = "100%",
  height = 20,
  count = 1,
  variant = "default",
  className = "",
}) => {
  if (variant === "single-venue") {
    return (
      <div
        className={`col-10 col-md-8 m-auto single-venue-skeleton ${className}`}
      >
        <div className="d-flex flex-column flex-md-row gap-4 ">
          <div className="col-md-5">
            <Skeleton width="100%" height={300} />
          </div>
          <div className="col-md-7">
            <Skeleton width="50%" height={30} />
            <Skeleton width="100%" height={20} count={5} />
          </div>
        </div>

        <div className="mt-4">
          <Skeleton width="100%" height={20} count={3} />
        </div>

        <div className="d-flex gap-4 mt-4">
          <div className="col-md-6">
            <Skeleton width="100%" height={300} />
          </div>
          <div className="col-md-6">
            <Skeleton width="100%" height={200} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "booking-confirmation") {
    return (
      <div className={`col-10 m-auto ${className}`}>
        <div className="text-center">
          <Skeleton width="80%" height={200} />
          <Skeleton width="40%" height={20} className="mt-3" />
          <Skeleton width="20%" height={20} className="mt-3" />
        </div>

        <div className="row mt-4">
          <div className="col-6">
            <Skeleton width="100%" height={100} className="mb-2" />
          </div>
          <div className="col-6">
            <Skeleton width="100%" height={100} className="mb-2" />
          </div>
        </div>

        <div className="mt-4">
          <Skeleton width="100%" height={20} className="mb-2" />
        </div>
        <div className="mt-4 d-flex flex-row gap-3 justify-content-center">
          <div className="col-1">
            <Skeleton width="100%" height={20} className="mb-2" />
          </div>
          <div className="col-1">
            <Skeleton width="100%" height={20} className="mb-2" />
          </div>
          <div className="col-1">
            <Skeleton width="100%" height={20} className="mb-2" />
          </div>
          <div className="col-1">
            <Skeleton width="100%" height={20} className="mb-2" />
          </div>
        </div>

        <div className="mt-4 ms-auto">
          <Skeleton width="50%" height={200} className="mb-2" />
        </div>
      </div>
    );
  }

  return (
    <div className={`mb-3 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} width={width} height={height} />
      ))}
    </div>
  );
};

export default SkeletonSection;
