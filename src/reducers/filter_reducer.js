import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if(action.type === LOAD_PRODUCTS){
    let maxPrice = action.payload.map((p) => p.price)
    maxPrice = Math.max(...maxPrice)
    return {
      ...state, 
      all_products:[...action.payload], 
      filtered_products:[...action.payload],
      filters: {...state.filters, max_price: maxPrice, price: maxPrice}
    }
  }
  if(action.type === SET_GRIDVIEW){
    return {...state, grid_view:true}
  }
  if(action.type === SET_LISTVIEW){
    return {...state, grid_view:false}
  }
  if(action.type === UPDATE_SORT){
    return {...state, sort: action.payload}
  }

  if(action.type === SORT_PRODUCTS){
    const {sort, filtered_products} = state
    let tempProducts = [...filtered_products]
    if(sort === 'price-lowest'){
      tempProducts.sort((a, b) => a.price - b.price)
    }
    else if(sort === 'price-highest'){
      tempProducts.sort((a, b) => b.price - a.price)
    }
    else if(sort === 'name-a'){
      tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    else if(sort === 'name-z'){
      tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }

    return {...state, filtered_products:tempProducts}
  }

  else if(action.type === UPDATE_FILTERS){
    
    const {name, value} = action.payload
    console.log('UPDATE FILTERS/',name, ': ', value)
    return {...state, filters:{...state.filters, [name]:value}}
  }
  else if(action.type === FILTER_PRODUCTS){
    const {all_products} = state
    const {text, category, company, color, price, shipping} = state.filters
    let tempProducts = [...all_products]

    // filter by text
    if(text){
      tempProducts = tempProducts.filter((products) => {
        return products.name.toLowerCase().startsWith(text)
      })
    }

    // filter by category
    if(category !== 'all') {
      tempProducts = tempProducts.filter(product => product.category === category)
    }

    // filter by company
    if(company !== 'all') {
      tempProducts = tempProducts.filter(product => product.company === company)
    }

    // filter by colors
    if(color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
       return product.colors.find((c) => c === color)
      })
    }

    //price
    tempProducts = tempProducts.filter((product) => {
      return product.price <= price
    })

    //shipping
    if(shipping) {
      tempProducts = tempProducts.filter((product) => product.shipping === true)
    }

    return {...state, filtered_products:tempProducts}
  }
  if(action.type === CLEAR_FILTERS){
    return {...state,
      filters: {
        ...state.filtes,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false
      }
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
