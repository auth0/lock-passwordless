import { swap, updateEntity } from '../../store/index';
import * as c from '../index';

export function changeUsername(id, username) {
  swap(updateEntity, "lock", id, c.setUsername, username);
}
