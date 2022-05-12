import $ from 'jquery'

export default class Home {
  constructor() {
    console.log('home!!')
    $.ajax({ url: '/api/contact.php' }).then(data => {
      console.log(data)
    })
  }
}

$(".js-nav__btn").click(function () {//ボタンがクリックされたら
  $(this).toggleClass('is-btn__active');//ボタン自身に activeクラスを付与し
  $(".js-nav__open").toggleClass('is-menu__open');//ナビゲーションにpanelactiveクラスを付与
});