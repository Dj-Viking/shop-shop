import React from 'react';
import { useStoreContext } from '../../utils/GlobalState.js';
import { TOGGLE_CART } from '../../utils/actions.js';
import CartItem from '../CartItem/index.js';
import Auth from '../../utils/auth.js';
import './style.css';

const Cart = () => {
  const camera = {
    name: 'Camera',
    image: 'camera.jpg',
    price: 5,
    purchasQuantity: 3
  };
  const soap = {
    name: 'Soap',
    image: 'soap.jpg',
    price: 6,
    purchasQuantity: 4
  }
  const [state, dispatch] = useStoreContext();
  console.log(state.cartOpen);
  const toggleCart = () => {
    dispatch
    (
      {
        type: TOGGLE_CART
      }
    );
    console.log(state.cartOpen);
  };

  return (
    <>
      {
        state.cartOpen ?
        (
          <div className="cart">
            <div 
              className="close"
              onClick={toggleCart}
            >
                [close]
            </div>
            <h2>
              Shopping Cart
            </h2>
            <div>
              <CartItem item={camera} />
              <CartItem item={soap} />
              <div className="flex-row space-between">
                <strong>Total: $0</strong>
                {
                  Auth.loggedIn() 
                  ?
                  <button>
                    Checkout
                  </button>
                  :
                  <span>(log in to check out)</span>
                }
              </div>
            </div>
          </div>
        )
        :
        (
          <div
            className="cart-closed"
            onClick={toggleCart}
          >
            <span
              role="img"
              aria-label="cart"
            >
              🛒
            </span>
          </div>
        )
      }
    </>
  );
};

export default Cart;