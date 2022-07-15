import React, { useEffect } from "react";
import { State, StateService } from './services/syncedState/stateService';


type IProps = {
	stateService: StateService
}

const Workbench = (props: IProps) => {
	const onupdate = (state: State) => {
		document.getElementById('a').innerHTML = state.test;
	}

	useEffect( () => {
		const disc = props.stateService.connect( onupdate );

		() => {
			disc();
		}
	})
	return <div id="a">a</div>
}

export default Workbench;