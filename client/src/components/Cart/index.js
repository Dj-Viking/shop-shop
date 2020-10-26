import React from 'react';
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
  return (
    <div className="cart">
      <div className="close">
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
  );
};

export default Cart;