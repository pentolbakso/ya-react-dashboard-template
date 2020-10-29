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

const PlaceForm = () => {
  const { id } = useParams();
  const history = useHistory();

  const { createPlace, updatePlace, getPlace } = useRematchDispatch((dispatch) => ({
    createPlace: dispatch.place.createPlace,
    updatePlace: dispatch.place.updatePlace,
    getPlace: dispatch.place.getPlace,
  }));
  const loading = useSelector(
    (state) => state.loading.effects.place.createPlace || state.loading.effects.place.updatePlace
  );
  const current = useSelector((state) => state.place.current);

  const { handleSubmit, errors, control, setValue } = useForm();
  const onSubmit = async ({ name, description, address }) => {
    try {
      if (id) await updatePlace({ id, name, description, address });
      else await createPlace({ name, description, address });
      toast.success('Success');
      history.replace(id ? `/places/${id}` : `/places`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  React.useEffect(() => {
    if (id) getPlace({ id });
  }, [id]);

  React.useEffect(() => {
    if (id && current) {
      setValue('name', current?.name);
      setValue('description', current?.description);
      setValue('address', current?.address);
    }
  }, [id, current]);

  return (
    <Container>
      <Heading>{id ? 'Edit' : 'Create'} Place</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <Form.Control>
            <Form.Label>Name</Form.Label>
            <Controller
              as={Form.Input}
              name="name"
              placeholder="Place Name"
              control={control}
              rules={{ required: true }}
            />
          </Form.Control>
          {errors.name && <Form.Help color="danger">Please input a valid name</Form.Help>}
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Description (optional)</Form.Label>
            <Controller as={Form.Textarea} name="description" placeholder="" control={control} />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Address</Form.Label>
            <Controller
              as={Form.Input}
              name="address"
              placeholder="eg: Elm Street 13th"
              control={control}
              rules={{ required: true }}
            />
          </Form.Control>
          {errors.address && <Form.Help color="danger">Please input a valid address</Form.Help>}
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

export default PlaceForm;
