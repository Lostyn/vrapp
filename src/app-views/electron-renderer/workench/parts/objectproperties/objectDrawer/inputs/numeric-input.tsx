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

		const b = parseFloat(this.state.value);
		const v = (b + evt.movementX * 0.01).toFixed(2);

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

	render() {
		const { placeholder} = this.props;
		const { value, drag } = this.state;

		const ics = cs('ui-numeric-slider icon-h-resize', { drag });
		return (
			<div className='ui-element ui-numeric-input' placeholder={placeholder}>
				<input
					type="text"
					value={value}
					onChange={this.onChange}
					onBlur={this.onBlur}
				/>
				<i className={ics}
					onMouseDown={ this.onDown }
					/>
			</div>
		)
	}
}

export default NumericInput;