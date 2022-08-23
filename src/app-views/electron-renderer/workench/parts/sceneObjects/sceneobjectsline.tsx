import React from "react";
import { SceneObject } from '../../../../../types/scene';
import cs from 'classnames';

type IProps = SceneObject & {
	selected: boolean,
	ident?: number,
	onClick: () => void
}

const SceneObjectLine = (props: IProps) => {
	const classNames = cs({
		selected: props.selected
	})

	// console.log(props);

	return (
		<a className={classNames} onClick={props.onClick} style={{
			paddingLeft: `${(props.ident + 1) * 14}px`
		}}>
			{props.name}
		</a>
	)
}

export default SceneObjectLine;