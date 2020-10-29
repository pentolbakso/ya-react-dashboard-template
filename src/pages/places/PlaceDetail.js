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

const PlaceDetail = () => {
  const { id } = useParams();
  const history = useHistory();

  const { getPlace, deletePlace } = useRematchDispatch((dispatch) => ({
    getPlace: dispatch.place.getPlace,
    deletePlace: dispatch.place.deletePlace,
  }));
  const current = useSelector((state) => state.place.current);
  const loading = useSelector((state) => state.loading.effects.getPlace);

  React.useEffect(() => {
    if (id) getPlace({ id });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure want to delete this item?')) {
      try {
        await deletePlace({ id });
        toast.success('Deleted');
        history.replace(`/places`);
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
            <Heading>{current?.name}</Heading>
          </Level.Item>
        </Level.Side>
        <Level.Side align="right">
          <Level.Item>
            <Link to={`/places/${current?._id}/edit`}>
              <Button text>Edit</Button>
            </Link>
            <Button text className="has-text-danger" onClick={handleDelete}>
              Delete
            </Button>
          </Level.Item>
        </Level.Side>
      </Level>
      <List>
        <ListMeta label="Description" value={current?.description} />
        <ListMeta label="Address" value={current?.address} />
        <ListMeta label="Created At" value={dayjs(current?.createdAt).toString()} />
        <ListMeta label="Updated At" value={dayjs(current?.updatedAt).toString()} />
      </List>
    </Container>
  );
};

export default PlaceDetail;
