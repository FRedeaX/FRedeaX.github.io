(function () {
	ymaps.ready(init);
	function init() {
		let myMap = new ymaps.Map('map', {
			center: [55.7486, 37.5986],
			zoom: 14
		});

		const points = [
			{
				x: 55.7572,
				y: 37.6158,
				address: 'ул. Охотный ряд'
			},
			{
				x: 55.7450,
				y: 37.6008,
				address: 'Гоголевский бульвар'
			}
		]

		points.forEach(point => {
			myPlacemark = new ymaps.Placemark([point.x, point.y], {
				balloonContent: point.address
			}, {
				iconLayout: 'default#image',
				iconImageHref: 'img/map/choccoPoint.png',
				hideIconOnBalloonOpen: false,
				iconImageOffset: [-17, -40]
			}),

				myMap.geoObjects.add(myPlacemark);
		});
	}
})()