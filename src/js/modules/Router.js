import Home from '../pages/Home'
import About from '../pages/About'
import Anime from '../pages/Anime'
import Plugin from '../pages/Plugin'

export default class Router {
  constructor() {
    this.model = {
      pathName: location.pathname,
    }

    this.initRouting();
  }

  initRouting() {
    const pathName = this.model.pathName
    switch (pathName) {
      case '/':
        new Home();
        new Anime();
        new Plugin();
        break
      case '/about':
        new About();
        break
      default:
        break
    }
  }
}