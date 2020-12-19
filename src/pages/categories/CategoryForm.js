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

const CategoryForm = () => {
  const { id } = useParams();
  const history = useHistory();

  const { createCategory, updateCategory, getCategory } = useRematchDispatch((dispatch) => ({
    createCategory: dispatch.category.createCategory,
    updateCategory: dispatch.category.updateCategory,
    getCategory: dispatch.category.getCategory,
  }));
  const loading = useSelector(
    (state) => state.loading.effects.category.createCategory || state.loading.effects.category.updateCategory
  );
  const current = useSelector((state) => state.category.current);

  const { handleSubmit, errors, control, setValue } = useForm();
  const onSubmit = async (params) => {
    try {
      if (id) await updateCategory({ id, ...params });
      else await createCategory(params);
      toast.success('Success');
      history.replace(id ? `/categories` : `/categories`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  React.useEffect(() => {
    if (id) getCategory({ id });
  }, [id]);

  React.useEffect(() => {
    if (id && current) {
      setValue('name', current?.name);
      setValue('welcomeMessage', current?.welcomeMessage);
      setValue('keyword', current?.keyword);
    }
  }, [id, current]);

  return (
    <Container>
      <Heading weight="light">{id ? 'Edit' : 'Create'} Category</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <Form.Control>
            <Form.Label>Nama Kategori *</Form.Label>
            <Controller
              as={Form.Input}
              name="name"
              placeholder="misal: Divisi Donasi"
              control={control}
              rules={{ required: true }}
            />
          </Form.Control>
          {errors.name && <Form.Help color="danger">Please input a valid value</Form.Help>}
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Keyword / Kata Kunci *</Form.Label>
            <Controller as={Form.Input} name="keyword" placeholder="" control={control} rules={{ required: true }} />
          </Form.Control>
          <Form.Help color="dark">
            Keyword jika customer ingin memilih kategori ini. Bisa berupa angka maupun kata
          </Form.Help>
          {errors.keyword && <Form.Help color="danger">Please input a valid value</Form.Help>}
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Welcome Message</Form.Label>
            <Controller
              as={Form.Textarea}
              name="welcomeMessage"
              placeholder="misal: Selamat datang di divisi A, silahkan menunggu operator kami"
              control={control}
            />
          </Form.Control>
          <Form.Help color="dark">
            Info: Adalah pesan yg dikirimkan pertama kali setelah customer membalas dgn pilihan / keyword diatas.
            Kosongkan jika tidak ingin mengirimkan pesan sambutan.
          </Form.Help>
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

export default CategoryForm;
