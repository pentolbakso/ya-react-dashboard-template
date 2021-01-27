import React from 'react';
import Button from 'react-bulma-components/lib/components/button';
import * as Form from 'react-bulma-components/lib/components/form';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import { useForm, Controller } from 'react-hook-form';
import useRematchDispatch from '../../hooks/useRematchDispatch';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';
import SelectController from 'components/SelectController';

const genders = [
  {
    label: 'Unspecified',
    value: '',
  },
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
];

const CustomerForm = () => {
  const { id } = useParams();
  const history = useHistory();

  const { createCustomer, updateCustomer, getCustomer } = useRematchDispatch((dispatch) => ({
    createCustomer: dispatch.customer.createCustomer,
    updateCustomer: dispatch.customer.updateCustomer,
    getCustomer: dispatch.customer.getCustomer,
  }));
  const loading = useSelector(
    (state) => state.loading.effects.customer.createCustomer || state.loading.effects.customer.updateCustomer
  );
  const current = useSelector((state) => state.customer.current);

  const { handleSubmit, errors, control, setValue } = useForm();
  const onSubmit = async (params) => {
    try {
      if (id) await updateCustomer({ id, ...params });
      else await createCustomer(params);
      toast.success('Success');
      history.replace(id ? `/customers/${id}` : `/customers`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  React.useEffect(() => {
    if (id) getCustomer({ id });
  }, [id]);

  React.useEffect(() => {
    if (id && current) {
      setValue('fullname', current?.fullname);
      setValue('phonenumber', current?.phonenumber);
      setValue('gender', current?.gender);
      setValue('city', current?.city);
      setValue('job', current?.job);
      setValue('education', current?.education);
      setValue('bornYear', current?.bornYear);
      setValue('notes', current?.notes);
    }
  }, [id, current]);

  return (
    <Container>
      <Heading weight="light">{id ? 'Edit' : 'Create'} Customer</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <Form.Control>
            <Form.Label>Fullname *</Form.Label>
            <Controller as={Form.Input} name="fullname" placeholder="" control={control} rules={{ required: true }} />
          </Form.Control>
          {errors.fullname && <Form.Help color="danger">Please input a valid value</Form.Help>}
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Phonenumber *</Form.Label>
            <Controller
              as={Form.Input}
              name="phonenumber"
              placeholder=""
              control={control}
              rules={{ required: true }}
            />
          </Form.Control>
          {errors.phonenumber && <Form.Help color="danger">Please input a valid value</Form.Help>}
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Gender</Form.Label>
            <SelectController name="gender" control={control} defaultValue="" options={genders} />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>City</Form.Label>
            <Controller as={Form.Input} name="city" placeholder="" control={control} />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Job</Form.Label>
            <Controller as={Form.Input} name="job" placeholder="" control={control} />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Education</Form.Label>
            <Controller as={Form.Input} name="education" placeholder="" control={control} />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Born Year</Form.Label>
            <Controller as={Form.Input} name="bornYear" placeholder="" control={control} />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Notes</Form.Label>
            <Controller as={Form.Textarea} name="notes" placeholder="Optional" control={control} />
          </Form.Control>
        </Form.Field>
        <Form.Control>
          <Button color="primary" type="submit" loading={loading} className="is-uppercase has-text-weight-bold">
            {id ? 'Update' : 'Create'}
          </Button>
        </Form.Control>
      </form>
    </Container>
  );
};

export default CustomerForm;
