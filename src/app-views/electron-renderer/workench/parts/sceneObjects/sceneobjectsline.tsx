import React from "react";
import { SceneObject } from '../../../../../types/scene';
import cs from 'classnames';

type IProps = SceneObject & {
	selected: boolean,
	onClick: () => void
}

const SceneObjectLine = (props: IProps) => {
	const classNames = cs({
		selected: props.selected
	})

	return (
		<a className={classNames} onClick={props.onClick}>{props.name}</a>
	)
}

export default SceneObjectLine;