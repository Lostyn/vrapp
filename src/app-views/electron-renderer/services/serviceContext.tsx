import React, {Component, createContext} from 'react';
import { ViewServices } from '../../../types/viewService';

const ServiceContext = createContext({});

export interface PropsWithService {
	services: ViewServices
}

const ServiceProvider = (props) => {
	return (
		<ServiceContext.Provider value={props.services}>
			{ props.children }
		</ServiceContext.Provider>
	)
}

export default ServiceProvider;
export const withServices = Component => props => (
	<ServiceContext.Consumer>
		{ store => <Component {...props} services={store}/> }
	</ServiceContext.Consumer>
)