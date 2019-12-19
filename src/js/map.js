(function() {    
    ymaps.ready(init);
    function init () {
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


    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');
            myMap.balloon.open(coords, {
                contentHeader:'Событие!',
                contentBody:'<p>Кто-то щелкнул по карте.</p>' +
                '<p>Координаты щелчка: ' + [
                    coords[0].toPrecision(6),
                    coords[1].toPrecision(6)
                ].join(', ') + '</p>',
                contentFooter:'<sup>Щелкните еще раз</sup>'
            });
        }
        else {
            myMap.balloon.close();
        }
    });
    
    // Обработка события, возникающего при щелчке
    // правой кнопки мыши в любой точке карты.
    // При возникновении такого события покажем всплывающую подсказку
    // в точке щелчка.
    myMap.events.add('contextmenu', function (e) {
        myMap.hint.open(e.get('coords'), 'Кто-то щелкнул правой кнопкой');
    });
    
    // Скрываем хинт при открытии балуна.
    myMap.events.add('balloonopen', function (e) {
        myMap.hint.close();
    });
    }
})()