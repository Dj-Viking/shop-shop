import React from 'react';
import { useStoreContext } from '../../utils/GlobalState.js';
import { TOGGLE_CART } from '../../utils/actions.js';
import CartItem from '../CartItem/index.js';
import Auth from '../../utils/auth.js';
import './style.css';
import { numberWithCommas } from '../../utils/helpers.js';

const Cart = () => {
  // const camera = {
  //   name: 'Camera',
  //   image: 'camera.jpg',
  //   price: 5,
  //   purchaseQuantity: 3
  // };
  // const soap = {
  //   name: 'Soap',
  //   image: 'soap.jpg',
  //   price: 6,
  //   purchaseQuantity: 4
  // }
  const [state, dispatch] = useStoreContext();
  const toggleCart = () => {
    dispatch
    (
      {
        type: TOGGLE_CART
      }
    );
    console.log(state.cartOpen);
  };
  const calculateTotal = () => {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  };

  return (
    <>
      {
        state.cartOpen 
        ?
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
            {
              state.cart.length
              ?
              (
                <div>
                  {
                    state.cart.map(item => (
                      <CartItem 
                        key={item.id}
                        item={item}
                      />
                    ))
                  }
                  <div className="flex-row space-between">
                    <strong>Total: ${numberWithCommas(calculateTotal())}</strong>
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
              )
              :
              (
                <h3>
                  <span
                    role="img"
                    aria-label="shocked"
                  >
                    🧐
                  </span>
                  You haven't added anything into your cart yet.
                </h3>
              )
            }
            {
              /* <div>
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
              */
            }
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