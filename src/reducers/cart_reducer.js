import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if(action.type === ADD_TO_CART){
    const {id, color, amount, product} = action.payload
   // console.log("cart=reducer:", state)
   // console.log("id ", id)
    const tempItem = state.cart.find((i) => i.id === id+color)
    if(tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if(cartItem.id === id + color){
          let newAmount = cartItem.amount + amount;
          if(newAmount > cartItem.max){
            newAmount = cartItem.max
          }
          return {...cartItem, amount: newAmount}
        } else {
          return cartItem
        }
      })

      return {...state, cart:tempCart}
    } else {
      const newItem = {
        id:id+color,
        name:product.name,
        color,
        amount,
        image:product.images[0].url,
        price: product.price,
        max: product.max
      }
      // console.log("Adding to CArt: " + newItem.id)
      return {...state, cart: [...state.cart, newItem]}
    }
  }

  if(action.type === REMOVE_CART_ITEM){
    const tempCart = state.cart.filter((item) => item.id !== action.payload)
    return {...state, cart:tempCart}
  }

  if(action.type === CLEAR_CART){
    return {...state, cart: []}
  }

  if(action.type === TOGGLE_CART_ITEM_AMOUNT){
    const {id, value} = action.payload
    const tempCart = state.cart.map((item) => {
  
      if(item.id === id){
        let newAmount = item.amount + value
        if(newAmount < 1) { // dont decrease if cart only has one
          newAmount = 1
        }
        if(newAmount >= item.max){
          newAmount = item.max // dont allow to put more items in cart than exist in stock
        }
        return {...item, amount: newAmount}
      } else {
        return item
      }

    })
    return {...state, cart: tempCart}
  }

  if(action.type === COUNT_CART_TOTALS){
    const {total_items, total_amount} = state.cart.reduce((total, cartItem) => {
      const {amount, price} = cartItem
      total.total_items += amount
      total.total_amount += price * amount
      return total
    }, {
      total_items: 0,
      total_amount: 0
    })
    return {...state, total_items, total_amount}
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
