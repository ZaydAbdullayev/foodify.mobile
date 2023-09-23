export const CalculateTotalPrice = (cart) => {
  const totalPrice = cart?.reduce(
    (accumulator, item) => accumulator + item?.price * item?.quantity,
    0
  );
  return totalPrice + 5000;
};
