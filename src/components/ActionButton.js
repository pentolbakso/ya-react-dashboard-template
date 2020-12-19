import React from 'react';
import Button from 'react-bulma-components/lib/components/button';
import Icon from 'react-bulma-components/lib/components/icon';

// small buttons for Edit/Delete/etc
const ActionButton = ({ children, onClick }) => (
  <Button text style={{ height: '1.5em', padding: '0.75em' }} onClick={onClick}>
    <Icon>{children}</Icon>
  </Button>
);

export default ActionButton;
