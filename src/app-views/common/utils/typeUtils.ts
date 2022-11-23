import { AllSceneObject, ProceduralImageObject, SceneObject, TextObject } from '../../../types/scene';
import ProceduralImage from '../../electron-renderer/workench/components/viewport/items/proceduralImage';

export function Get3DComponentFromType(so: AllSceneObject): ({ item, children }) => JSX.Element {
	if ((so as ProceduralImageObject).image != undefined)
		return ProceduralImage;


	return null;
}