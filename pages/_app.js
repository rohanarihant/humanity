import React from 'react'
import ReactDOM from 'react-dom'
import Head from 'next/head'
import App from 'next/app'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import {AccountProvider} from '../contexts/accountContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

export default class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps: {
				// Call page-level getInitialProps
				...(Component.getInitialProps
					? await Component.getInitialProps(ctx)
					: {}),
			},
		}
	}

	// componentDidMount() {
	// 	if (process.env.NODE_ENV !== 'production') {
	// 		const axe = require('react-axe')
	// 		axe(React, ReactDOM, 1000)
	// 	}
	// }

	render() {
		const { Component, pageProps } = this.props

		const theme = createMuiTheme({
			palette: {
				background: {
					default: '#EEE',
				},
				primary: {
					main: '#3D8EE1',
				},
			},
		})

		return (
			<>
				<Head>
					<title>HUManITy</title>
					<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
				</Head>
				<AccountProvider>
				<ThemeProvider theme={theme}>
					<CssBaseline>
							<Component {...pageProps} />
							<ToastContainer autoClose={5000} position={toast.POSITION.TOP_RIGHT} className="toasterposition" />
					</CssBaseline>
				</ThemeProvider>
				</AccountProvider>
			</>
		)
	}
}
