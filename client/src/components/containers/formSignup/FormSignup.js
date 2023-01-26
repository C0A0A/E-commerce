/* eslint-disable react/jsx-pascal-case */
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Signup_Style from './styled';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import {URLS} from '../../../utils/constants';
import {AiFillLock} from 'react-icons/ai';
import {FaEnvelope} from 'react-icons/fa';
import {IoCloseSharp} from 'react-icons/io5';
import Swal from 'sweetalert2';
import {loginUser} from '../../../redux/actions';

const FormSignup = () => {
	let history = useHistory();
	const dispatch = useDispatch();

	const [input, setInput] = useState({
		email: '',
		password: ''
	});

	const [errors, setErrors] = useState({});

	const handleGoogle = async (response) => {
		let inputGoogle = {
			firstName: response.profileObj.givenName,
			lastName: response.profileObj.familyName,
			profileImage: response.profileObj.imageUrl,
			email: response.profileObj.email,
			password: response.profileObj.googleId
		};

		let users = await axios.get(URLS.URL_USERS);

		if (users.data.response.find((el) => el.email === inputGoogle.email)) {
			try {
				let userLogIn = await axios.post(URLS.URL_LOGIN, inputGoogle);

				window.localStorage.setItem('token', userLogIn.data.token);
				window.localStorage.setItem(
					'address',
					JSON.stringify(userLogIn.data.user.address)
				);
				window.localStorage.setItem('email', userLogIn.data.user.email);
				window.localStorage.setItem('firstName', userLogIn.data.user.firstName);
				window.localStorage.setItem(
					'identification',
					userLogIn.data.user.identification
				);
				window.localStorage.setItem('lastName', userLogIn.data.user.lastName);
				window.localStorage.setItem(
					'profileImage',
					userLogIn.data.user.imageUrl
				);
				window.localStorage.setItem('userId', userLogIn.data.user._id);
				window.localStorage.setItem('role', userLogIn.data.user.role);

				dispatch(loginUser({role: userLogIn.data.user.role}));
				if (userLogIn.data.user.role === 'admin') {
					history.push('/admindashboard');
				} else {
					history.push('/catalogue');
				}
			} catch (error) {
				console.log(error.response);
				return error.response;
			}
		} else {
			try {
				await axios.post(URLS.URL_SIGNUP, inputGoogle);
				let userLogIn = await axios.post(URLS.URL_LOGIN, inputGoogle);

				window.localStorage.setItem('token', userLogIn.data.token);
				window.localStorage.setItem(
					'address',
					JSON.stringify(userLogIn.data.user.address)
				);
				window.localStorage.setItem('email', userLogIn.data.user.email);
				window.localStorage.setItem('firstName', userLogIn.data.user.firstName);
				window.localStorage.setItem(
					'identification',
					userLogIn.data.user.identification
				);
				window.localStorage.setItem('lastName', userLogIn.data.user.lastName);
				window.localStorage.setItem(
					'profileImage',
					userLogIn.data.user.imageUrl
				);
				window.localStorage.setItem('userId', userLogIn.data.user._id);
				window.localStorage.setItem('role', userLogIn.data.user.role);

				dispatch(loginUser({role: userLogIn.data.user.role}));

				if (userLogIn.data.user.role === 'admin') {
					history.push('/admindashboard');
				} else {
					history.push('/catalogue');
				}
			} catch (error) {
				console.log(error.response);
				return error.response;
			}
		}
	};

	useEffect(() => {
		/* global google */
		if (window.google) {
			google.accounts.id.initialize({
				client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
				callback: handleGoogle
			});

			google.accounts.id.renderButton(document.getElementById('signUpDiv'), {
				// type: "standard",
				theme: 'filled_black',
				// size: "small",
				text: 'continue_with',
				shape: 'pill'
			});
		} // eslint-disable-line react-hooks/exhaustive-deps
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		setErrors({});
	}, [input]);

	const onSubmitHandler = (e) => {
		e.preventDefault();
		axios
			.post(URLS.URL_SIGNUP, input) // {email: "perro@gmail.com", password: "1234"}
			.then(function (response) {
				let data = response.data;
				if (data.user === true) {
					setErrors({
						message: data.message
					});
				} else {
					setInput({
						email: '',
						password: ''
					});
					Swal.fire({
						title: 'Success!',
						text: 'Succesfully registered',
						icon: 'success',
						confirmButtonText: 'Ok'
					}).then(() => {
						history.push('/login');
					});
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const onChangeHandler = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		});
	};

	return (
		<Signup_Style>
			<div className='loginContainer'>
				<div className='loginWrapper'>
					<div className='loginContent'>
						<Link to='/'>
							<div className='close__icon'>
								<IoCloseSharp />
							</div>
						</Link>
						<div className='rowTop'>
							<Link to='/login'>
								<button className='signInBtnTop'>
									<div>Sign in</div>
								</button>
							</Link>
							<Link to='/signup'>
								<button className='signUpBtn'>
									<div>Sign up</div>
								</button>
							</Link>
						</div>
						<form onSubmit={(e) => onSubmitHandler(e)} className='loginForm'>
							<div className='inputElement'>
								<span className='emailSpan'>Email Address</span>
								<i className='lockIcon'>
									<AiFillLock />
								</i>
								<input
									className='emailInput'
									type='text'
									name='email'
									value={input.email}
									placeholder='Enter email'
									onChange={(e) => onChangeHandler(e)}
								></input>
							</div>
							<div>{errors ? errors.message : null}</div>
							<div className='inputElement'>
								<span className='passwordSpan'>Password</span>
								<i className='lockIcon'>
									<FaEnvelope />
								</i>
								<input
									className='passwordInput'
									type='password'
									name='password'
									value={input.password}
									placeholder='Enter password'
									onChange={(e) => onChangeHandler(e)}
								></input>
							</div>
							<button type='submit' className='signUpBtnBottom'>
								<div>SIGN UP</div>
							</button>
						</form>
						<div className='separadorDiv'>
							<div className='separador'></div>
						</div>
						<div id='signUpDiv' data-text='signup_with'></div>
						<div className='rowBottom'>
							<p className='signUpBottom'> Already registered? </p>
							<Link to='/login'>
								<span className='signUpSpan'> Sign in </span>
							</Link>
						</div>
					</div>
					<div className='loginPicture'></div>
				</div>
			</div>
		</Signup_Style>
	);
};

export default FormSignup;
