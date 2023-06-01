import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  UPDATE_PRODUCT_IN_CART,
  EMPTY_CART,
} from "../constants/actionTypes";

function updateProduct(state, productId, quantity) {
  return state.map((item) => {
    if (item.productId === productId) {
      return { ...item, quantity };
    }

    return item;
  });
}

function updateProductAmount(state, product) {
  return state.map((item) => {
    if (item.productId === product.productId) {
      return { ...product, quantity: item.quantity + product.quantity };
    }

    return item;
  });
}

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART: {
      if (
        state.find(({ productId }) => productId === action.product.productId)
      ) {
        return updateProductAmount(state, action.product);
      }

      return [...state, action.product];
    }
    case REMOVE_PRODUCT_FROM_CART: {
      return state.filter(({ productId }) => productId !== action.productId);
    }
    case UPDATE_PRODUCT_IN_CART: {
      return updateProduct(state, action.productId, action.quantity);
    }
    case EMPTY_CART: {
      return [];
    }
    default:
      return state;
  }
}
