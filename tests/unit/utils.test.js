const { calculateTotalPrice } = require('../../src/utils/orderUtils');

describe('calculateTotalPrice', () => {
  it('should calculate total price for given order items', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 }
    ];
    const total = calculateTotalPrice(items);
    expect(total).toBe(35);
  });
});
