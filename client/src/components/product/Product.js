import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getInventory, getProduct, getProductComments } from "./ProductApi";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CommentCard from "./CommentCard";
import OrderForm from "../orders/OrderForm";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Product() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pid = searchParams.get("pid");
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const markupPercentage = 70;
  const markupFactor = 1 + markupPercentage / 100;

  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [updatedProductPrice, setUpdatedProductPrice] = useState(0);
  const [productWeight, setProductWeight] = useState("");
  const [productWidth, setProductWidth] = useState("");
  const [productHeight, setProductHeight] = useState("");
  const [productVid, setProductVid] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [openForm, setOpenForm] = useState(false);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setUpdatedProductPrice((productPrice * quantity).toFixed(2));
  }, [quantity]);

  const handleProduct = async () => {
    setLoading(true);
    try {
      const response = await getProduct(pid);
      setProduct(response.data);
      setProductImage(response.data.variants[0].variantImage);
      setProductWeight(response.data.variants[0].variantWeight);
      setProductWidth(response.data.variants[0].variantWidth);
      setProductHeight(response.data.variants[0].variantHeight);
      setProductVid(response.data.variants[0].vid);
      const originalPrice = parseFloat(
        response.data.variants[0].variantSellPrice
      );
      const updatedPrice = (originalPrice * markupFactor).toFixed(2); // Format to 2 decimal places
      setProductPrice(updatedPrice);
      setUpdatedProductPrice(updatedPrice);
      const inventory = await getInventory(productVid);
      setCountryCode(inventory.data[0].countryCode);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleComment = async () => {
    setLoading(true);

    try {
      const commentsResponse = await getProductComments(pid, pageNum);
      setComments(commentsResponse.data.list);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleProduct();
    handleComment();
  }, []);

  const setVariant = (variant) => {
    setProductImage(variant.variantImage);
    setProductWeight(variant.variantWeight);
    setProductWidth(variant.variantWidth);
    setProductHeight(variant.variantHeight);
    setProductVid(variant.vid);
    setProductPrice((variant.variantSellPrice * markupFactor).toFixed(2));
  };

  const statusMapping = {
    0: "Deleted",
    1: "To be submitted",
    2: "Pending",
    3: "On sale",
    4: "Audit failure",
    5: "Off sale",
    6: "To be reviewed",
  };

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Grid>
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={3} p={4} justifyContent="center">
      <Typography variant="h6">{product?.productNameEn}</Typography>{" "}
      <Grid container mt={2} p={2} columnGap={4}>
        <Grid item xs={12} md={4}>
          <Avatar
            src={productImage}
            sx={{
              borderRadius: "32px",
              width: "100%",
              height: "500px",
              objectFit: "cover",
            }}
          ></Avatar>

          <Grid
            item
            xs={12}
            columnGap={1}
            mt={2}
            display="flex"
            justifyContent="center"
            sx={{
              overflowX: "auto",
              flexWrap: "wrap", // Allow items to wrap to the next line
            }}
          >
            {product?.productImageSet.map((imageUrl, index) => (
              <Avatar
                onClick={() => setProductImage(imageUrl)}
                src={imageUrl}
                alt={`Product ${index}`}
                sx={{
                  width: "60px",
                  height: "auto",
                  borderRadius: 0,
                  "&:hover": {
                    opacity: "0.5",
                  },
                  transition: "background-color 0.5s ease",
                }}
              ></Avatar>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <List>
            <ListItem>
              <ListItemText
                primary="Category"
                secondary={product?.categoryName}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                secondary={
                  <Typography variant="h4">
                    {updatedProductPrice+ "$"}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText secondary={statusMapping[product?.status]} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Material"
                secondary={
                  product?.materialNameEn ? (
                    product.materialNameEn
                      .replace(/\[|\]/g, "")
                      .split(",")
                      .map((m, index) => (
                        <Chip
                          key={index}
                          label={m.trim()}
                          variant="outlined"
                          size="small"
                          sx={{ marginRight: 1 }}
                        />
                      ))
                  ) : (
                    <span>No material available</span>
                  )
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Packing"
                secondary={
                  product?.packingNameEn ? (
                    product.packingNameEn
                      .replace(/\[|\]/g, "")
                      .split(",")
                      .map((p, index) => (
                        <Chip
                          key={index}
                          label={p.trim()}
                          variant="outlined"
                          size="small"
                          sx={{ marginRight: 1 }}
                        />
                      ))
                  ) : (
                    <span>No packing available</span>
                  )
                }
              />
            </ListItem>

            <ListItem>
              <ListItemText primary="weight" secondary={productWeight + "g"} />
              <ListItemText
                primary="width"
                secondary={productWidth + "cm"}
              />{" "}
              <ListItemText primary="height" secondary={productHeight + "cm"} />{" "}
            </ListItem>
          </List>
          <Grid item xs={12} justifyContent="start">
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                disabled={quantity === 1}
                onClick={() => {
                  setQuantity(quantity - 1);
                }}
              >
                -
              </Button>
              <Button>{quantity}</Button>
              <Button
                disabled={quantity === 50}
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} mt={4} justifyContent="center">
            <Button
              onClick={() => {
                if (user) {
                  setOpenForm(true);
                } else {
                  navigate("/auth/login");
                }
              }}
              disableElevation
              variant="contained"
              sx={{
                width: { xs: "60%", md: "40%" },
                color: "white",
                borderRadius: "32px",
                fontSize: { xs: "12px", md: "16px" },
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                textAlign: "center",
                "&:hover": {
                  backgroundColor: "secondary.main", // Change to your desired hover color
                },
                transition: "background-color 0.3s ease",
              }}
            >
              <ShoppingCartIcon sx={{ color: "white" }} />
              Get it
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <Typography variant="h6">choose a variant:</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        columnGap={1}
        mt={2}
        p={2}
        rowGap={1}
        display="flex"
        justifyContent="center"
        sx={{
          overflowX: "auto",
          flexWrap: "wrap", // Allow items to wrap to the next line
        }}
      >
        {product?.variants.map((v, index) => (
          <Avatar
            key={v.vid}
            onClick={() => setVariant(v)}
            src={v.variantImage}
            alt={`Product ${index}`}
            sx={{
              width: "100px",
              height: "100px",
              borderRadius: "32px",
              "&:hover": {
                opacity: "0.5",
              },

              transition: "background-color 0.5s ease",
            }}
          ></Avatar>
        ))}
      </Grid>
      <Grid container justifyContent="center" mt={6}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={
                <Typography
                  sx={{
                    ml: 1,
                    fontSize: { xs: "14px", md: "18px" },
                  }}
                >
                  details
                </Typography>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Typography
                  sx={{
                    ml: 1,
                    fontSize: { xs: "14px", md: "18px" },
                  }}
                >
                  reviews
                </Typography>
              }
              {...a11yProps(1)}
            />
          </Tabs>
        </Grid>
        <CustomTabPanel value={value} index={0}>
          <Grid item xs={12} m={6} justifyContent="center" display="flex">
            {product && (
              <Grid container justifyContent="center">
                <Typography variant="h6">product details</Typography>
                <Box
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></Box>
              </Grid>
            )}
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid item xs={12} m={6} justifyContent="center" display="flex">
            <Typography variant="h6">product reviews</Typography>
          </Grid>
          <Grid item xs={12}>
            {loading ? (
              <CircularProgress />
            ) : (
              comments &&
              comments.map((comment) => <CommentCard comment={comment} />)
            )}
          </Grid>
          {comments && comments.length === 0 && (
            <Grid container justifyContent="center">
              <Typography>there are no reviews for this product</Typography>
            </Grid>
          )}

          <Grid container justifyContent="center" m={2}>
            <Button
              variant="outlined"
              disabled={pageNum === 1}
              onClick={() => {
                setPageNum(pageNum - 1);
                handleComment();
              }}
            >
              Previous Page
            </Button>
            <Button
              variant="outlined"
              disabled={comments.length === 0}
              onClick={() => {
                setPageNum(pageNum + 1);
                handleComment();
              }}
            >
              Next Page
            </Button>
          </Grid>
        </CustomTabPanel>
      </Grid>
      {openForm && (
        <Grid item xs={12}>
          <OrderForm
            vid={productVid}
            shippingName={product.productNameEn}
            productImage={productImage}
            fromCountryCode={countryCode}
            quantity={quantity}
            price={updatedProductPrice}
            setOnClose={() => {
              setOpenForm(false);
            }}
          />
        </Grid>
      )}
    </Grid>
  );
}
