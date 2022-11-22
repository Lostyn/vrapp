import React, {Component, createContext, useContext} from 'react';
import { AppServices } from '../../../types/viewService';

const ServiceContext = createContext<AppServices>( null as any );
export const ServicesProvider = ServiceContext.Provider;
export const useServices = () => useContext(ServiceContext);

// export interface PropsWithService {
// 	services: ViewServices
// }

// const ServiceProvider = (props) => {
// 	return (
// 		<ServiceContext.Provider value={props.services}>
// 			{ props.children }
// 		</ServiceContext.Provider>
// 	)
// }

// export default ServiceProvider;
// export const withServices = Component => props => (
// 	<ServiceContext.Consumer>
// 		{ store => <Component {...props} services={store}/> }
// 	</ServiceContext.Consumer>
// )