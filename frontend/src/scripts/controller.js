/**
 * Example Sift Sift. Frontend controller entry point.
 */
import { SiftController, registerSiftController } from '@redsift/sift-sdk-web';

export default class MyController extends SiftController {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
    this._suHandler = this.onStorageUpdate.bind(this);
  }

  loadView(state) {
    this.storage.subscribe(['thread'], this._suHandler);
    switch (state.type) {
      case 'email-thread':
        return {
          html: 'email-thread.html',
          data: {}
        };
      case 'summary':
        return {
          html: 'summary.html',
          data: this.getWords()
        };
      default:
        console.error('counter: unknown Sift type: ', state.type);
    }
  }

    // Event: storage update
  onStorageUpdate(value) {
    return this.getWords().then(xe => {
      // Publish events from 'x' to view
      this.publish('words', xe);
    });
  }

  getWords() {
    return this.storage.getAll({ bucket: 'positive' }).catch(console.log);
  }
}

// Do not remove. The Sift is responsible for registering its views and controllers
registerSiftController(new MyController());
