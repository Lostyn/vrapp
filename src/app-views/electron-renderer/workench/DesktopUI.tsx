import React from "react";
import ObjectProperties from './parts/objectproperties/objectProperties';
import SceneObjects from './parts/sceneObjects/sceneobjects';


type IProps = {

}

const DesktopUI = (props: IProps) => {




	return (
		<>
			<SceneObjects />
			<ObjectProperties />
		</>
	)
}

export default DesktopUI;