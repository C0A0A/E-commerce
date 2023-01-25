import React, {useEffect, useState} from 'react';
import DIV_CART from './styled';
import {postLocalStorage} from '../../../redux/actions/index';
import {useDispatch, useSelector} from 'react-redux';
import CardCartProducts from '../cardCartProducts/CardCartProducts';
import {Link} from 'react-router-dom';
import SumarryCart from '../sumarryCart/SumarryCart';
import {calculateCartPrice} from '../../../utils/calculateCartPrice';

const Cart = () => {
	const dispatch = useDispatch();
	const cartProduct = useSelector((state) => state.cartProducts);
	const [totals, setTotals] = useState({
		amount: 0,
		currency: '',
		delivery: 0
	});

	useEffect(() => {
		const user = window.localStorage.getItem('userId');
		if (user) {
			dispatch(postLocalStorage({products: cartProduct, userId: user}));
			window.localStorage.setItem('cart', JSON.stringify([]));
		}
		cartProduct && setTotals(calculateCartPrice(cartProduct));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<DIV_CART>
			<div className='title_cnt'>
				<h1>Shopping Cart</h1>
			</div>
			<div className='products__summ__cnt'>
				<div className='prd__link'>
					<div className='product_cnt'>
						<div className='prd__values'>
							<div>Product</div>
							<div>Amount</div>
							<div>Price</div>
						</div>
						{cartProduct.length ? (
							cartProduct.map((e, i) => (
								<CardCartProducts key={i} product={e} />
							))
						) : (
							<h1 className='dont__prd'>
								You don't have products in your cart
							</h1>
						)}
					</div>
					<div>
						<Link to='/catalogue'>
							<p className='p_back_home'>{'<<'} Continue Shopping</p>
						</Link>
						{totals.amount && (
							<p className='h2__sbt'>
								{totals.currency} {totals.amount}
							</p>
						)}
					</div>
				</div>
				<SumarryCart />
			</div>
		</DIV_CART>
	);
};

export default Cart;
