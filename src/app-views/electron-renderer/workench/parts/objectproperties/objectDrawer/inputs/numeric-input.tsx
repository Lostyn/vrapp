import React, { Component } from 'react';
import cs from 'classnames';

type IProps = {
	placeholder?: string,
	value: string,
	onChange: (string) => void,
	onBlur?: () => void
}

type IState = {
	drag: boolean,
	value: string
}

class NumericInput extends Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);

		this.state = {
			drag: false,
			value: props.value
		}
	}

	onDown = (evt) => {
		this.setState({
			drag: true
		}, () => {
			window.addEventListener('mousemove', this.onMove);
			window.addEventListener('mouseup', this.onUp);
		})
	}

	onMove = (evt: MouseEvent) => {
		evt.preventDefault();
		evt.stopPropagation();

		var scale = 0.01;
		if (evt.ctrlKey) scale = 1;

		const b = parseFloat(this.state.value);
		const v = (b + evt.movementX * scale).toFixed(2);

		this.setState({
			value: v
		}, () => this.props.onChange(v));
	}

	onUp = (evt) => {

		window.removeEventListener('mousemove', this.onMove);
		window.removeEventListener('mouseup', this.onUp);
		this.setState({
			drag: false
		})
	}

	check = (s:string):boolean => {
		const result = parseFloat(s);
		return !isNaN(result);
	}

	onChange = (evt) => {
		let input = evt.target.value;
		this.setState({
			value: input
		}, () => {
			if (this.check(input))
				this.props.onChange(parseFloat(input))
		})
	}

	onBlur = (evt) => {
		if (!this.check(this.state.value)) {
			this.setState({
				value: '0'
			}, () => this.props.onChange(0) )
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.value != prevProps.value) {
			this.setState({ value: this.props.value })
		}
	}


	render() {
		const { placeholder} = this.props;
		const { value, drag } = this.state;

		const dcs = cs('ui-element ui-numeric-input', { drag });
		return (
			<div className={dcs} placeholder={placeholder}>
				<input
					type="text"
					value={value}
					onChange={this.onChange}
					onBlur={this.onBlur}
				/>
				<i className='ui-numeric-slider icon-h-resize'
					onMouseDown={ this.onDown }
					/>
			</div>
		)
	}
}

export default NumericInput;