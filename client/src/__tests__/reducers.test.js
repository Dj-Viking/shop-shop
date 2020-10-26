//reducer is a function that updates state by returning a new state object
// and never alters the original state object.
// doesnt mean date inside the state object isn't altered
// the state is intended to be immutable, it should never be directly
// altered in any way.
// the reason is so that it goes behind the state management system's
// back and isn't informed that something has changed.

/**
 * create a new version of state by making a copy of the original state's 
 * data and updating only the part that has changed
   const updatedState = {...state, email: 'lernantino99@gmail.com'};
 * 
 */

//import actions

import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART
} from '../utils/actions';

import { reducer } from '../utils/reducers.js';

//create sample of what our global state will look like
const initialState = {
  products: [],
  categories: [{ name: 'Food' }],
  currentCategory: '1',
  cart: [
    {
      _id: '1',
      name: 'Soup',
      purchaseQuantity: 1
    },
    {
      _id: '2',
      name: 'Bread',
      purchaseQuantity: 2
    }
  ],
  cartOpen: false
};

//test updating products list, testing the update_products action
// to see if we can add a product to the products array.

test('UPDATE_PRODUCTS', () => {
  let newState = reducer(initialState, {
    type: UPDATE_PRODUCTS,
    products: [{}, {}]
  });

  expect(newState.products.length).toBe(2);
  expect(initialState.products.length).toBe(0);
});

//similar to the one above but will be used to test how we can update
// the categories array, and execute the reducer function() still
// passing in the initialState, but now the action type and value changed
// execute the update categories to be a new array of categories
test('UPDATE_CATEGORIES', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CATEGORIES,
    categories: [{}, {}]
  });

  expect(newState.categories.length).toBe(2);
  expect(initialState.categories.length).toBe(1);
});

//updating the state of currentCategory to a new string value
// instead of an array. compaies these values between
// newState and initialState to confirm the initialState
// has remained the same
test('UPDATE_CURRENT_CATEGORY', () => {
  let newState = reducer(initialState, {
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: '2'
  });

  expect(newState.currentCategory).toBe('2');
  expect(initialState.currentCategory).toBe('1');
});

test('ADD_TO_CART', () => {
  let newState = reducer
  (
    initialState, 
    {
      type: ADD_TO_CART,
      product: { purchaseQuantity: 1 }
    }
  );

  expect(newState.cart.length).toBe(3);
  expect(initialState.cart.length).toBe(2);
});

test('ADD_MULTIPLE_TO_CART', () => {
  let newState = reducer
  (
    initialState,
    {
      type: ADD_MULTIPLE_TO_CART,
      products: [{}, {}]
    }
  );

  expect(newState.cart.length).toBe(4);
  expect(initialState.cart.length).toBe(2);
});

test('REMOVE_FROM_CART', () => {
  let newState1 = reducer
  (
    initialState,
    {
      type: REMOVE_FROM_CART,
      _id: '1'
    }
  );

  //cart is still open ?
  expect(newState1.cartOpen).toBe(true);

  //second item should be the first ?
  expect(newState1.cart.length).toBe(1);
  expect(newState1.cart[0]._id).toBe('2');

  let newState2 = reducer
  (
    newState1,
    {
      type: REMOVE_FROM_CART,
      _id: '2'
    }
  );

  //cart empty and closed ?
  expect(newState2.cartOpen).toBe(false);
  expect(newState2.cart.length).toBe(0);

  expect(initialState.cart.length).toBe(2);
});

test('UPDATE_CART_QUANTITY', () => {
  let newState = reducer
  (
    initialState,
    {
      type: UPDATE_CART_QUANTITY,
      _id: '1',
      purchaseQuantity: 3
    }
  );

  expect(newState.cartOpen).toBe(true);
  expect(newState.cart[0].purchaseQuantity).toBe(3);
  expect(newState.cart[1].purchaseQuantity).toBe(2);

  expect(initialState.cartOpen).toBe(false);
});

test('CLEAR_CART', () => {
  let newState = reducer
  (
    initialState,
    {
      type: CLEAR_CART
    }
  );

  expect(newState.cartOpen).toBe(false);
  expect(newState.cart.length).toBe(0);
  expect(initialState.cart.length).toBe(2);
});

test('TOGGLE_CART', () => {
  let newState = reducer
  (
    initialState,
    {
      type: TOGGLE_CART
    }
  );

  expect(newState.cartOpen).toBe(true);
  expect(initialState.cartOpen).toBe(false);

  let newState2 = reducer
  (
    newState, 
    {
      type: TOGGLE_CART
    }
  );

  expect(newState2.cartOpen).toBe(false);
});