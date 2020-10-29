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
import Columns from 'react-bulma-components/lib/components/columns';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { InView } from 'react-intersection-observer';
import Loader from 'react-bulma-components/lib/components/loader';

const Places = () => {
  const loading = useSelector(
    (state) => state.loading.effects.place.getPlaces || state.loading.effects.place.getMorePlaces
  );
  const places = useSelector((state) => state.place.items);
  const total = useSelector((state) => state.place.total);
  const hasMore = useSelector((state) => state.place.hasMore);
  const keyword = useSelector((state) => state.place.keyword);
  const { getPlaces, getMorePlaces } = useRematchDispatch((dispatch) => ({
    getPlaces: dispatch.place.getPlaces,
    getMorePlaces: dispatch.place.getMorePlaces,
  }));

  const loadMore = () => {
    console.log('loadMore');
    getMorePlaces({});
  };

  const { handleSubmit, errors, control, setValue } = useForm();
  const onSearch = async ({ query }) => {
    try {
      console.log('search', query);
      await getPlaces({ keyword: query });
    } catch (err) {
      toast.error(err.message);
    }
  };

  React.useEffect(() => {
    getPlaces({});
  }, []);

  React.useEffect(() => {
    setValue('query', keyword);
  }, [keyword]);

  return (
    <Container>
      <Level>
        <Level.Side align="left">
          <Level.Item>
            <Heading>Places</Heading>
          </Level.Item>
        </Level.Side>
        <Level.Side align="right">
          <Level.Item>
            <Link to={`/places/create`}>
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
            placeholder="Search place name..."
            control={control}
            className="is-shadowless"
          />
        </Form.Control>
        <p style={{ marginBottom: '0.5rem' }} className="is-size-6">
          {total} results
          {keyword ? (
            <span>
              &rarr; search for <strong>{keyword}</strong>{' '}
              <a
                href="javascript:void(0)"
                onClick={() => {
                  getPlaces({ keyword: '' });
                }}
              >
                (reset)
              </a>
            </span>
          ) : null}
        </p>
      </form>
      <List>
        {places.map((place) => (
          <List.Item key={place._id}>
            <Columns breakpoint="mobile">
              <Columns.Column>
                <div>
                  <p className="is-size-5">
                    <Link to={`/places/${place._id}`}>{place.name}</Link>
                  </p>
                  <p className="is-size-7 text-muted">{place.address}</p>
                </div>
              </Columns.Column>
              <Columns.Column narrow>
                <Link to={`/places/${place._id}/edit`}>
                  <Button text>Edit</Button>
                </Link>
              </Columns.Column>
            </Columns>
          </List.Item>
        ))}
        {places.length == 0 && !loading && <List.Item>Data Not Found</List.Item>}
      </List>
      {loading && (
        <p>
          <Loader />
        </p>
      )}
      {hasMore && (
        <InView
          as="div"
          onChange={(inView, entry) => {
            if (inView) loadMore();
          }}
        />
      )}
    </Container>
  );
};

export default Places;
