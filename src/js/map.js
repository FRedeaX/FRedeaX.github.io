(function () {
  window.onload = ymaps.ready(init);
  function init() {
    let map = new ymaps.Map("map", {
      center: [55.7486, 37.5986],
      zoom: 14,
    });

    const points = [
      {
        x: 55.7572,
        y: 37.6158,
        address: "ул. Охотный ряд",
      },
      {
        x: 55.745,
        y: 37.6008,
        address: "Гоголевский бульвар",
      },
    ];

    points.forEach((point) => {
      const myPlacemark = new ymaps.Placemark(
        [point.x, point.y],
        {
          balloonContent: point.address,
        },
        {
          iconLayout: "default#image",
          iconImageHref: "img/map/choccoPoint.png",
          hideIconOnBalloonOpen: false,
          iconImageOffset: [-17, -40],
        }
      );
      map.geoObjects.add(myPlacemark);
    });
  }
})();
