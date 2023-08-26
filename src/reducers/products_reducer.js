import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
  } from '../actions'
  // ! hindi porket may specific na action, e yun lang ang pwede mong palitan na state value once we return, we can still change the state value of other property
  const products_reducer = (state, action) => {
    if (action.type === SIDEBAR_OPEN) {
        return {...state, isSidebarOpen: true}
    }

    if (action.type === SIDEBAR_CLOSE) {
        return {...state, isSidebarOpen: false}
    }

    if (action.type === GET_PRODUCTS_BEGIN) {
        return {...state, products_loading: true}
    }

    if (action.type === GET_PRODUCTS_SUCCESS) {
        const featured_products = action.payload.filter(product => {
            return product.featured === true
        })

        return {...state, products_loading: false, products: action.payload, featured_products}
    }

    if (action.type === GET_PRODUCTS_ERROR) {
        return {...state, products_error: true, products_loading: false}
    }

    throw new Error(`No Matching "${action.type}" - action type`)
  }
  
  export default products_reducer