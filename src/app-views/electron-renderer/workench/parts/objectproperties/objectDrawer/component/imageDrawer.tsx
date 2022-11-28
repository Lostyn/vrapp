import React, { useState } from 'react'
import { ImageObject } from '../../../../../../../types/scene'
import { PropsWithProperties, withProperties } from '../../propertiesContext'
import ColorDrawer from '../primitive/colorDrawer'
import NumberDrawer from '../primitive/numberDrawer'
import StringDrawer from '../primitive/stringDrawer'
import ComponentHeader from '../ui/componentHeader'

type IProps = ImageObject & {
	onChange: (instanceId: string, patch:any) => void;
}

const ImageDrawer = (props: IProps) => {
	const {image, instanceID} = props;
	const [open, setOpen] = useState<boolean>(true);

	const getPatch = (key, value) => {
		return {
			image: {
				...image,
				[key]: value
			}
		}
	}

	const onSrcChange = (value:string) => {
		props.onChange(instanceID, getPatch('src', value));
	}

	return (
		<>
			<ComponentHeader open={open} setOpen={setOpen}>Image</ComponentHeader>
			{ open && (
				<>
					<StringDrawer label='Src' property={image.src} onChange={onSrcChange}/>
				</>
			)}
		</>
	)
}

export default withProperties(ImageDrawer, ['image']);