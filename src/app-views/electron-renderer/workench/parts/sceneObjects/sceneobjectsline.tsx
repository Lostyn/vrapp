import React from "react";
import { SceneObject } from '../../../../../types/scene';

const SceneObjectLine = (props: SceneObject) => {
	return (
		<a> {props.name} </a>
	)
}

export default SceneObjectLine;