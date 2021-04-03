import React from 'react';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import Level from 'react-bulma-components/lib/components/level';
import Button from 'react-bulma-components/lib/components/button';
import * as Form from 'react-bulma-components/lib/components/form';
import { useSelector } from 'react-redux';
import useRematchDispatch from 'hooks/useRematchDispatch';
import { Link, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loader from 'react-bulma-components/lib/components/loader';
import Table from 'react-bulma-components/lib/components/table';
import Pagination from 'react-bulma-components/lib/components/pagination';
import ActionButton from 'components/ActionButton';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import ToggleInput from 'components/ToggleInput';

const Users = () => {
  const history = useHistory();
  const loading = useSelector((state) => state.loading.effects.user.getUsers);
  const users = useSelector((state) => state.user.items);
  const page = useSelector((state) => state.user.page);
  const total = useSelector((state) => state.user.total);
  const limit = useSelector((state) => state.user.limit);
  const keyword = useSelector((state) => state.user.keyword);
  const { getUsers, toggleEnabled, deleteUser } = useRematchDispatch((dispatch) => ({
    getUsers: dispatch.user.getUsers,
    toggleEnabled: dispatch.user.toggleEnabled,
    deleteUser: dispatch.user.deleteUser,
  }));

  const { handleSubmit, errors, control, setValue } = useForm();
  const onSearch = async ({ query }) => {
    try {
      await getUsers({ keyword: query });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure want to delete this item?')) {
      try {
        await deleteUser({ id });
        toast.success('Deleted');
      } catch (err) {
        toast.error(err.message);
      }
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
          <Controller
            as={Form.Input}
            name="query"
            placeholder="Search..."
            control={control}
            className="is-shadowless"
          />
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
            <th style={{ width: '1%', whiteSpace: 'nowrap' }}>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phonenumber</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        {users.map((user, idx) => (
          <tr>
            <td>{(page - 1) * limit + idx + 1}</td>
            <td>
              <Link to={`/users/${user._id}`}>{user.fullname}</Link>
            </td>
            <td>{user.email}</td>
            <td>{user.phonenumber}</td>
            <td>{user.role}</td>
            <td class="is-narrow">
              <ActionButton onClick={() => toggleEnabled({ id: user._id, enabled: !user.enabled })}>
                <ToggleInput active={user.enabled} />
              </ActionButton>
              <ActionButton onClick={() => history.push(`/users/${user._id}/edit`)}>
                <FiEdit />
              </ActionButton>
              <ActionButton onClick={() => handleDelete(user._id)}>
                <FiTrash2 />
              </ActionButton>
            </td>
          </tr>
        ))}
        {users.length == 0 && !loading && <p>Data Not Found</p>}
      </Table>
      <Pagination
        current={page}
        total={total > 0 ? Math.ceil(total / limit) : 0}
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
