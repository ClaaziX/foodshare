import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import { Accounts, STATES } from 'meteor/std:accounts-ui';

class login extends Accounts.ui.LoginForm {
  fields() {
    const { formState } = this.state;
    if (formState == STATES.SIGN_UP) {
      return {
        firstname: {
          id: 'firstname',
          hint: 'Enter firstname',
          label: 'firstname',
          onChange: this.handleChange.bind(this, 'firstname')
        },
        ...super.fields()
      };
    }
    return super.fields();
  }

  signUp(options = {}) {
    const { firstname = null } = this.state;
    if (firstname !== null) {
      options.profile = Object.assign(options.profile || {}, {
        firstname: firstname
      });
    }
    super.signUp(options);
  }
};
export default login;