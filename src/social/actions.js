import { getEntity, read, swap, updateEntity } from '../store/index';
import { closeLock } from '../lock/actions';
import WebAPI from '../lock/web_api';
import * as l from '../lock/index';

export function close(id, force = false) {
  const lock = read(getEntity, "lock", id);
  if (l.ui.closable(lock) || force) {
    closeLock(id);
  }
}

export function signIn(id, connection) {
  swap(updateEntity, "lock", id, l.setSubmitting, true);

  const lock = read(getEntity, "lock", id);

  const options = {
    connection: connection,
    popup: l.ui.popup(lock),
    popupOptions: l.ui.popupOptions(lock),
    redirect: !l.ui.popup(lock),
    responseType: l.login.responseType(lock),
    callbackURL: l.login.callbackURL(lock),
    forceJSONP: l.login.forceJSONP(lock)
    // sso: false
  };
  WebAPI.signIn(id, options,  (error, ...args) => {
    if (error) {
      setTimeout(() => signInError(id, error), 250);
    } else {
      signInSuccess(id, ...args);
    }
  });
}

function signInSuccess(id, ...args) {
  const lock = read(getEntity, "lock", id);
  const autoclose = l.ui.autoclose(lock);

  if (!autoclose) {
    swap(updateEntity, "lock", id, lock => l.setSignedIn(l.setSubmitting(lock, false), true));
    l.invokeDoneCallback(lock, null, ...args);
  } else {
    closeLock(id, m => m, lock => l.invokeDoneCallback(lock, null, ...args));
  }
}

function signInError(id, error) {
  const lock = read(getEntity, "lock", id);
  const errorMessage = l.ui.t(lock, ["error", "signIn", error.error], {__textOnly: true}) || l.ui.t(lock, ["error", "signIn", "lock.request"], {__textOnly: true});
  swap(updateEntity, "lock", id, l.setSubmitting, false, errorMessage);

  l.invokeDoneCallback(lock, error);
}