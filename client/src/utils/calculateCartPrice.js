export const calculateCartPrice = (cartProducts) => {
	if (cartProducts.length === 0) return {amount: 0, currency: '', delivery: 50};
	return {
		amount: cartProducts.reduce((a, b) => {
			return (a += b.product.price.value * b.lot);
		}, 0),
		currency: cartProducts[0].product.price.currency,
		delivery: 50
	};
};
