import Swiper from 'swiper';
// import Swiper styles
import 'swiper/swiper-bundle.css';

export default class Plugin {
  constructor() {
    console.log('home!!');
  }
}

const mySwiper = new Swiper('.swiper-container', { // eslint-disable-line
  speed: 7000,
  // slidesPerView: 'auto',
  slidesPerView: 3,   //小数点停止？スライド見切れ
  loop: true,
  autoplay: {
      delay: 0,
      disableOnInteraction: false,
      stopOnLastSlide: false,
  },
})

mySwiper();