import React, { useEffect, useRef } from 'react';
import { BufferGeometry, Color, DoubleSide, Float32BufferAttribute, Vector2, Vector3 } from 'three';
import { ProceduralImageObject, SceneObject } from '../../../../../../types/scene';

const encodeNumber_0_1_16_16 = (a: number, b: number): number => {
	let kDecodeDot: Vector2 = new Vector2(1, 1 / 65535);
	return new Vector2(
		Math.floor(a * 65534) / 65535,
		Math.floor(b * 65534) / 65535
	).dot(kDecodeDot);
}

type IProps = {
	item:ProceduralImageObject,
	children: any
}

const ProceduralImage = (props:IProps) => {
	const {transform, image} = props.item;
	const getArray: (p:Vector3) => [x:number, y:number, z:number] = (p: Vector3) => {return [ p.x, p.y, p.z ]};

	const geoRef = useRef<BufferGeometry>(null);

	const minside = Math.min(image.width, image.height);

	useEffect( () => {
		const w = image.width * 0.5;
		const h = image.height * 0.5;
		const positions = new Float32Array([
			-w, h, 0,
			w, h, 0,
			-w, -h, 0,
			w, -h, 0
		])
		const uvs2 = [image.width, image.height];

		geoRef.current.setAttribute('position', new Float32BufferAttribute(positions, 3));
		geoRef.current.setAttribute('uv2', new Float32BufferAttribute([...uvs2, ...uvs2, ...uvs2, ...uvs2], 2))
	}, [image.width, image.height]);

	useEffect( () => {
		const rx = Math.min(Math.max(image.radius.x, 0), minside * 0.5);
		const ry = Math.min(Math.max(image.radius.y, 0), minside * 0.5);
		const rz = Math.min(Math.max(image.radius.z, 0), minside * 0.5);
		const rw = Math.min(Math.max(image.radius.w, 0), minside * 0.5);

		const uvs3 = [
			encodeNumber_0_1_16_16(rx / minside, ry / minside),
			encodeNumber_0_1_16_16(rw / minside, rz / minside)
		]

		geoRef.current.setAttribute('uv3', new Float32BufferAttribute([...uvs3, ...uvs3, ...uvs3, ...uvs3], 2))
	}, [image.radius.x, image.radius.y, image.radius.z, image.radius.w,])

	useEffect( () => {
		const borderWith = image.borderWidth / minside * 2;
		const uvs4 = [borderWith, 0];

		geoRef.current.setAttribute('uv4', new Float32BufferAttribute([...uvs4, ...uvs4, ...uvs4, ...uvs4], 2))
	}, [image.borderWidth]);

	return (
		<mesh
			position={getArray(transform.position)}
			rotation={getArray(transform.rotation)}
			frustumCulled={false}
		>
			<bufferGeometry ref={geoRef} >
			<bufferAttribute
					attach="attributes-uv"
					array={new Float32Array([ 0, 1, 1, 1, 0 ,0, 1, 0])}
					count={4}
					itemSize={2}/>
				<bufferAttribute
					attach="index"
					array={new Uint16Array([ 0, 2, 1, 2, 3, 1])}
					count={6}
					itemSize={1}/>
			</bufferGeometry>
			<proceduralImageMaterial
				color={new Color().setHex(parseInt(image.color))}
				transparent={true}
				side={DoubleSide}

			/>

			{props.children}
		</mesh>
	)
}

export default ProceduralImage;