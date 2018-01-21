var ver = 'sw-timer-v2'
self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(ver).then(function (cache) {
			// cache.addAll()
			return cache.addAll([
				'./index.html',
				'./css/app.css'
			])
		})
	)
})

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (res) {
			if(res){
				return res
			}else{
				return fetch(event.request).then(function (response) {
					return caches.open(ver).then(function (cache) {
						cache.put(event.request, response.clone())
						return response
					})
				})
			}
		}).catch(function () {
			return caches.match('./index.html')
		})
	)
})

self.addEventListener('activate', function (event) {
	var cacheWhitelist = [ver]

	event.waitUntil(
		caches.keys().then(function (keyList) {
			return Promise.all(keyList.map(function (key) {
				if (cacheWhitelist.indexOf(key) === -1) {
					return caches.delete(key)
				}
			}))
		})
	)
})