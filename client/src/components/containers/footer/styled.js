import styled from 'styled-components';

const Footer = styled.div`
	display: flex;
	justify-content: space-between;
	text-align: center;
	position: relative;
	width: 100%;
	padding: 6rem 10%;
	background-color: #202020;
	margin-top: 5rem;

	.footer {
		display: flex;
		justify-content: center;
	}

	.title {
		color: #ffffff;
		font-size: 1rem;
		font-weight: 500;
	}

	ul {
		list-style: none;
		color: #b1b1b1;
		font-size: 0.8rem;
		margin: 0 2rem;
		text-align: center;

		.col__1__items {
			margin: 0 2rem;
		}

		.newsletter__input {
			display: flex;
			justify-content: center;
			text-align: center;
		}

		li {
			display: flex;
			justify-content: center;
			font-size: 0.8rem;
			margin: 1rem 0;

			input {
				width: 10rem;
				border-radius: 0.5rem 0rem 0rem 0.5rem;
				border: none;
				outline: none;
				padding: 0rem 2rem;
				padding: 0rem 1rem;
				font-size: 1rem;
			}

			#newsletter {
				position: relative;
				right: 0;
				top: 0;
				color: #ffffff;
				width: 10rem;
				border-radius: 0rem 0.5rem 0.5rem 0rem;
				background-color: #ee362e;
			}

			i {
				color: #ee362e;
				font-size: 1.2rem;
			}
		}

		.pages__items {
			display: flex;
			align-self: flex-start;
		}
	}

	button {
		width: 3rem;
		height: 3rem;
		border-radius: 0.5rem;
		position: absolute;
		background-color: #ee362e;
		right: 2rem;
		bottom: 2rem;

		i {
			font-size: 1rem;
			color: #ffffff;
		}
	}

	@media (max-width: 1441px) {
		flex-direction: column;
	}
`;

export default Footer;
