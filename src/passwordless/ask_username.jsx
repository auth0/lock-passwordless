import Base from '../cred/username/ask_username';
import { requestGuardianLogin } from './actions';

export default class AskUsername extends Base {

  submitHandler() {
    return requestGuardianLogin;
  }

}
