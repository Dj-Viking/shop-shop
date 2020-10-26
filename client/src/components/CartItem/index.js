import React from 'react';
import { useStoreContext } from '../../utils/GlobalState.js';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions.js';

const CartItem = (props) => {
  const {
    item
  } = props;
  const [, dispatch] = useStoreContext();//able to omit a returned value with nothing and a comma if we don't need that value
  const removeFromCart = item => {
    dispatch
    (
      {
        type: REMOVE_FROM_CART,
        _id: item._id
      }
    )
  };
  const onChange = (event) => {
    const value = event.target.value;
    if (value === '0') {
      dispatch
      (
        {
          type: REMOVE_FROM_CART,
          _id: item._id
        }
      );
    } else {
      dispatch
      (
        {
          type: UPDATE_CART_QUANTITY,
          _id: item._id,
          purchaseQuantity: Number(value)
        }
      );
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
            onClick={() => removeFromCart(item)}
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