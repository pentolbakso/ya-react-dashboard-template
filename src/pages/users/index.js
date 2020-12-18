import React from 'react';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import List from 'react-bulma-components/lib/components/list';
import Level from 'react-bulma-components/lib/components/level';
import Button from 'react-bulma-components/lib/components/button';
import * as Form from 'react-bulma-components/lib/components/form';
import { useSelector } from 'react-redux';
import useRematchDispatch from 'hooks/useRematchDispatch';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loader from 'react-bulma-components/lib/components/loader';
import Table from 'react-bulma-components/lib/components/table';
import Pagination from 'react-bulma-components/lib/components/pagination';

const Users = () => {
  const loading = useSelector(
    (state) => state.loading.effects.user.getUsers || state.loading.effects.user.getMoreUsers
  );
  const users = useSelector((state) => state.user.items);
  const page = useSelector((state) => state.user.page);
  const total = useSelector((state) => state.user.total);
  const limit = useSelector((state) => state.user.limit);
  const keyword = useSelector((state) => state.user.keyword);
  const { getUsers } = useRematchDispatch((dispatch) => ({
    getUsers: dispatch.user.getUsers,
  }));

  const { handleSubmit, errors, control, setValue } = useForm();
  const onSearch = async ({ query }) => {
    try {
      await getUsers({ keyword: query });
    } catch (err) {
      toast.error(err.message);
    }
  };

  React.useEffect(() => {
    getUsers({ keyword: '' });
  }, []);

  React.useEffect(() => {
    setValue('query', keyword);
  }, [keyword]);

  return (
    <Container>
      <Level>
        <Level.Side align="left">
          <Level.Item>
            <Heading weight="light">Users</Heading>
          </Level.Item>
        </Level.Side>
        <Level.Side align="right">
          <Level.Item>
            <Link to={`/users/create`}>
              <Button color="primary">Create</Button>
            </Link>
          </Level.Item>
        </Level.Side>
      </Level>
      <form onSubmit={handleSubmit(onSearch)}>
        <Form.Control style={{ marginBottom: '1rem' }}>
          <Controller as={Form.Input} name="query" placeholder="Cari..." control={control} className="is-shadowless" />
        </Form.Control>
        <p style={{ marginBottom: '0.5rem' }} className="is-size-6">
          {keyword ? (
            <span>
              Menemukan {total} &rarr; untuk kata kunci <strong>{keyword}</strong>{' '}
              <a
                href="javascript:void(0)"
                onClick={() => {
                  getUsers({ keyword: '' });
                }}
              >
                (reset)
              </a>
            </span>
          ) : (
            <span>Total: {total} </span>
          )}
        </p>
      </form>
      <Table bordered>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Nomor Telepon</th>
            <th>Role</th>
            <th>Aktif</th>
            <th></th>
          </tr>
        </thead>
        {users.map((user) => (
          <tr>
            <td>
              <Link to={`/users/${user._id}`}>{user.fullname}</Link>
            </td>
            <td>{user.email}</td>
            <td>{user.phonenumber}</td>
            <td>{user.role}</td>
            <td>{user.enabled ? 'Ya' : 'Tidak'}</td>
            <td>
              <Link to={`/users/${user._id}/edit`}>Edit</Link>
            </td>
          </tr>
        ))}
        {users.length == 0 && !loading && <List.Item>Data Not Found</List.Item>}
      </Table>
      <Pagination
        current={page}
        total={total > 0 ? Math.floor(total / limit + 1) : 0}
        delta={2}
        onChange={(page) => getUsers({ page: page })}
      />
      {loading && (
        <p>
          <Loader />
        </p>
      )}
    </Container>
  );
};

export default Users;
