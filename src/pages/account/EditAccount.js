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

const EditAccount = () => {
  const { updateAccount } = useRematchDispatch((dispatch) => ({
    updateAccount: dispatch.auth.updateAccount,
  }));
  const loading = useSelector((state) => state.loading.effects.auth.updateAccount);
  const me = useSelector((state) => state.auth.user);

  const { handleSubmit, errors, control, setValue } = useForm();
  const onSubmit = async (params) => {
    try {
      updateAccount(params);
      toast.success('Success');
    } catch (err) {
      toast.error(err.message);
    }
  };

  React.useEffect(() => {
    if (me) {
      setValue('fullname', me?.fullname);
      setValue('phonenumber', me?.phonenumber);
      setValue('password', me?.password);
    }
  }, [me]);

  return (
    <Container>
      <Heading weight="light">Account</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <Form.Control>
            <Form.Label>Nama *</Form.Label>
            <Controller
              as={Form.Input}
              name="fullname"
              placeholder="misal: Abu Yahya"
              control={control}
              rules={{ required: true }}
            />
          </Form.Control>
          {errors.fullname && <Form.Help color="danger">Please input a valid value</Form.Help>}
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Nomor Telpon</Form.Label>
            <Controller as={Form.Input} name="phonenumber" placeholder="misal: 62812112233" control={control} />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Role</Form.Label>
            <p>{me?.role}</p>
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Email</Form.Label>
            <p>{me?.email}</p>
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Password (kosongkan jika tidak ingin merubah password)</Form.Label>
            <Controller as={Form.Input} name="password" type="password" control={control} />
          </Form.Control>
        </Form.Field>
        <Form.Control>
          <Button color="primary" type="submit" loading={loading} className="is-uppercase has-text-weight-bold">
            Update
          </Button>
        </Form.Control>
      </form>
    </Container>
  );
};

export default EditAccount;
