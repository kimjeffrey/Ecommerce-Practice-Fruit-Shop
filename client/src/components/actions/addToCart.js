export const addToCart = (fruit, count) => {
  return {
    type: "ADD_TO_CART",
    fruit,
    count
  }
}
