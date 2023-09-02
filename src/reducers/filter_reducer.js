import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    const testArray = [...action.payload];
    const getPrices = testArray.reduce(
      (accu, currProduct) => {
        if (currProduct.price > accu.max_price) {
          accu.max_price = currProduct.price;
        }

        return accu;
      },
      { max_price: 0 }
    );

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: getPrices.max_price,
        price: getPrices.max_price,
      },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort_value: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const filtered = [...state.filtered_products];

    if (state.sort_value === "price-lowest") {
      filtered.sort((a, b) => {
        return a.price - b.price;
      });
    }

    if (state.sort_value === "price-highest") {
      filtered.sort((a, b) => {
        return b.price - a.price;
      });
    }

    if (state.sort_value === "name-a") {
      filtered.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }

    if (state.sort_value === "name-z") {
      filtered.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }

    return { ...state, filtered_products: filtered };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;

    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const {all_products, filters: {company, color, category, price, shipping, text}} = state;
    // * create a new array by spreading the reference array to an array
    let tempProducts = [...all_products];

    const filtered_products = tempProducts
    // category
    .filter(product => category === "all" || product.category === category)
    // company
    .filter(product => company === "all" || product.company === company)
    // color
    .filter(product => color === "all" || product.colors.some(productColor => productColor.includes(color)))
    // price 
    .filter(product => product.price <= price)
    // shipping
    .filter(product => !shipping ? true : product.shipping === shipping)
    // name
    .filter(product => product.name.startsWith(text))

    return {...state, filtered_products};
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        company: "all",
        category: "all",
        color: "all",
        shipping: false,
        price: state.filters.max_price,
        text: "",
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;

  // const compareText = (text, name) => {
    //   let check = true

    //   for (let i = 0; i < text.length; i++) {
    //     if (text[i] !== name[i]) {
    //       check = false
    //     }
    //   }

    //   return check
    // }