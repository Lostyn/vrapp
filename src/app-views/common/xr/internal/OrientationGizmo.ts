import { setMaxListeners } from 'gulp';
import { Camera, Color, Matrix4, Vector3 } from 'three';
import { $, append } from '../../core/dom';
import { OrbitControls } from '../controls/orbitControls';


const size: number = 100;

class OrientationGizmo {
	parent: HTMLElement;
	domElement: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	axes;
	camera: Camera;
	invRotMat = new Matrix4();
	center = new Vector3(size / 2, size / 2, 0)

	constructor(orbitControls: OrbitControls, parent: HTMLElement) {
		this.parent = parent;

		this.domElement = this.createCanvas();
		this.axes = this.createAxes();

		this.camera = orbitControls.object;

		orbitControls.addEventListener('change', this.update);
		this.update();
	}

	createCanvas() {
		const canvas: HTMLCanvasElement = append(this.parent, $('canvas#orientation-gizmo'));
		canvas.width = size;
		canvas.height = size;
		canvas.style.position = 'absolute';
		canvas.style.top = '0';
		canvas.style.right = '0';

		this.ctx = canvas.getContext("2d");
		return canvas;
	}

	createAxes() {
		return [
			{ axis: "x", direction: new Vector3(0.6, 0, 0), color: "#f73c3c", size: 8, label: "X", position: new Vector3(0, 0, 0) },
			{ axis: "y", direction: new Vector3(0, 0.6, 0), color: "#6ccb26", size: 8, label: "Y", position: new Vector3(0, 0, 0) },
			{ axis: "z", direction: new Vector3(0, 0, 0.6), color: "#174cf0", size: 8, label: "Z", position: new Vector3(0, 0, 0) }
		]
	}

	update = () => {
		this.invRotMat.extractRotation(this.camera.matrix).invert();

		for (let i = 0; i < this.axes.length; i++) {
			this.setAxisPosition(this.axes[i], this.invRotMat);
		}

		this.axes.sort((a, b) => (a.position.z > b.position.z) ? 1 : -1);
		this.drawLayer();
	}

	setAxisPosition(axis, invRotMat) {
		const position = axis.direction.clone().applyMatrix4(invRotMat)

		const size = axis.size;
		axis.position.set(
			(position.x * (this.center.x - (size / 2))) + this.center.x,
			this.center.y - (position.y * (this.center.y - (size / 2))),
			position.z
		);
	}

	drawLayer() {
		this.ctx.clearRect(0, 0, this.domElement.width, this.domElement.height);

		// this.drawCircle(this.center, 40, '#343434');
		for (let i = 0; i < this.axes.length; i++) {
			const axis = this.axes[i];
			this.drawLine(this.center, axis.position, axis.line, axis.color);
			this.drawCircle(axis.position, axis.size, axis.color);

			this.ctx.font = 'bold 8px arial';
			this.ctx.fillStyle = 'white';
			this.ctx.textBaseline = 'middle';
			this.ctx.textAlign = 'center';
			this.ctx.fillText(axis.label, axis.position.x, axis.position.y);
		}
	}

	drawLine(p1, p2, width, color) {
		this.ctx.beginPath();
		this.ctx.moveTo(p1.x, p1.y);
		this.ctx.lineTo(p2.x, p2.y);
		this.ctx.lineWidth = width;
		this.ctx.strokeStyle = color;
		this.ctx.stroke();
		this.ctx.closePath();
	}

	drawCircle(p, radius = 10, color = "#FF0000") {
		this.ctx.beginPath();
		this.ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI, false);
		this.ctx.fillStyle = color;
		this.ctx.fill();
		this.ctx.closePath();
	}
}

export default OrientationGizmo;