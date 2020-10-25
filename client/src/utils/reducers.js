import { useReducer } from 'react';
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    //if action tpe value is the value of `update products`, return
    // a new state object with an updated products array
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
    //if action type is update_categories, return a new state 
    // object with an updated categories array
    case UPDATE_CATEGORIES:
    return {
      ...state,
      categories: [...action.categories]
    };


    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      };

    //if its noneof these actions do not update state at all
    // and keep things the same
    default:
      return state;
  }
};  

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}