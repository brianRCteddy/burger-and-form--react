import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		};
		componentDidMount() {
			this.reqInterceptor = axios.interceptors.request.use((req) => {
				this.setState({ error: null });
				return req;
			});
			this.repInterceptor = axios.interceptors.response.use(
				(res) => {
					res;
				},
				(error) => {
					this.setState({ error: error });
				}
			);
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null });
		};
		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.repInterceptor);
		}

		render() {
			return (
				<Auxiliary>
					<Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />;
				</Auxiliary>
			);
		}
	};
};

export default withErrorHandler;
