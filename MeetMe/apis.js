import axios from 'axios';
var client = require('./client');

export async function signin(firebase) {
	const auth = firebase.auth();
	const googleAuthProvider = await new firebase.auth.GoogleAuthProvider();
	let success = true;

	const data = await auth.signInWithPopup(googleAuthProvider).catch(error => {
		console.log(error);
		success = false;
	});
	const res = {
		success,
		data
	};
	return res;
}

export async function getRequest(route) {
	const res = await client.get(route);
	if (res.status !== 200) {
		throw Error(res.message);
	}
	return res.data;
}

export async function postRequest(route, data = null) {
	if (!data) {
		throw Error('Cannot send post request without data');
	} else {
		const res = await client.post(route, data);

		if (res.status !== 200) {
			throw Error(res.message);
		}
		return res.data;
	}
}
