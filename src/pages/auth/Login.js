import React from 'react';
import Button from 'react-bulma-components/lib/components/button';
import * as Form from 'react-bulma-components/lib/components/form';
import Container from 'react-bulma-components/lib/components/container';
import Section from 'react-bulma-components/lib/components/section';
import Heading from 'react-bulma-components/lib/components/heading';
import Columns from 'react-bulma-components/lib/components/columns';
import { useForm, Controller } from 'react-hook-form';
import useRematchDispatch from '../../hooks/useRematchDispatch';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from 'helpers/authUtils';
import { toast } from 'react-toastify';

const Login = () => {
  const { handleSubmit, errors, control } = useForm();
  const onSubmit = async ({ email, password }) => {
    try {
      const resp = await login({ email, password });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const { login } = useRematchDispatch((dispatch) => ({
    login: dispatch.auth.login,
  }));
  const loading = useSelector((state) => state.loading.effects.auth.login);

  if (isAuthenticated()) return <Redirect to="/dashboard" />;

  return (
    <Section>
      <Columns centered={true}>
        <Columns.Column size={6}>
          <Container>
            <Heading>Login</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Username</Form.Label>
                  <Controller
                    as={Form.Input}
                    name="email"
                    type="email"
                    placeholder="Email"
                    defaultValue=""
                    control={control}
                    rules={{ required: true }}
                  />
                </Form.Control>
                {errors.email && <Form.Help color="danger">Please input a valid email</Form.Help>}
              </Form.Field>
              <Form.Field>
                <Form.Control>
                  <Form.Label>Password</Form.Label>
                  <Controller
                    as={Form.Input}
                    name="password"
                    type="password"
                    placeholder="Password"
                    defaultValue=""
                    control={control}
                    rules={{ required: true }}
                  />
                </Form.Control>
                {errors.password && <Form.Help color="danger">Please input a valid password</Form.Help>}
              </Form.Field>
              <Form.Control>
                <Button color="primary" type="submit" loading={loading} className="is-uppercase has-text-weight-bold">
                  Login
                </Button>
              </Form.Control>
            </form>
          </Container>
        </Columns.Column>
      </Columns>
    </Section>
  );
};

export default Login;
