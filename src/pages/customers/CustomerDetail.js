import React from 'react';
import Container from 'react-bulma-components/lib/components/container';
import Loader from 'react-bulma-components/lib/components/loader';
import Heading from 'react-bulma-components/lib/components/heading';
import Button from 'react-bulma-components/lib/components/button';
import Level from 'react-bulma-components/lib/components/level';
import useRematchDispatch from '../../hooks/useRematchDispatch';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import List from 'react-bulma-components/lib/components/list';
import ListMeta from 'components/ListMeta';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { calculateAge } from 'helpers/formatUtils';

const CustomerDetail = () => {
  const { id } = useParams();
  const history = useHistory();

  const { getCustomer, deleteCustomer } = useRematchDispatch((dispatch) => ({
    getCustomer: dispatch.customer.getCustomer,
    deleteCustomer: dispatch.customer.deleteCustomer,
  }));
  const current = useSelector((state) => state.customer.current);
  const loading = useSelector((state) => state.loading.effects.getCustomer);

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
        <ListMeta label="Nomor telpon" value={current?.phonenumber} />
        <ListMeta label="Umur" value={calculateAge(current?.bornYear)} />
        <ListMeta label="Jenis kelamin" value={current?.gender} />
        <ListMeta label="Kota domisili" value={current?.city} />
        <ListMeta label="Pekerjaan" value={current?.job} />
        <ListMeta label="Pendidikan terakhir" value={current?.education} />
        <ListMeta label="Tags" value={current?.tags} />
        <ListMeta label="Notes" value={current?.notes} />
        <ListMeta label="Created At" value={dayjs(current?.createdAt).toString()} />
        <ListMeta label="Updated At" value={dayjs(current?.updatedAt).toString()} />
      </List>
    </Container>
  );
};

export default CustomerDetail;
