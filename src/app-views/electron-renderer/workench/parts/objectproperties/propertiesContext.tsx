import React, {createContext, useCallback, useState} from 'react';
import { Image, SceneObject, Transform } from '../../../../../types/scene';

export interface PropsWithProperties {
	instanceID: string,
	transform: Transform,
	image: Image
}

const PropertiesContext = createContext({});

const PropertiesProvider = (props) => {
	return (
		<PropertiesContext.Provider value={props.properties}>
			{ props.children }
		</PropertiesContext.Provider>
	)
}

export default PropertiesProvider;
export const withProperties = (Component, keys?: string[]) => props => {

	const getState = (store) => {
		if(keys == undefined || keys.length == 0) return {...store};

		var o = {};
		Object.keys(store).forEach( k => {
			if (keys.indexOf(k) != -1)
				o[k] = store[k]
		})

		return {
			instanceID: store.instanceID,
			...o
		}
	}

	return (
		<PropertiesContext.Consumer>
			{ store => <Component {...props} {...getState(store)}/> }
		</PropertiesContext.Consumer>
	)
}