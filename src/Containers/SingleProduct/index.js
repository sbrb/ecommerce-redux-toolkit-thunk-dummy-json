import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { STATUS } from "../../CommonUtils/status";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncProductSingle,
  getProductSingle,
  getSingleProductStatus,
} from "../../Store/productSlice";
import LoaderComponents from "../../Components/Loader";
import { formatPrice } from "../../CommonUtils/commonUtils";
import "./SingleProduct.css";
import { BsFillCartCheckFill } from "react-icons/bs";
import CartMessage from '../../Components/CartMessage';
import { addToCart, getCartMessageStatus, setCartMessageOff, setCartMessageOn } from '../../Store/cartSlice';


const SingleProductContainer = () => {
  const params = useParams();
  const productId = params.id;
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);
  const productSingleStatus = useSelector(getSingleProductStatus);
  const [quantity, setQuantity] = useState(1);
  const cartMessageStatus = useSelector(getCartMessageStatus);
  let discountedPrice =
    product?.price - product?.price * (product?.discountPercentage / 100);
  // console.log("product", product, cartMessageStatus);
  useEffect(() => {
    dispatch(fetchAsyncProductSingle(productId));

    if (cartMessageStatus) {
      setTimeout(() => {
        dispatch(setCartMessageOff());
      }, 2000);
    }
    // eslint-disable-next-line
  }, [cartMessageStatus]);

  if (productSingleStatus === STATUS.LOADING) {
    return <LoaderComponents />;
  }

  const increaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if (tempQty > product?.stock) tempQty = product?.stock;
      return tempQty;
    });
  };

  const decreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if (tempQty < 1) tempQty = 1;
      return tempQty;
    });
  };

  const addToCartHandler = (product) => {
    let discountedPrice =
      product?.price - product?.price * (product?.discountPercentage / 100);
    let totalPrice = quantity * discountedPrice;

    dispatch(addToCart({ ...product, quantity: quantity, totalPrice, discountedPrice }));
    dispatch(setCartMessageOn(true));
  };

  return (
    <>
      <div className="productSingle">
        <div className="container">
          <div className="content">
            <div className="productSingleLeft">
              <div className="productImg">
                <div className="imgZoom">
                  <img
                    src={
                      product ? (product.images ? product.images[0] : "") : ""
                    }
                    alt=""
                  />
                </div>

                <div className="productThumbs">
                  <div className="thumbItem">
                    <img
                      src={
                        product ? (product.images ? product.images[1] : "") : ""
                      }
                      alt=""
                    />
                  </div>
                  <div className="thumbItem">
                    <img
                      src={
                        product ? (product.images ? product.images[2] : "") : ""
                      }
                      alt=""
                    />
                  </div>
                  <div className="thumbItem">
                    <img
                      src={
                        product ? (product.images ? product.images[3] : "") : ""
                      }
                      alt=""
                    />
                  </div>
                  <div className="thumbItem">
                    <img
                      src={
                        product ? (product.images ? product.images[4] : "") : ""
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="productSingleRight">
              <div className="productDetails">
                <h1 className="title">{product?.title}</h1>
                <p className="para">{product?.description}</p>
                <div className="rating">
                  <span className="textRed">Rating:</span>
                  <span className="textNormal">{product?.rating}</span>
                </div>
                <div className="brand">
                  <span className="textRed">Brand:</span>
                  <span className="textNormal">{product?.brand}</span>
                </div>
                <div className="cat">
                  <span className="textRed">Category:</span>
                  <span className="textNormal">
                    {product?.category
                      ? product.category.replace("-", " ")
                      : ""}
                  </span>
                </div>
                <div className="oldPrice">
                  <span className="textRed">Old Price:</span>
                  <span className="textNormal">
                    {formatPrice(product?.price)}
                  </span>
                  <span className="textDark">Inclusive of all taxes</span>
                </div>
                <div className="discount">
                  <span className="textRed">Discount:</span>
                  <span className="textNormal">
                    {product?.discountPercentage} % off
                  </span>
                </div>
                <div className="newPrice">
                  <span className="textRed">New Price:</span>
                  <span className="textNormal">
                    {formatPrice(discountedPrice)}
                  </span>
                </div>

                <div className="quantity">
                  <h5>Quantity:</h5>
                  <div className="quatityBtnGroup">
                    <span
                      className="qtyBtn"
                      onClick={() => decreaseQty()}
                    >
                      -
                    </span>
                    <span className="qty-value">{quantity}</span>
                    <span
                      className="qtyBtn"
                      onClick={() => increaseQty()}
                    >
                      +
                    </span>
                  </div>
                </div>

                <div className="outOfStock">
                  {product?.stock === 0 ? (
                    <div className="text-uppercase bg-danger text-white outOfStockTxt">
                      out of stock
                    </div>
                  ) : (
                    ""
                  )}
                </div>
          

                <div className="addBuySection">
                  <button type="button" className="addToBtn cart_btn">
                    <BsFillCartCheckFill />
                    <span
                      className="btnText"
                      onClick={() => {
                        addToCartHandler(product);
                      }}
                    >
                      add to cart
                    </span>
                  </button>
                  <button type="button" className="addToBtn cart_btn">
                    <span className="btnText">buy now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {cartMessageStatus && <CartMessage />}
      </div>
    </>
  );
};

export default SingleProductContainer;