import React from 'react';
import * as l from '../../lock/index';
import { signIn } from '../../social/actions';
import { useBigButtons } from '../../social/index';

export default class SocialButton extends React.Component {
  render() {
    const { connection, disabled, lock, tabIndex, socialButtonLabel } = this.props;

    let className = "auth0-lock-social-button";
    if (useBigButtons(lock)) className += " auth0-lock-social-big-button";

    return (
      <button
        className={className}
        data-provider={connection.strategy}
        disabled={disabled}
        onClick={::this.handleClick}
        tabIndex={l.tabIndex(lock, tabIndex)}
        type="button"
      >
        <div className="auth0-lock-social-button-icon" />
        <div className="auth0-lock-social-button-text">
          {socialButtonLabel}
        </div>
      </button>
    );
  }

  handleClick() {
    const { lock, connection } = this.props;
    signIn(l.id(lock), connection);
  }
}

SocialButton.propTypes = {
  lock: React.PropTypes.object.isRequired,
  connection: React.PropTypes.object.isRequired,
  disabled: React.PropTypes.bool.isRequired,
  tabIndex: React.PropTypes.number,
  socialButtonLabel: React.PropTypes.string
};

SocialButton.defaultProps = {
  disabled: false,
  tabIndex: 1
};
