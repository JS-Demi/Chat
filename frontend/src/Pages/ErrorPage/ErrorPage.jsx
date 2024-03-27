import React from 'react'
import { Link } from 'react-router-dom'
// import './ErrorPage.scss'

const ErrorPage = () => {
	return (
		<div className='error-page'>
			<section className='error-page__content wrapper'>
				<h1 className='error-page__title'>Упс...</h1>
				<h2 className='error-page__subtitle'>Такой страницы не существует </h2>
				<p className='error-page__text'>Произошла ошибка, вернитесь на главную страницу</p>
				<Link
					className='error-page__btn btn btn--bg'
					to='/'
				>
					На главную
				</Link>
			</section>
		</div>
	)
}

export default ErrorPage
