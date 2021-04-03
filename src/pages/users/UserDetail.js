import React, { useMemo } from 'react';
import Container from 'react-bulma-components/lib/components/container';
import Loader from 'react-bulma-components/lib/components/loader';
import Heading from 'react-bulma-components/lib/components/heading';
import Button from 'react-bulma-components/lib/components/button';
import Level from 'react-bulma-components/lib/components/level';
import useRematchDispatch from '../../hooks/useRematchDispatch';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import List from 'react-bulma-components/lib/components/list';
import ListMeta from 'components/ListMeta';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserDetail = () => {
  const { id } = useParams();
  const history = useHistory();

  const { getUser, deleteUser } = useRematchDispatch((dispatch) => ({
    getUser: dispatch.user.getUser,
    deleteUser: dispatch.user.deleteUser,
  }));
  const users = useSelector((state) => state.user.items);
  const loading = useSelector((state) => state.loading.effects.getUser);
  const current = useMemo(() => users.find((it) => it._id == id), [users]);

  React.useEffect(() => {
    if (id) getUser({ id });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure want to delete this item?')) {
      try {
        await deleteUser({ id });
        toast.success('Deleted');
        history.replace(`/users`);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <Container>
      <Level>
        <Level.Side align="left">
          <Level.Item>
            <Heading weight="light">{current?.fullname}</Heading>
          </Level.Item>
        </Level.Side>
        <Level.Side align="right">
          <Level.Item>
            <Link to={`/users/${current?._id}/edit`}>
              <Button text>Edit</Button>
            </Link>
            <Button text className="has-text-danger" onClick={handleDelete}>
              Delete
            </Button>
          </Level.Item>
        </Level.Side>
      </Level>
      <List>
        <ListMeta label="Role" value={current?.role} />
        <ListMeta label="Email" value={current?.email} />
        <ListMeta label="Phonenumber" value={current?.phonenumber} />
        <ListMeta label="Active" value={current?.enabled ? 'Yes' : 'No'} />
        <ListMeta label="Created At" value={dayjs(current?.createdAt).toString()} />
        <ListMeta label="Updated At" value={dayjs(current?.updatedAt).toString()} />
      </List>
    </Container>
  );
};

export default UserDetail;
