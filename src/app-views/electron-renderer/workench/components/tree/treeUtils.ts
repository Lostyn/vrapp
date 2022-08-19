export type TreeSourceData = {
	instanceID: string,
	parent: string
}

export type TreeData = {
	instanceID: string,
	parent: string
	children: TreeData[]
}

export function prepareData(datas: TreeSourceData[]): TreeData[] {
	return populate(null, datas);
}

function populate(item: { instanceID: string } | null, source) {
	var parent = item == null ? '' : item.instanceID;

	var result = source.filter(s => s.parent == parent);
	for (var r of result) {
		r.children = populate(r, source);
	}

	return source.filter(s => s.parent == parent);
}