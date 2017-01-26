import { Mode } from '../index';
import AskUsername from '../../passwordless/ask_username';

export default class Guardian extends Mode {

  constructor() {
    super("guardian");
  }

  willOpen(model, options) {
    options.mode.send = "username";
    this.setOptions(options);
    this.setModel(model.set("forceRedirect", !options.popup));
  }

  render(lock) {
    return new AskUsername(lock);
  }

}
