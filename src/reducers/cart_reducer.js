import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const {id, amount, product, mainColor, color} = action.payload
    console.log(color);
    const newCartItem = {
      // ! change to only get the values that we will need when we render the cart item
      name: product.name,
      id: id + mainColor,
      color: mainColor,
      amount,
      image: product.images[0].url,
      price: product.price,
      max: product.stock
    }
    // we want to check if the amount on the cart + the one to be added doesn't exceed the stock
    // console.log(product);
    const findItem = state.cart.find(item => item.id === id + mainColor)

    if (findItem) {
      const stock = findItem.max;
      const amountItem = amount + findItem.amount > stock ? stock : amount + findItem.amount;
     
      // * we filter the same product so we don't add multiple products of the same id
      const cartCopy = state.cart.map(item => item.id === findItem.id ? {...item, amount: amountItem} : item)
      // * if amount + findItem.amoung is greater than the stock, just return the STOCK, else return the sum of amount and findItem.amount
      // parseData(cartCopy)
      return {...state, cart: cartCopy}
    }

    // parseData([...state.cart, newCartItem])

    return {...state, cart: [...state.cart, newCartItem]}
  }

  if (action.type === REMOVE_CART_ITEM) {
    const newCart = state.cart.filter(item => item.id !== action.payload);
    return {...state, cart: newCart}
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const getItem = state.cart;
    
    const newCart = getItem.map(item => {
      if (item.id === action.payload.id) {
        console.log((action.payload.value));
        let newAmount;
        if (action.payload.value === "add") {
          newAmount = item.amount + 1 > item.max ? item.max : item.amount + 1
          return {...item, amount: newAmount}
        }

        newAmount = item.amount - 1 < 1 ? item.amount : item.amount - 1
        return {...item, amount: newAmount}
      }
    
      return item;
    })

    return {...state, cart: newCart}
  }

  if (action.type === CLEAR_CART) {
    return {...state, cart: []}
  }

  if (action.type === COUNT_CART_TOTALS) {
    const cartCopy = [...state.cart]
    const cartReduce = cartCopy.reduce((accu, currCartItem) => {
      const {amount, price} = currCartItem;
      accu.total_items += amount
      accu.total_amount += price * amount
      return accu
    }, {total_items: 0, total_amount: 0})

    const {total_items, total_amount} = cartReduce;
    return {...state, total_items, total_amount};
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