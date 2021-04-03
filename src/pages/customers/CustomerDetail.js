import React, { useMemo } from 'react';
import Container from 'react-bulma-components/lib/components/container';
import Loader from 'react-bulma-components/lib/components/loader';
import Heading from 'react-bulma-components/lib/components/heading';
import Button from 'react-bulma-components/lib/components/button';
import Level from 'react-bulma-components/lib/components/level';
import useRematchDispatch from '../../hooks/useRematchDispatch';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import List from 'react-bulma-components/lib/components/list';
import ListMeta from 'components/ListMeta';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { calculateAge } from 'helpers/formatUtils';

const CustomerDetail = () => {
  const { id } = useParams();
  const history = useHistory();

  const { getCustomer, deleteCustomer } = useRematchDispatch((dispatch) => ({
    getCustomer: dispatch.customer.getCustomer,
    deleteCustomer: dispatch.customer.deleteCustomer,
  }));
  const customers = useSelector((state) => state.customer.items);
  const loading = useSelector((state) => state.loading.effects.getCustomer);
  const current = useMemo(() => customers.find((it) => it._id == id), [customers]);

  React.useEffect(() => {
    if (id) getCustomer({ id });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure want to delete this item?')) {
      try {
        await deleteCustomer({ id });
        toast.success('Deleted');
        history.replace(`/customers`);
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
            <Link to={`/customers/${current?._id}/edit`}>
              <Button text>Edit</Button>
            </Link>
            <Button text className="has-text-danger" onClick={handleDelete}>
              Delete
            </Button>
          </Level.Item>
        </Level.Side>
      </Level>
      <List>
        <ListMeta label="Phonenumber" value={current?.phonenumber} />
        <ListMeta label="Age" value={calculateAge(current?.bornYear)} />
        <ListMeta label="Gender" value={current?.gender} />
        <ListMeta label="City" value={current?.city} />
        <ListMeta label="Job" value={current?.job} />
        <ListMeta label="Education" value={current?.education} />
        <ListMeta label="Tags" value={current?.tags} />
        <ListMeta label="Notes" value={current?.notes} />
        <ListMeta label="Created At" value={dayjs(current?.createdAt).toString()} />
        <ListMeta label="Updated At" value={dayjs(current?.updatedAt).toString()} />
      </List>
    </Container>
  );
};

export default CustomerDetail;
