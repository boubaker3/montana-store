import {
  Button,
  CircularProgress,
  Grid,
  Input,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCategories, getProducts } from "./HomeApi";
import ProductCard from "./ProductCard";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import Footer from "../Footer";
import ChooseCategory from "../featuredProduct/ChooseCategory";
export default function Home() {
  const favorite = localStorage.getItem("favorite");

  const [customSearch, setCustomSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const cartLoading = useSelector((state) => state.cart.loading);

  async function fetchProducts() {
    try {
      setLoading(true);
      const fetchedProducts = await getProducts(
        pageNum,
        categoryId,
        customSearch
      );
      setProducts(fetchedProducts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategory("select a category");
    }
  }, [categories]);

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const renderSubcategory = (subcategory) => (
    <MenuItem
      key={subcategory.categorySecondId}
      onClick={() => handleSubcategoryClick(subcategory)}
      value={subcategory.categorySecondId}
      sx={{ color: "gray" }}
    >
      {subcategory.categorySecondName}
    </MenuItem>
  );

  const handleSubcategoryClick = (subcategory) => {
    setPageNum(1);
    setCustomSearch("");
    setCategoryId(subcategory.categorySecondId);
    setCategory(subcategory.categorySecondName);
    setAnchorEl(null);
  };
  const handleCategoryClick = (categoryItem) => {
    if (selectedCategory === categoryItem) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryItem);
    }
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        columnGap={2}
        justifyContent="center"
        mt={4}
        sx={{
          display: { md: "flex" },
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            height: "50px",
            backgroundColor: "#F0F0F0",
            borderRadius: "32px",
            display: "flex",
          }}
        >
          <Button
            onClick={() => {
              setPageNum(1);
              fetchProducts();
            }}
            sx={{
              backgroundColor: "primary.main",
              borderRadius: "32px",
              "&:hover": {
                backgroundColor: "primary.main", // Change to your desired hover color
                opacity: "0.8",
              },
              transition: "background-color 0.3s ease",
            }}
          >
            <SearchIcon sx={{ color: "white" }} />
          </Button>
          <Input
            sx={{ pl: 1 }}
            fullWidth
            onChange={(e) => setCustomSearch(e.target.value)}
            name="customSearch"
            disableUnderline={true}
            placeholder="search for products..."
            value={customSearch}
          ></Input>
        </Grid>

        <Button onClick={openMenu}>{category}</Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
          {categories &&
            categories.map((categoryItem) => (
              <div key={categoryItem.categoryFirstId}>
                <MenuItem
                  onClick={() => {
                    handleCategoryClick(categoryItem);
                  }}
                  value={categoryItem.categoryFirstId}
                >
                  {categoryItem.categoryFirstName}
                </MenuItem>
                {selectedCategory === categoryItem &&
                  categoryItem.categoryFirstList &&
                  categoryItem.categoryFirstList.map(renderSubcategory)}
              </div>
            ))}
        </Menu>
      </Grid>
      {pageNum > 1 && (
        <Grid container>
          <Typography variant="h6" m={4}>
            exploring products on page ({pageNum})
          </Typography>
        </Grid>
      )}
      <Grid container justifyContent="center" mt={2}>
        {cartLoading && (
          <Grid item xs={12} textAlign="center">
            <CircularProgress />
          </Grid>
        )}
        {loading ? (
          <CircularProgress />
        ) : (
          products &&
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        )}
      </Grid>
      {products && products.length === 0 && !loading ? (
        <Typography variant="h5" m={4}>
          no products found
        </Typography>
      ) : null}{" "}
      <Grid container justifyContent="center" mt={2}>
        <Button
          variant="outlined"
          disabled={pageNum === 1}
          onClick={() => {
            setPageNum(pageNum - 1);
            fetchProducts();
          }}
        >
          Previous Page
        </Button>
        <Button
          variant="outlined"
          disabled={products && products.length === 0}
          onClick={() => {
            setPageNum(pageNum + 1);
            fetchProducts();
          }}
        >
          Next Page
        </Button>
      </Grid>
      {products && products.length > 0 && (
        <Footer
          navigateToCategory={(cId) => {
            setPageNum(1);
            setCategoryId(cId);
          }}
        />
      )}
      {!favorite && <ChooseCategory />}
    </Grid>
  );
}
