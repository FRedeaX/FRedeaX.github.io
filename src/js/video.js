(function () {
  const progressControl = document.querySelector(".progress__value"),
    soundControl = document.querySelector(".sound__value");
  let video, intervalId, soundValue;
  document.addEventListener("DOMContentLoaded", () => {
    const videoWrapper = document.querySelector(".video__wrapper");

    video = document.querySelector(".video__player");

    progressControl.addEventListener("mousedown", () => {
      //обнуляем значения, что бы произвести вычисления
      progressControl.value = 0;
      progressControl.max = 100;
    });

    videoWrapper.addEventListener("click", (event) => {
      const target = event.target;
      // кнопки play
      if (
        target.classList.contains("video__player") ||
        target.classList.contains("play")
      ) {
        playStop();
      }
      // input продолжительности видео
      else if (target.classList.contains("progress__value")) {
        setProgressControl();
      }

      // кнопка громкости
      else if (target.classList.contains("sound__mute")) {
        soundMute();
      }
      // input громкости видео
      else if (target.classList.contains("sound__value")) {
        setSoundControl();
      }
    });
  });
  function playStop() {
    document
      .querySelector(".video__play")
      .classList.toggle("video__play--disabled");
    document
      .querySelector(".progress__play")
      .classList.toggle("progress__play--active");

    if (video.paused) {
      if (progressControl.max === "")
        // если видео запущено с начала
        progressControl.max = video.duration;

      video.play();
      intervalId = setInterval(updateProgressControl, 1000);
    } else {
      video.pause();
      clearInterval(intervalId);
    }
  }
  function updateProgressControl() {
    progressControl.value = video.currentTime;
  }
  function setProgressControl() {
    let progress = video.duration;
    progressControl.max = video.duration;

    // input.max по умолчанию равен 100 поэтому после клика по нему мы имеем
    // n-% от 100%, теперь находим этот же % в нашем видео
    progressControl.value = (progress * progressControl.value) / 100;
    video.currentTime = progressControl.value;
    // console.log(progressControl.value);
  }
  function soundMute() {
    if (video.volume === 0) {
      video.volume = soundValue;
      soundControl.value = soundValue * 10;
    } else {
      soundValue = video.volume;
      video.volume = 0;
      soundControl.value = 0;
    }
  }
  function setSoundControl() {
    video.volume = soundControl.value / 10;
  }
})();
