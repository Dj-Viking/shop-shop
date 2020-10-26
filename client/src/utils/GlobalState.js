import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';
const StoreContext = createContext();
const { Provider } = StoreContext;

//StoreContext is just an empty container waiting for data to be provided
// to it as a state. now we create a custom provider function
// that will be used to manage and update our state using the reducer
// created earlier.
// having this all bundled up will make it easier to integrate
// into the app

//with this function we instantiate the initial global state with the
// useProductReducer() custom function so we can wrap it with
// the useReducer() hook from React
// now every time we run this function we receive two items
// * state - most up to date version of the global state object
// * dispatch - a method executed to update the state. it is
// specifically goin to look for an action object passed in
// as its argument

//after useProductReducer() completes and provides with a new state
// and function to update the state. return the StoreContext's <Provider />
// component with the state object and dispatch the function provided
// as data for the `value` prop

const StoreProvider = ({ value = [], ...props}) => {
  const [state, dispatch] = useProductReducer
  (
    {
      products: [],
      cart: [],
      cartOpen: false,
      categories: [],
      currentCategory: '',
    }
  );
  //use this to confirm it works
  console.log(state);
  return <Provider value={[state, dispatch]} {...props}/>
};  

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };