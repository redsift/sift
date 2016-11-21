/**
 * Example Sift Sift. Frontend view entry point.
 */
import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';

export default class MyView extends SiftView {
  constructor() {
  // You have to call the super() method to initialize the base class.
    super();
    this.controller.subscribe('score', this.onScore.bind(this));
  }

  presentView(value) {
    console.log('counter: presentView: ', value);
    this.onScore(value.data);
  }

  willPresentView(value) {
    console.log('counter: willPresentView: ', value);
  }

  onScore(data) {
    document.getElementById('score').textContent = data;
  }
}

registerSiftView(new MyView(window));
