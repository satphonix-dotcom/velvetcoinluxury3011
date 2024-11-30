export const calculateSubtotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const calculateShipping = (subtotal) => {
  // Free shipping over $100
  return subtotal >= 100 ? 0 : 10;
};

export const calculateTax = (subtotal) => {
  return subtotal * 0.1; // 10% tax
};

export const calculateTotal = (items) => {
  const subtotal = calculateSubtotal(items);
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  return subtotal + shipping + tax;
};