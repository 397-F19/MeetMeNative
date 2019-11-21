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

export async function getUserEvents(firebase, uid) {
	try {
		const db = firebase.database();
		const eventsRef = db.ref(`/data/events`);
		let eventsSnapshot = await eventsRef.once('value');
		let events = await Object.values(eventsSnapshot.val());
		let response = [];
		console.log(events);
		for (let i = 0; i < events.length; i += 1) {
			if (events[i].attendeeUID) {
				let attendees = await events[i].attendeeUID;
				for (let a = 0; a < attendees.length; a += 1) {
					if (attendees[a] === uid) {
						let usersSnapshot = await db
							.ref(`/data/users/${events[i].owner}`)
							.once('value');
						let userData = usersSnapshot.val();
						events[i].owner = userData.name;
						response.push(events[i]);
						console.log(events[i]);
					}
				}
			}
		}
		console.log(response);
		return response;
	} catch (e) {
		console.log(e);
	}
}

export async function createUser(firebase, data) {
	const db = firebase.database();
	const { uid, name, email, avatar } = data;

	const friendsRef = db.ref(`/data/users/${uid}/friends`);
	let friendsSnapshot = await friendsRef.once('value');
	let friendsList = friendsSnapshot.val();

	const eventsRef = db.ref(`/data/users/${uid}/eventsList`);
	let eventsSnapshot = await eventsRef.once('value');
	let eventsList = eventsSnapshot.val();

	let postData = {
		[uid]: {
			name: name,
			email: email,
			avatar: avatar,
			friends: friendsList || ['placeholder'],
			eventsList: eventsList || ['placeholder']
		}
	};
	let res = {
		uid,
		friendsList
	};
	var ref = db.ref('/data/users');
	await ref.update(postData);
	console.log(res);
	let friendsListString = JSON.stringify(res.friendsList);
	localStorage.setItem('friendsList', friendsListString);
	return res;
}
