import React, { useState } from 'react'
import { PropsWithProperties, withProperties } from '../../propertiesContext'
import ColorDrawer from '../primitive/colorDrawer'
import NumberDrawer from '../primitive/numberDrawer'
import StringDrawer from '../primitive/stringDrawer'
import ComponentHeader from '../ui/componentHeader'

type IProps = PropsWithProperties & {
	onChange: (instanceId: string, patch:any) => void;
}

const TextDrawer = (props: IProps) => {
	const {text, instanceID} = props;
	const [open, setOpen] = useState<boolean>(true);

	const getPatch = (key, value) => {
		return {
			text: {
				...text,
				[key]: value
			}
		}
	}

	const onTextChange = (value:string) => {
		props.onChange(instanceID, getPatch('text', value));
	}

	const onColorChange = (value:string) => {
		props.onChange(instanceID, getPatch('color', value));
	}

	const onFontSizeChange = (value:number) => {
		props.onChange(instanceID, getPatch('fontSize', value));
	}

	return (
		<>
			<ComponentHeader open={open} setOpen={setOpen}>Text</ComponentHeader>
			{ open && (
				<>
					<StringDrawer label='Text' property={text.text} onChange={onTextChange}/>
					<ColorDrawer label='Color' property={text.color} onChange={onColorChange}/>
					<NumberDrawer label='Font size' property={text.fontSize} onChange={onFontSizeChange} />
				</>
			)}
		</>
	)
}

export default withProperties(TextDrawer, ['text']);