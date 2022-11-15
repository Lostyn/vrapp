import { BufferGeometry, Color, DoubleSide, Float32BufferAttribute, Mesh, MeshBasicMaterial, Shader, ShaderMaterial, SrcColorFactor, Vector2, Vector3, Vector4 } from 'three';

class Vertice {
	pos: Vector3;

	uv: Vector2;
	uv2: Vector2;
	uv3: Vector2;
	uv4: Vector2;

	constructor(x: number, y: number, u: number, v: number) {
		this.pos = new Vector3(x, y, 0);
		this.uv = new Vector2(u, v);
	}

	setPosition(x: number, y: number) {
		this.pos.x = x;
		this.pos.y = y;
	}

	get posArray() { return [this.pos.x, this.pos.y, this.pos.z]; }
	get uvsArray(): number[] { return [this.uv.x, this.uv.y]; }
	get uvs2Array(): number[] { return [this.uv2.x, this.uv2.y]; }
	get uvs3Array(): number[] { return [this.uv3.x, this.uv3.y]; }
	get uvs4Array(): number[] { return [this.uv4.x, this.uv4.y]; }
}

class Quad extends Mesh<BufferGeometry, ShaderMaterial> {

	width: number;
	height: number;
	radius: Vector4;
	borderWidth: number;
	color: Color;

	vertices: Vertice[] = [
		new Vertice(0, 0, 0, 1),
		new Vertice(0, 0, 1, 1),
		new Vertice(0, 0, 0, 0),
		new Vertice(0, 0, 1, 0)
	]

	set Width(value: number) {
		this.width = Math.max(value, 0);
	}

	set Height(value: number) {
		this.height = Math.max(value, 0);
	}

	set BorderWidth(value: number) {
		this.borderWidth = Math.max(value, 0);
	}

	set Radius(value: Vector4) {
		this.radius.y = value.x;
		this.radius.x = value.y;
		this.radius.z = value.z;
		this.radius.w = value.w;
	}

	set Color(value: string) {
		if (value.startsWith('#'))
			value = `0x${value.slice(1)}`
		this.color.setHex(parseInt(value));
	}

	constructor(width: number, height: number) {
		const material = new ShaderMaterial({
			uniforms: {
				position: { value: new Vector3() },
				color: { value: new Color(0xffffff) },
				uv: { value: new Vector2() },
				uv2: { value: new Vector2() },
				uv3: { value: new Vector2() },
				uv4: { value: new Vector2() }
			},
			transparent: true,
			side: DoubleSide,
			vertexShader: `
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
			fragmentShader: `
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

					gl_FragColor = vec4(color, v);
				}
			`
		})
		const geometry = new BufferGeometry();
		super(geometry, material);

		this.width = width;
		this.height = height;
		this.radius = new Vector4(0, 0, 0, 0);
		this.borderWidth = 0;
		this.color = new Color(1, 1, 1);

		this.geometry.setIndex([0, 2, 1, 2, 3, 1]);
		this.updateVertex();
	}

	rebuild() {
		this.updateVertex();
	}

	private updateVertex() {
		const info = this.calculateInfo();
		this.encodeInfoIntoVertices(info);

		const w = info.width * 0.5;
		const h = info.height * 0.5;

		this.vertices[0].setPosition(-w, h);
		this.vertices[1].setPosition(w, h);
		this.vertices[2].setPosition(-w, -h);
		this.vertices[3].setPosition(w, -h);

		var positions = [];
		var uvs = [];
		var uvs2 = [];
		var uvs3 = [];
		var uvs4 = [];
		for (let i = 0; i < this.vertices.length; i++) {
			positions.push(...this.vertices[i].posArray);
			uvs.push(...this.vertices[i].uvsArray);
			uvs2.push(...this.vertices[i].uvs2Array);
			uvs3.push(...this.vertices[i].uvs3Array);
			uvs4.push(...this.vertices[i].uvs4Array);
		}

		this.geometry.attributes.position = new Float32BufferAttribute(positions, 3);
		this.geometry.attributes.uv = new Float32BufferAttribute(uvs, 2);
		this.geometry.attributes.uv2 = new Float32BufferAttribute(uvs2, 2);
		this.geometry.attributes.uv3 = new Float32BufferAttribute(uvs3, 2);
		this.geometry.attributes.uv4 = new Float32BufferAttribute(uvs4, 2);


		this.material.uniforms.color.value = this.color;
	}

	calculateInfo() {
		const minside = Math.min(this.width, this.height);
		this.radius.x = Math.min(Math.max(this.radius.x, 0), minside * 0.5);
		this.radius.y = Math.min(Math.max(this.radius.y, 0), minside * 0.5);
		this.radius.z = Math.min(Math.max(this.radius.z, 0), minside * 0.5);
		this.radius.w = Math.min(Math.max(this.radius.w, 0), minside * 0.5);

		return {
			width: this.width,
			height: this.height,
			radius: {
				x: this.radius.x / minside,
				y: this.radius.y / minside,
				z: this.radius.z / minside,
				w: this.radius.w / minside,
			},
			borderWidth: this.borderWidth / minside * 2
		};
	}

	encodeInfoIntoVertices(info) {
		let uv2 = new Vector2(info.width, info.height);
		let uv3 = new Vector2(
			this.encodeNumber_0_1_16_16(info.radius.x, info.radius.y),
			this.encodeNumber_0_1_16_16(info.radius.z, info.radius.w)
		);
		let uv4 = new Vector2(info.borderWidth, 0);

		for (let i = 0; i < this.vertices.length; i++) {
			this.vertices[i].uv2 = uv2;
			this.vertices[i].uv3 = uv3;
			this.vertices[i].uv4 = uv4;
		}
	}

	/// <summary>
	/// Encode two values between [0,1] into a single number. Each using 16 bits.
	/// </summary>
	encodeNumber_0_1_16_16(a: number, b: number): number {
		let kDecodeDot: Vector2 = new Vector2(1, 1 / 65535);
		return new Vector2(
			Math.floor(a * 65534) / 65535,
			Math.floor(b * 65534) / 65535
		).dot(kDecodeDot);
	}
}

export default Quad;