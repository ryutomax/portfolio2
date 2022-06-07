import $ from 'jquery'
import router from './modules/Router'
import '../css/app.css'

$(() => {
  new router();

  console.log("entry")
})