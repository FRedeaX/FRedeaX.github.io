(function () {
  // if (!window.ymaps) return;
  loadScript().then(function () {
    window.ymaps.ready(init);
  });

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

  function loadScript() {
    const src =
      "https://api-maps.yandex.ru/2.1/?apikey=76dd679b-d43f-4800-b744-f749eb0b34aa&lang=ru_RU";
    return new Promise((resolve, reject) => {
      if (window.ymaps) {
        return resolve();
      }
      let script = document.createElement("script");
      script.src = src;
      script.addEventListener("load", function () {
        resolve();
      });
      script.addEventListener("error", function (e) {
        reject(e);
      });
      document.body.appendChild(script);
    });
  }
})();
