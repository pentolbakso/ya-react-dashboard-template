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
import SelectController from 'components/SelectController';

const TemplateForm = () => {
  const { id } = useParams();
  const history = useHistory();

  const { createTemplate, updateTemplate, getTemplate } = useRematchDispatch((dispatch) => ({
    createTemplate: dispatch.template.createTemplate,
    updateTemplate: dispatch.template.updateTemplate,
    getTemplate: dispatch.template.getTemplate,
  }));
  const loading = useSelector(
    (state) => state.loading.effects.template.createTemplate || state.loading.effects.template.updateTemplate
  );
  const current = useSelector((state) => state.template.current);

  const { handleSubmit, errors, control, setValue } = useForm();
  const onSubmit = async (params) => {
    try {
      if (id) await updateTemplate({ id, ...params });
      else await createTemplate(params);
      toast.success('Success');
      history.replace(id ? `/templates` : `/templates`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  React.useEffect(() => {
    if (id) getTemplate({ id });
  }, [id]);

  React.useEffect(() => {
    if (id && current) {
      setValue('name', current?.name);
      setValue('text', current?.text);
      setValue('notes', current?.notes);
    }
  }, [id, current]);

  return (
    <Container>
      <Heading weight="light">{id ? 'Edit' : 'Create'} Template</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <Form.Control>
            <Form.Label>Nama Template *</Form.Label>
            <Controller
              as={Form.Input}
              name="name"
              placeholder="misal: Terima kasih untuk donasi"
              control={control}
              rules={{ required: true }}
            />
          </Form.Control>
          {errors.name && <Form.Help color="danger">Please input a valid value</Form.Help>}
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Text *</Form.Label>
            <Controller as={Form.Textarea} name="text" placeholder="" control={control} rules={{ required: true }} />
          </Form.Control>
          {errors.text && <Form.Help color="danger">Please input a valid value</Form.Help>}
        </Form.Field>
        <Form.Field>
          <Form.Control>
            <Form.Label>Catatan</Form.Label>
            <Controller
              as={Form.Input}
              name="notes"
              placeholder="misal: jgn lupa diedit no rekeningnya!"
              control={control}
            />
          </Form.Control>
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

export default TemplateForm;
