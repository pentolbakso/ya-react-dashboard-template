import React, { useMemo } from 'react';
import Button from 'react-bulma-components/lib/components/button';
import * as Form from 'react-bulma-components/lib/components/form';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import { useForm, Controller } from 'react-hook-form';
import useRematchDispatch from '../../hooks/useRematchDispatch';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import SelectController from 'components/SelectController';

const roles = [
  {
    label: 'Operator',
    value: 'operator',
  },
  {
    label: 'Manager',
    value: 'manager',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
];

const UserForm = () => {
  const { id } = useParams();
  const history = useHistory();

  const { createUser, updateUser, getUser } = useRematchDispatch((dispatch) => ({
    createUser: dispatch.user.createUser,
    updateUser: dispatch.user.updateUser,
    getUser: dispatch.user.getUser,
  }));
  const users = useSelector((state) => state.user.items);
  const loading = useSelector(
    (state) => state.loading.effects.user.createUser || state.loading.effects.user.updateUser
  );
  const current = useMemo(() => users.find((it) => it._id == id), [users]);

  const { handleSubmit, errors, control, setValue } = useForm();
  const onSubmit = async (params) => {
    try {
      if (id) await updateUser({ id, ...params });
      else await createUser(params);
      toast.success('Success');
      history.replace(id ? `/users/${id}` : `/users`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  React.useEffect(() => {
    if (id) getUser({ id });
  }, [id]);

  React.useEffect(() => {
    if (id && current) {
      setValue('fullname', current?.fullname);
      setValue('role', current?.role);
      setValue('phonenumber', current?.phonenumber);
      setValue('email', current?.email);
      setValue('password', current?.password);
    }
  }, [id, current]);

  return (
    <Container>
      <Heading weight="light">{id ? 'Edit' : 'Create'} User</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <Form.Control>
            <Form.Label>Fullname *</Form.Label>
            <Controller
              as={Form.Input}
              name="fullname"
              placeholder="eg: Abu Fulan"
              control={control}
              rules={{ required: true }}
            />
          </Form.Control>
          {errors.fullname && <Form.Help color="danger">Please input a valid value</Form.Help>}
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Role *</Form.Label>
            <SelectController name="role" control={control} defaultValue="operator" options={roles} />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Phonenumber</Form.Label>
            <Controller as={Form.Input} name="phonenumber" placeholder="eg: 62812112233" control={control} />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Email (for login) *</Form.Label>
            <Controller
              as={Form.Input}
              name="email"
              placeholder="fulan@gmail.com"
              control={control}
              rules={{ required: true }}
            />
          </Form.Control>
          {errors.email && <Form.Help color="danger">Please input a valid value</Form.Help>}
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Password {id ? '(fill blank if you dont want to change the password)' : '*'}</Form.Label>
            <Controller
              as={Form.Input}
              name="password"
              type="password"
              control={control}
              rules={{ required: !id }}
              autoComplete="new-password"
            />
          </Form.Control>
          {errors.password && <Form.Help color="danger">Please input a valid value</Form.Help>}
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

export default UserForm;
