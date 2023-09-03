import axiosInstance from "../Axios";
export const getReviews = async (page) => {
  try {
    const response = await axiosInstance.get("reviews/getReviews", {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
  }
};

export const addReview = async ({ username, review, rating, userid }) => {
  try {
    const response = await axiosInstance.post("addReview", {
      username,
      review,
      rating,
      userid,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to add a review:", error);
  }
};
