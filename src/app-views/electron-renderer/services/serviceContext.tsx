import React, {Component, createContext, useContext} from 'react';
import { AppServices } from '../../../types/viewService';

const ServiceContext = createContext<AppServices>( null as any );
export const ServicesProvider = ServiceContext.Provider;
export const useServices = () => useContext(ServiceContext);