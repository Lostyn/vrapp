import { AllSceneObject } from '../../../types/scene';

const _registry: [string, (any) => JSX.Element, (any) => JSX.Element][] = [];

export function register3DComponent(requiredProps: string, component3D: (any) => JSX.Element, propertyDrawer: (any) => JSX.Element) {
	_registry.push([requiredProps, component3D, propertyDrawer])
}

export function Get3DComponentFromType(so: AllSceneObject): ({ item, children }) => JSX.Element {
	const entry = _registry.find(args => so[args[0]] != undefined);

	if (entry == null) {
		console.error('No registery found for 3DComponent', so);
	}

	return entry[1];
}

export function GetObjectPropertiesDrawer(so: AllSceneObject): (any) => JSX.Element {
	const entry = _registry.find(args => so[args[0]] != undefined);

	if (entry == null) {
		console.error('No registery found for PropertyDrawer', so);
	}

	return entry[2];
}
