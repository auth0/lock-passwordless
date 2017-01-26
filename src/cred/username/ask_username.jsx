import React from 'react';
import Screen from '../../lock/screen';
import UsernamePane from './username_pane';

export default class AskUsername extends Screen {

  constructor() {
    super("username");
  }

  render({lock}) {
    return (
      <UsernamePane
        lock={lock}
        placeholder={this.t(lock, ["usernameInputPlaceholder"], {__textOnly: true})}
      />
    );
  }

}
