import React from "react";
// import { useStoreContext } from '../../utils/GlobalState.js';
// import { /*ADD_TO_CART,*/ UPDATE_CART_QUANTITY } from '../../utils/actions.js';
import { Link } from "react-router-dom";
import { pluralize, idbPromise } from "../../utils/helpers"

//REDUX IMPORTS
import { useSelector, useDispatch } from 'react-redux';
//REDUX ACTIONS
import {
  addToCart,
  updateCartQuantity
} from '../../actions';


function ProductItem(item) {
  //REDUX OBSERVE GLOBAL STATE
  const commerceState = useSelector(state => state.commerce);
  //GET PIECE OF GLOBAL STATE
  const {
    cart
  } = commerceState;
  
  //REDUX DISPATCH FUNCTION
  const dispatchREDUX = useDispatch();
  
  //DESTRUCTURED PRODUCT ITEM FROM PROPS
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  // const [state, dispatch] = useStoreContext();
  // const {cart, products} = state;
  const addToCartDOM = () => {
    
    //find the cart item with the matching id
    const itemInCart = cart.find(cartItem => cartItem._id === _id);
    //if there was a match, call UPDATE with a new purchase quantity
    if (itemInCart) {//item already in cart?
      // dispatch
      // (
      //   {
      //     type: UPDATE_CART_QUANTITY,
      //     _id: _id,
      //     purchaseQuantity: Number(itemInCart.purchaseQuantity) + 1
      //   }
      // );

      //REDUX DISPATCH
      dispatchREDUX(updateCartQuantity(itemInCart, Number(itemInCart.purchaseQuantity) + 1));

      //save to idb
      idbPromise('cart', 'put', 
      {
        ...itemInCart,
        purchaseQuantity: Number(itemInCart.purchaseQuantity) + 1
      });
    } else {
      // dispatch
      // (
      //   {
      //     type: ADD_TO_CART,
      //     payload: { ...item, purchaseQuantity: 1 }
      //   }
      // );

      //REDUX DISPATCH
      const payload = {...item, purchaseQuantity: 1}
      dispatchREDUX(addToCart(payload));

      //SAVE TO IDB
      idbPromise('cart', 'put', 
      {
        ...item,
        purchaseQuantity: 1
      });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button
        onClick={addToCartDOM}
      >
        Add to cart
      </button>
    </div>
  );
}

export default ProductItem;
