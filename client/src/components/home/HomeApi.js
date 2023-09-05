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
          "CJ-Access-Token":
            "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxMTIxNSIsInR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJzdWIiOiJicUxvYnFRMGxtTm55UXB4UFdMWnlrVmkwQUdLWjBaN3dodUdYbmpGcFVXUW9vTlBYU3BubVRaSDArZ08vclZCMFVNTVJEMjNrY1JUeWJsWDlvekordEc3N1FucWdLVXV3VHIrcW5OcEdtbEg1c2JXNTNhRmVFSWZ6YlF3bzBWSHF5TVNQZk0wNmg5Qm5kVjE1dU8zWFdzcEx5OWNvaXpUVkNrbHVyUVhTTlROWDlNR2t6SEovUlQ0V0t3ZlVTcjVMZ0w0eFZ2MHZlbU90U3h6VmhwdU1scXFyTGxJeVRETWRFK3RNaFRhM0FBZGZONkpBNDAwOElxa2xGMVpTeWFBVGp0dE5nUklRMkxHMVkvQ3JZRTRxWkRaZGFBa1BqTHNEdFF5RDJta0JDZXlCWmhSb21Vdy9zQkRCL0ZVZFFnLyJ9.jn2ilGc9xKDcmz7_8hgC77GCMXZ72kixT0iooR6-GWY",
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
          "CJ-Access-Token": process.env.CJ_ACCESS_TOKEN,
        },
      }
    );
    return apiResponse.data.data;
  } catch (error) {
    console.log("Error fetching categories :");
  }
};
