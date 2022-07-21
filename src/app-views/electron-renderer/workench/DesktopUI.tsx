import React from "react";
import SceneService from '../../common/services/scene/sceneService';


type IProps = {
	sceneService: SceneService
}

const DesktopUI = (props: IProps) => {
	const createTest = () => {
		props.sceneService.rpc_createObject('quad');
	};

	return (
		<div id="ui">
			<button onClick={createTest}>Create</button>
		</div>
	)
}

export default DesktopUI;