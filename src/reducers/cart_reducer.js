import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const {id, amount, product, mainColor} = action.payload
    const newCartItem = {
      // ! change to only get the values that we will need when we render the cart item
      ...action.payload,
      id: id + mainColor
    }
    // we want to check if the amount on the cart + the one to be added doesn't exceed the stock
    // console.log(product);
    const findItem = state.cart.find(item => item.id === id + mainColor)

    if (findItem) {
      const stock = product.stock;
      const amountItem = amount + findItem.amount > stock ? stock : amount + findItem.amount;
      console.log(findItem);
      // * we filter the same product so we don't add multiple products of the same id
      const cartCopy = state.cart.filter(item => item.id !== findItem.id)
      // * if amount + findItem.amoung is greater than the stock, just return the STOCK, else return the sum of amount and findItem.amount
      return {...state, cart: [...cartCopy, {...findItem, amount: amountItem, id: id + mainColor}]}
    }

    
    return {...state, cart: [...state.cart, newCartItem]}
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer


// const productExistOnCart = state.cart.find(product => product.id === id);

// if (productExistOnCart) {
//   const stock = product.stock

//   return {...state, cart: [...state.cart, ]}
// }

// {...productExistOnCart, amount: productExistOnCart.amount + amount > stock ? productExistOnCart.amount : productExistOnCart.amount + amount}