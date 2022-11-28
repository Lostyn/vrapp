import React, { useEffect, useRef, useState } from 'react';
import { ImageObject } from '../../../../../../types/scene';
import { Image as DreiImage } from '@react-three/drei';
import { ImageUtils, Vector3 } from 'three';
import fs from 'fs';

type IProps = {
	item: ImageObject,
	children: any
}

const Image = (props: IProps) => {
	const { transform, image } = props.item;
	const getArray: (p:Vector3) => [x:number, y:number, z:number] = (p: Vector3) => {return [ p.x, p.y, p.z ]};
	const [ valid, setValid ] = useState(false);

	useEffect( () => {
		var canceled = false;
		if (image.src.endsWith('jpg') || image.src.endsWith('png')) {
			fs.stat(image.src, err => {
				if (!canceled) {
					setValid(err == null)
				}
			})
		}

		return () => {
			canceled = true;
		}

	}, [image.src]);

	if (!valid) return <></>

	return (
		<DreiImage
			position={getArray(transform.position)}
			rotation={getArray(transform.rotation)}
			frustumCulled={false}
			url={image.src}
		/>
	)
}

export default Image;