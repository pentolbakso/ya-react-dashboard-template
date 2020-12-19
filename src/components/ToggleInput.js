import React from 'react';
// import Icon from 'react-bulma-components/lib/components/icon';
import { FiToggleLeft, FiToggleRight } from 'react-icons/fi';

const ToggleInput = ({ active, onClick }) => {
  return <>{active ? <FiToggleRight color="#00cc00" /> : <FiToggleLeft color="#cc0000" />}</>;
};

export default ToggleInput;
