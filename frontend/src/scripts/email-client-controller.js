/**
 * Happy Sift. Email client controller entry point.
 */
import { EmailClientController, registerEmailClientController } from '@redsift/sift-sdk-web';

export default class MyEmailClientController extends EmailClientController {
  constructor() {
    super();
  }

  loadThreadListView (score) {
    const emotion = score
      ? score > 0 ? 'happy' : 'sad'
      : 'unknown'
    ;
    
    return {
      template: '003_list_common_img',
      value: {
        image: {
          url: `assets/${emotion}.png`
        },
        subtitle: score
      }
    };
  };
}

// Do not remove. The Sift is responsible for registering its views and controllers
registerEmailClientController(new MyEmailClientController());
