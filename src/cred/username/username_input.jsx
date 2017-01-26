import React from 'react';
import InputWrap from '../input_wrap';
import Icon from '../../icon/icon';

export default class UsernameInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isValid, onChange, gravatar, ...props } = this.props;
    const { focused } = this.state;

    return (
      <InputWrap
        name="username"
        isValid={isValid}
        icon={<Icon name="username" />}
        focused={focused}
      >
        <input ref="input"
          type="text"
          name="username"
          className="auth0-lock-input"
          autoCapitalize="off"
          onChange={::this.handleOnChange}
          onFocus={::this.handleFocus}
          onBlur={::this.handleBlur}
          {...props}/>
      </InputWrap>
    );
  }

  handleOnChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  handleFocus() {
    this.setState({focused: true});
  }

  handleBlur() {
    this.setState({focused: false});
  }
}

UsernameInput.propTypes = {
  autoFocus: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  isValid: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  tabIndex: React.PropTypes.number.isRequired,
  value: React.PropTypes.string
};

UsernameInput.defaultProps = {
  autoFocus: true,
  disabled: false,
  isValid: true,
  placeholder: "yourUsername",
  value: ""
};
