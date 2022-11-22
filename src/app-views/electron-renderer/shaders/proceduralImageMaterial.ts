import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { Color, Vector2, Vector3 } from 'three';

const ProceduralImageMaterial = shaderMaterial(
	{
		position: new Vector3(),
		color: new Color(),
		uv: new Vector2(),
		uv2: new Vector2(),
		uv3: new Vector2(),
		uv4: new Vector2(),
	},
	`
		precision highp float;

		attribute vec2 uv2;
		attribute vec2 uv3;
		attribute vec2 uv4;

		varying vec3 baseColor;
		varying vec2 texCoords;
		varying vec2 wh;
		varying vec4 radius;
		varying float lineWeight;
		varying float pixelWorldScale;


		vec2 decode2(float value) {
			vec2 kEncodeMul = vec2(1.0, 65535.0);
			float kEncodeBit = 1.0 / 65535.0;
			vec2 enc = kEncodeMul * value;
			enc = fract(enc);
			enc.x -= enc.y * kEncodeBit;
			return enc;
		}

		void main() {
			wh = uv2;
			texCoords = vec2(uv.x, uv.y);

			float minside = min(uv2.x, uv2.y);
			radius = vec4(decode2(uv3.x), decode2(uv3.y)) * minside;

			lineWeight = uv4.x * minside / 2.0;
			pixelWorldScale = uv4.y;

			gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
		}
	`,
	`
		precision highp float;


		uniform vec3 color;
		varying vec2 texCoords;
		varying vec2 wh;
		varying vec4 radius;
		varying float lineWeight;
		varying float pixelWorldScale;


		const float kSmooth = 0.003125;

		float remap(float value, float low1, float high1, float low2, float high2) {
			return low2 + (value - low1) * (high2 - low2) / (high1 - low1);
		}

		float born(float value) {
			if (value > 0.0) return 1.0;
			return 0.0;
		}

		bool any4(vec4 x) {
			int i;
			for (i = 0; i < 4; ++i) {
				if (x[i] > 0.0)
					return true;
			}
			return false;
		}

		float visible(vec2 pos, vec4 r, vec2 wh) {
			vec4 p = vec4(pos, wh.x - pos.x, wh.y - pos.y);
			float v = min(min(min(p.x, p.y), p.z), p.w);

			vec4 b = vec4(
				(p.x < r[0] && p.w < r[0]),
				(p.z < r[1] && p.w < r[1]),
				(p.z < r[2] && p.y < r[2]),
				(p.x < r[3] && p.y < r[3])
			);

			vec4 bv = vec4(
				born(b.x),
				born(b.y),
				born(b.z),
				born(b.w)
			);

			vec4 vis = vec4(
				remap(r.x-length(p.xw-r[0]), .0, kSmooth, .0, 1.0),
				remap(r.y-length(p.zw-r[1]), .0, kSmooth, .0, 1.0),
				remap(r.z-length(p.zy-r[2]), .0, kSmooth, .0, 1.0),
				remap(r.w-length(p.xy-r[3]), .0, kSmooth, .0, 1.0)
			);
			v = remap(v, .0, kSmooth, .1, 1.0);

			vec4 foo = vec4(
				min(bv.x * max(vis.x, 0.0), v) + (1.0-bv.x) * v,
				min(bv.y * max(vis.y, 0.0), v) + (1.0-bv.y) * v,
				min(bv.z * max(vis.z, 0.0), v) + (1.0-bv.z) * v,
				min(bv.w * max(vis.w, 0.0), v) + (1.0-bv.w) * v
			);

			float bvv = any4(b) ? 1.0: .0;
			v = bvv * min(min(min(foo.x, foo.y), foo.z), foo.w) + v * (1.0-bvv);

			return v;
		}

		void main(void) {
			float v = visible(texCoords * wh, radius, wh);

			float l = lineWeight;
			if (lineWeight > 0.0) {
				v *= clamp( (l - distance(v,l)), 0.0, 1.0);
			}

			// gl_FragColor = vec4(radius.x, 0, 0, 1);
			gl_FragColor = vec4(color, v);
		}
	`
)

extend({ ProceduralImageMaterial })

type ProceduralImageMaterialImpl = {
	// position: Vector3,
	color: Color,
	// uv: Vector2,
	// uv2: Vector2,
	// uv3: Vector2,
	// uv4: Vector2
} & JSX.IntrinsicElements['shaderMaterial'];

declare global {
	namespace JSX {
		interface IntrinsicElements {
			proceduralImageMaterial: ProceduralImageMaterialImpl
		}
	}
}