export const decrementCount = (fruitName) => {
  return {
    type: "DECREMENT",
    fruitName
  }
}
