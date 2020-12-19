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
import dayjs from 'dayjs';

const ExpandableLink = ({ name, content, timestamp }) => {
  const [toggle, setToggle] = React.useState(false);
  return (
    <div>
      <a onClick={() => setToggle(!toggle)}>{name}</a>
      {toggle && (
        <>
          <div style={{ marginTop: 10 }}>
            <pre>{content}</pre>
          </div>
          <div className="is-size-7 has-text-right has-text-grey">
            Terakhir diupdate: {dayjs(timestamp).format('DD-MMM HH:mm')}
          </div>
        </>
      )}
    </div>
  );
};

const Templates = () => {
  const history = useHistory();
  const loading = useSelector((state) => state.loading.effects.template.getTemplates);
  const templates = useSelector((state) => state.template.items);
  const page = useSelector((state) => state.template.page);
  const total = useSelector((state) => state.template.total);
  const limit = useSelector((state) => state.template.limit);
  const keyword = useSelector((state) => state.template.keyword);
  const { getTemplates, toggleEnabled, deleteTemplate } = useRematchDispatch((dispatch) => ({
    getTemplates: dispatch.template.getTemplates,
    toggleEnabled: dispatch.template.toggleEnabled,
    deleteTemplate: dispatch.template.deleteTemplate,
  }));

  const { handleSubmit, errors, control, setValue } = useForm();
  const onSearch = async ({ query }) => {
    try {
      await getTemplates({ keyword: query });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure want to delete this item?')) {
      try {
        await deleteTemplate({ id });
        toast.success('Deleted');
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  React.useEffect(() => {
    getTemplates({ keyword: '' });
  }, []);

  React.useEffect(() => {
    setValue('query', keyword);
  }, [keyword]);

  return (
    <Container>
      <Level>
        <Level.Side align="left">
          <Level.Item>
            <Heading weight="light">Templates</Heading>
          </Level.Item>
        </Level.Side>
        <Level.Side align="right">
          <Level.Item>
            <Link to={`/templates/create`}>
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
                  getTemplates({ keyword: '' });
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
        {templates.map((tmp) => (
          <tr>
            <td>
              {/* <Link to={`/templates/${tmp._id}`}>{tmp.name}</Link> */}
              <ExpandableLink name={tmp.name} content={tmp.text} timestamp={tmp.updatedAt} />
            </td>
            <td class="is-narrow">
              <ActionButton onClick={() => toggleEnabled({ id: tmp._id, enabled: !tmp.enabled })}>
                <ToggleInput active={tmp.enabled} />
              </ActionButton>
              <ActionButton onClick={() => history.push(`/templates/${tmp._id}/edit`)}>
                <FiEdit />
              </ActionButton>
              <ActionButton onClick={() => handleDelete(tmp._id)}>
                <FiTrash2 />
              </ActionButton>
            </td>
          </tr>
        ))}
        {templates.length == 0 && !loading && <p>Data Not Found</p>}
      </Table>
      <Pagination
        current={page}
        total={total > 0 ? Math.ceil(total / limit) : 0}
        delta={2}
        onChange={(page) => getTemplates({ page: page })}
      />
      {loading && (
        <p>
          <Loader />
        </p>
      )}
    </Container>
  );
};

export default Templates;
