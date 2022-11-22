import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { Color, ColorRepresentation } from 'three';

const axes = 'xzy';
const planeAxes = 'xz';
const GridMaterial = shaderMaterial(
	{
		uSize1: 1,
		uSize2: 10,
		uColor: new Color(),
		uDistance: 100
	},
	`varying vec3 worldPosition;

	uniform float uDistance;

	void main() {

		vec3 pos = position.${axes} * uDistance;
		pos.${planeAxes} += cameraPosition.${planeAxes};

		worldPosition = pos;

		gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

	}
	`,
	`
	varying vec3 worldPosition;

	uniform float uSize1;
	uniform float uSize2;
	uniform vec3 uColor;
	uniform float uDistance;

	float getGrid(float size) {

		vec2 r = worldPosition.${planeAxes} / size;


		vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
		float line = min(grid.x, grid.y);


		return 1.0 - min(line, 1.0);
	}

	   void main() {
	  float d = 1.0 - min(distance(cameraPosition.${planeAxes}, worldPosition.${planeAxes}) / uDistance, 1.0);

	  float g1 = getGrid(uSize1);
	  float g2 = getGrid(uSize2);


	  gl_FragColor = vec4(uColor.rgb, mix(g2, g1, g1) * pow(d, 3.0));
	  gl_FragColor.a = mix(0.5 * gl_FragColor.a, gl_FragColor.a, g2);

	  if ( gl_FragColor.a <= 0.0 ) discard;
   }
	`
);
extend({ GridMaterial });

type GridMaterialImpl = {
	uSize1: number,
	uSize2: number,
	uColor: ColorRepresentation,
	uDistance: number
} & JSX.IntrinsicElements['shaderMaterial']

declare global {
	namespace JSX {
		interface IntrinsicElements {
			gridMaterial: GridMaterialImpl
		}
	}
}