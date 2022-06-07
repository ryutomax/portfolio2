import $ from 'jquery'

export default class Anime {
  constructor() {
    console.log('Anime!!');
  }
}

// =========================
// ハンバーガーメニュー
// =========================
$(".js-nav__btn").click(function () {
  $(this).toggleClass('is-btn__active');                //ボタン自身に activeクラスを付与し
  $(".js-nav__open").toggleClass('is-menu__open');      //ナビゲーションにクラスを付与
  $(".js-blackOut").toggleClass('is-black');            //背景をブラックアウト

  $(".js-menuTxt").toggleClass('is-slideIn__menu');     //テキストスライドイン
  $(".js-navIcon").toggleClass('is-fadeIn');            //Iconスライドイン
});

//背景クリックでclose
$(".js-blackOut").click(function () {
  $(this).removeClass('is-black');
  $(".js-nav__btn").removeClass('is-btn__active');
  $(".js-nav__open").removeClass('is-menu__open');

  $(".js-menuTxt").removeClass('is-slideIn__menu');
  $(".js-navIcon").removeClass('is-fadeIn');
});

// =========================
// スライドショー
// =========================
// function slider(){
//   const current = $('.js-slider.is-current'),
//   next = current.is(':last-child') ?
//   $('.js-slider').first() : current.next();
//   next.addClass('is-current');
//   current.removeClass('is-current');
// }
// setInterval(slider, 5000);

// =========================
// tab切り替え
// =========================
$('.js-tab').click(function() {
  //1.インデックス取得
  const target = $('.js-tab').index(this);
  //2.コンテンツ非表示
  $('.js-tabCont').addClass('is-tabHidden');
  //3.コンテンツ表示
  $('.js-tabCont').eq(target).removeClass('is-tabHidden');


  //tab テキストアニメ
  $('.js-tabTxt').addClass('is-fadeIn');
  $('.js-tabTxt-delay').addClass('is-fadeIn-delay');

  //tab imgアニメ
  $('.js-tabImg').addClass('is-slideIn__tab');

  //tabのアニメ
  $('.js-tab').addClass('is-tabActive');
  $('.js-tab').not(this).removeClass('is-tabActive');

});

// =========================
// スクロールアニメーション
// =========================
function slideInAnime(){

  $('.js-fadeIn').each(function(){
      const elemPos = $(this).offset().top + 100;//要素より100px下
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight){
          $(this).addClass('is-fadeIn');
      } else {
          // $(this).removeClass('is-fadeIn_shadow');// 画面外に出たらfadeInというクラス名を外す
      }
  });

  $('.js-tabTxt-delay').each(function(){
    const elemPos = $(this).offset().top + 100;//要素より100px下
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
        $(this).addClass('is-fadeIn-delay');
    }
  });

  $('.js-slideIn').each(function(){
    const elemPos = $(this).offset().top + 100;//要素より100px下
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
        $(this).addClass('is-slideIn ');
    }
  });
}
// スクロール
  $(window).scroll(() => { slideInAnime();});

// ロード
  $(window).on('load', () => { slideInAnime();});