/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import {postLocalStorage} from '../../../redux/actions';
import CardHoverProducts from '../cardHoverProduct/CardHoverProduct';

const FavoritesHoverView = () => {
	const dispatch = useDispatch();
	const favsProduct = useSelector((state) => state.wishlist);
	const user = useSelector((state) => state.userId);

	useEffect(() => {
		if (user) {
			dispatch(postLocalStorage({favsProduct, user}));
			window.localStorage.setItem('cart', JSON.stringify([]));
		} // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='cartHoverView'>
			<div className='row'>
				<div className='cartHeader'>
					<div>
						<div className='cartHoverTitle'>My Favorites</div>
						<div className='cartHoverItems'>
							{favsProduct.length} Items selected
						</div>
					</div>
				</div>
				<div className='productsContainer'>
					{favsProduct.length > 3 ? (
						<InfiniteScroll
							dataLength={favsProduct.length}
							loader={<h4>Loading...</h4>}
							height={450}
						>
							{favsProduct.length
								? favsProduct.map((e, i) => (
										<CardHoverProducts key={i} product={e} />
								  ))
								: null}
						</InfiniteScroll>
					) : favsProduct.length ? (
						favsProduct.map((e, i) => <CardHoverProducts key={i} product={e} />)
					) : null}
				</div>
			</div>
		</div>
	);
};

export default FavoritesHoverView;
