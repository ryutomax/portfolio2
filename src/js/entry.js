import $ from 'jquery'
import router from './modules/Router'
import '../css/app.css'

$(() => {
  new router();

  const hoge = 'hoge'
  console.log(hoge)
})