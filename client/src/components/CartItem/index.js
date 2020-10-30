import React from 'react';
// import { useStoreContext } from '../../utils/GlobalState.js';
// import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions.js';
import { idbPromise } from '../../utils/helpers.js';

//REDUX IMPORTS
import { useDispatch } from 'react-redux';
//REDUX ACTIONS
import {
  removeFromCart,
  updateCartQuantity
} from '../../actions';


const CartItem = (props) => {
  const {
    item
  } = props;

  //OBSERVE REDUX GLOBAL STORE
  // const commerceState = useSelector(state => state.commerce);
  //OBSERVE PIECES OF GLOBAL STATE
  // const {
  //   // cart,
  //   // cartOpen,
  // } = commerceState;
  //DISPATCH FUNCTION
  const dispatchREDUX = useDispatch();
  // const [, dispatch] = useStoreContext();//able to omit a returned value with nothing and a comma if we don't need that value
  const rmvFromCart = item => {
    // dispatch
    // (
    //   {
    //     type: REMOVE_FROM_CART,
    //     _id: item._id
    //   }
    // );
    //REDUX DISPATCH
    dispatchREDUX(removeFromCart(item._id))
    //also delete from idb
    idbPromise('cart', 'delete',
    {
      ...item
    });
  };
  const onChange = (event) => {
    const value = event.target.value;
    if (value === '0') {
      // dispatch
      // (
      //   {
      //     type: REMOVE_FROM_CART,
      //     _id: item._id
      //   }
      // );
      
      //REDUX DISPATCH
      dispatchREDUX(removeFromCart(item._id))
      //idb save
      idbPromise('cart', 'delete', {...item});
    } else {
      // dispatch
      // (
      //   {
      //     type: UPDATE_CART_QUANTITY,
      //     _id: item._id,
      //     purchaseQuantity: Number(value)
      //   }
      // );

      //REDUX DISPATCH
      dispatchREDUX(updateCartQuantity(item, Number(value)));
      
      //IDB SAVE
      idbPromise('cart', 'put', 
      {
        ...item,
        purchaseQuantity: Number(value)
      });
    }
  };

  return (
    <div className="flex-row">
      <div>
        <img 
          src={`/images/${item.image}`}
          alt="thing"
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder='1'
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => rmvFromCart(item)}
            style={{cursor: 'pointer'}}
          >
            🗑
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;