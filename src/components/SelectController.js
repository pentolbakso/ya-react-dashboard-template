import React from 'react';
import { Controller } from 'react-hook-form';
import * as Form from 'react-bulma-components/lib/components/form';

const SelectController = ({ name, control, defaultValue, options }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ onChange, onBlur, value, name, ref }) => (
        <Form.Select name={name} onChange={onChange} onBlur={onBlur} value={value} className="is-fullwidth">
          {options.map((opt, n) => (
            <option value={opt.value} key={n}>
              {opt.label || opt.value}
            </option>
          ))}
        </Form.Select>
      )}
    />
  );
};

export default SelectController;
