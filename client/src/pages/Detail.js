import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import { idbPromise } from '../utils/helpers.js';
import { useStoreContext } from '../utils/GlobalState.js';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions.js';

import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from '../assets/spinner.gif'

import Cart from '../components/Cart/index.js';

function Detail() {
  //global state
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  //local state currentProduct
  const [currentProduct, setCurrentProduct] = useState({})
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  //const { products } = state

  useEffect(() => {
    //already in global store
    if (state.products.length) {
      setCurrentProduct
      (
        state.products.find(product => product._id === id)
      );
      //retrieved from server
    } else if (data) {//data gotten from server
      dispatch
      (
        {
          type: UPDATE_PRODUCTS,
          products: data.products
        }
      );
      // //also save to idb
      data.products.forEach(product => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {//if we're offline can't query server get from idb
      idbPromise('products', 'get')
      .then
      (
        indexedProducts => 
        {
          dispatch
          (
            {
              type: UPDATE_PRODUCTS,
              products: indexedProducts
            }
          );
        }
      );
    }
  }, [state.products, data, loading, dispatch, id]);
  //const { cart, product } = state;
  const addToCart = () => {
    const itemInCart = state.cart.find(cartItem => cartItem._id === id);
    if (itemInCart) {
      dispatch
      (
        {
          type: UPDATE_CART_QUANTITY,
          _id: id,
          purchaseQuantity: Number(itemInCart.purchaseQuantity) + 1
        }
      );
      //also save quantity into idb cart object store
      idbPromise('cart', 'put', 
      {
        ...itemInCart,
        purchaseQuantity: Number(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch
      (
        {
          type: ADD_TO_CART,
          product: { ...currentProduct, purchaseQuantity: 1 }
        }
      );
      //if object isnt in the idb cart store yet put it there
      idbPromise('cart', 'put', 
      {
        ...currentProduct,
        purchaseQuantity: 1
      });
    }
  };
  const removeFromCart = () => {
    dispatch
    (
      {
        type: REMOVE_FROM_CART,
        _id: currentProduct._id
      }
    );
    //when removed update the cart store
    idbPromise('cart', 'delete', 
    {
      ...currentProduct
    });
  };

  return (
    <>
      {
        currentProduct 
        ? 
        (
          <div className="container my-1">
            <Link to="/">
              ← Back to Products
            </Link>

            <h2>{currentProduct.name}</h2>
            <p>
              {currentProduct.description}
            </p>

            <p>
              <strong>Price:</strong>
              ${currentProduct.price}
              {" "}
              <button
                onClick={addToCart}
              >
                Add to Cart
              </button>
              <button
                disabled={
                  !state.cart.find(p => p._id === currentProduct._id)
                }
                onClick={removeFromCart}
              >
                Remove from Cart
              </button>
            </p>
            <img
              src={`/images/${currentProduct.image}`}
              alt={currentProduct.name}
            />
          </div>
        ) 
        : null
      }
      {
        loading 
        ? 
        <img src={spinner} alt="loading" /> 
        : null
      }
    <Cart />
    </>
  );
};

export default Detail;
