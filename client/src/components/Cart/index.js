import React, { useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState.js';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions.js';
import CartItem from '../CartItem/index.js';
import Auth from '../../utils/auth.js';
import './style.css';
import { numberWithCommas, idbPromise } from '../../utils/helpers.js';

import { useLazyQuery } from '@apollo/react-hooks';
import { QUERY_CHECKOUT } from '../../utils/queries.js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');


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
  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch
      (
        {
          type: ADD_MULTIPLE_TO_CART,
          products: [...cart]
        }
      );
    }
    if (!state.cart.length || state.cart.length === 0) getCart();
  }, [state.cart.length, dispatch]);

  //establish lazy query use
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  //data var contains checkout session only after query is called with getCheckout()


  function toggleCart() {
    dispatch
    (
      {
        type: TOGGLE_CART
      }
    );
    console.log(state.cartOpen);
  };

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  };

  function submitCheckout() {
    const productIds = [];
    state.cart.forEach(item => 
    {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout(
      {
        variables: { products: productIds }
      }
    );
    console.log(productIds);
  };

  //once data arrives from query with the checkout object
  // redirect customer to stripe to pay
  useEffect(() => {
    if (data) {
      stripePromise.then
      (
        res => 
        {
          res.redirectToCheckout
          (
            {
              sessionId: data.checkout.session
            }
          );
        }
      );
    }
  }, [data]);//data from useLazyQuery

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
                        key={item._id}
                        item={item}
                      />
                    ))
                  }
                  <div className="flex-row space-between">
                    <strong>Total: ${numberWithCommas(calculateTotal())}</strong>
                    {
                      Auth.loggedIn() 
                      ?
                      <button
                        onClick={submitCheckout}
                      >
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