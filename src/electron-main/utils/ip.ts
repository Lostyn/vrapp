import os from 'os';

export function address() {
	const interfaces = os.networkInterfaces();

	const all = Object.keys(interfaces).map((nic) => {
		const addresses = interfaces[nic].filter(details => {
			if (details.family !== 'IPv4')
				return false;

			return true;
		})
		return addresses.length ? addresses[0].address : undefined;
	}).filter(Boolean);

	return !all.length ? undefined : all[0];
}