import React, { useState } from 'react'
import { PropsWithProperties, withProperties } from '../../propertiesContext'
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

	return (
		<>
			<ComponentHeader open={open} setOpen={setOpen}>Text</ComponentHeader>
			{ open && (
				<>
					<StringDrawer label='Text' property={text.text} onChange={onTextChange}/>
				</>
			)}
		</>
	)
}

export default withProperties(TextDrawer, ['text']);