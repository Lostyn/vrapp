import React, { useRef, useEffect } from "react";
import { PropsWithService, withServices } from '../../../services/serviceContext';
import DesktopViewport from '../../../xr/DesktopViewport';

type IProps = PropsWithService & {

}

const Viewport = (props: IProps) => {
	const el = useRef(null);
	let viewport = null;


	useEffect( () => {
		viewport = new DesktopViewport(el.current, props.services.sceneService);
	})

	return (
		<div id="viewport"  ref={el}/>
	)
}

export default withServices(Viewport);