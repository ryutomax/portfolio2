import Swiper from 'swiper/swiper-bundle';
import 'swiper/swiper-bundle.css';

export default class Plugin {
  constructor() {
    console.log('Plugin!!');
  }
}

const mySwiper = new Swiper('.swiper-container', { // eslint-disable-line
  speed: 2000,
  slidesPerView: '1',
  effect: 'fade',
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  }
})