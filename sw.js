this.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open('v2').then(function (cache) {
			return cache.addAll([
				'/',
				'/css/app.css',
				'/images/'
			])
		})
	)
})

this.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).catch(function () {
			return fetch(event.request).then(function (response) {
				return caches.open('v2').then(function (cache) {
					cache.put(event.request, response.clone())
					return response
				});
			});
		}).catch(function () {
			return caches.match('/')
		})
	)
})

// this.addEventListener('activate', function (event) {
// 	var cacheWhitelist = ['v2']

// 	event.waitUntil(
// 		caches.keys().then(function (keyList) {
// 			return Promise.all(keyList.map(function (key) {
// 				if (cacheWhitelist.indexOf(key) === -1) {
// 					return caches.delete(key)
// 				}
// 			}))
// 		})
// 	)
// })