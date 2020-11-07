export default function cartReducer(state = [], action){
  if(action.type === "ADD_TO_CART"){
    return [...state, action.fruit];
  } else if(action.type === 'INCREMENT'){
    let stateCopy = [...state];
    let exists = stateCopy.find(cartItem => cartItem.fruitName === action.fruitName);
    let index = stateCopy.indexOf(exists);
    stateCopy[index].count++;
    return stateCopy;
  } else if(action.type === 'DECREMENT'){
    let stateCopy = [...state];
    let exists = stateCopy.find(cartItem => cartItem.fruitName === action.fruitName);
    let index = stateCopy.indexOf(exists);
    stateCopy[index].count--;
    return stateCopy;
  } else if(action.type === 'DELETE'){
    let stateCopy = [...state];
    let exists = stateCopy.find(cartItem => cartItem.fruitName === action.fruitName);
    let index = stateCopy.indexOf(exists);
    stateCopy.splice(index, 1);
    return stateCopy;
  } else {
    return state;
  }
}
