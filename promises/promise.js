var asyncAdd = (a, b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if(typeof a === 'number' && typeof b === 'number') {
				resolve(a+b);
			} else {
				reject('Arguments must be numbers');
			}
		}, 1500 );
	});
};

asyncAdd(5,6).then((res) => {
	console.log('result: ', res);
	return asyncAdd(res, 33);
}).then((res) => {
	console.log('should be something:', res);
}).catch((errorMessage) => {
	console.log(errorMessage);
});

/* asyncAdd(5,'6').then((res) => {
	console.log('result: ', res);
	return asyncAdd(res, 33);
}, (errorMessage) => {
	console.log(errorMessage);
}).then((res) => {
	console.log('should be something:', res);
}, (errorMessage) => {
	console.log(errorMessage);
}); */

/* var somePromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('Hey.. It worked!');
		reject('not working');
	}, 2555 );
});

somePromise.then ((message) => {
	console.log('Success: ',message);
	}, (errorMessage) => {
		console.log('Error: ',errorMessage);
	}); */