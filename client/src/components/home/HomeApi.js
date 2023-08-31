import axios from "axios";
export const getProducts = async (pageNum, categoryId, customSearch) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    var productNameEn = "";
    const favorite = localStorage.getItem("favorite");
    if (customSearch !== "") {
      productNameEn = customSearch;
    } else {
      if (categoryId === "") {
        if (favorite) {
          productNameEn = favorite;
        }
      }
    }
    const apiResponse = await axios.get(
      `https://developers.cjdropshipping.com/api2.0/v1/product/list?pageNum=${pageNum}
      &categoryId=${categoryId}&productNameEn=${productNameEn}&pageSize=20`,
      {
        headers: {
          "CJ-Access-Token": accessToken,
        },
      }
    );
    return apiResponse.data.data.list;
  } catch (error) {
    console.log("Error fetching products:");
  }
};
export const getCategories = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const apiResponse = await axios.get(
      `https://developers.cjdropshipping.com/api2.0/v1/product/getCategory`,
      {
        headers: {
          "CJ-Access-Token": accessToken,
        },
      }
    );
    return apiResponse.data.data;
  } catch (error) {
    console.log("Error fetching categories :");
  }
};
