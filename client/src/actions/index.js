export const updateProducts = (products) => {
  return {
    type: 'UPDATE_PRODUCTS',
    payload: products
  }
}

export const updateCategories = (categories) => {
  return {
    type: 'UPDATE_CATEGORIES',
    payload: categories
  }
}
// case 'UPDATE_CATEGORIES':
//   return {
//     ...state,
//     categories: [...action.payload]
//   };

export const updateCurrentCategory = (name) => {
  return {
    type: 'UPDATE_CURRENT_CATEGORY',
    payload: name
  }
}
// case 'UPDATE_CURRENT_CATEGORY':
//   return {
//     ...state,
//     currentCategory: action.payload
//   }



export const addToCart = (data) => {
  return {
    type: 'ADD_TO_CART',
    payload: data
  }
}
// case 'ADD_TO_CART':
//   return {
//     ...state,
//     cartOpen: true,
//     cart: [...state.cart, action.payload]
//   }

export const addMultipleToCart = (data) => {
  return {
    type: 'ADD_MULTIPLE_TO_CART',
    payload: data
  }
}
// case 'ADD_MULTIPLE_TO_CART':
//   return {
//     ...state,
//     cart: [...state.cart, ...action.payload ]
//   }

export const removeFromCart = (_id) => {
  return {//ACTION OBJECT RETURNED BY ACTION FUNCTION INVOKED BY THE DISPATCHER
    type: 'REMOVE_FROM_CART',
    payload: _id
  }
}

// case REMOVE_FROM_CART: 
// let newState = state.cart.filter(product => {
//   return product._id !== action._id;
// });
// return {
//   ...state,
//   cartOpen: newState.length > 0,//checking if true or false
//   cart: newState
// };



export const updateCartQuantity = (item, quantity) => {
  return {
    type: 'UPDATE_CART_QUANTITY',
    _id: item._id,
    payload: quantity
  }
}

export const toggleCart = (data) => {
  return {
    type: 'TOGGLE_CART',
    payload: data
  }
}