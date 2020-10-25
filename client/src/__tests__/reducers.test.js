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
  UPDATE_CURRENT_CATEGORY
} from '../utils/actions';

//create sample of what our global state will look like
const initialState = {
  products: [],
  categories: [{ name: 'Food' }],
  currentCategory: '1',
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