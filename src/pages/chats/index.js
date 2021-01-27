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

const Chats = () => {
  const history = useHistory();
  const loading = useSelector((state) => state.loading.effects.chat.getChats);
  const chats = useSelector((state) => state.chat.items);
  const page = useSelector((state) => state.chat.page);
  const total = useSelector((state) => state.chat.total);
  const limit = useSelector((state) => state.chat.limit);
  const keyword = useSelector((state) => state.chat.keyword);
  const { getChats, deleteChat } = useRematchDispatch((dispatch) => ({
    getChats: dispatch.chat.getChats,
    deleteChat: dispatch.chat.deleteChat,
  }));

  const { handleSubmit, errors, control, setValue } = useForm();
  const onSearch = async ({ query }) => {
    try {
      await getChats({ keyword: query });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure want to delete this item?')) {
      try {
        await deleteChat({ id });
        toast.success('Deleted');
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  React.useEffect(() => {
    getChats({ keyword: '' });
  }, []);

  React.useEffect(() => {
    setValue('query', keyword);
  }, [keyword]);

  return (
    <Container>
      <Level>
        <Level.Side align="left">
          <Level.Item>
            <Heading weight="light">Chats</Heading>
          </Level.Item>
        </Level.Side>
      </Level>
      {/* <form onSubmit={handleSubmit(onSearch)}>
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
                  getChats({ keyword: '' });
                }}
              >
                (reset)
              </a>
            </span>
          ) : (
            <span>Total: {total} </span>
          )}
        </p>
      </form> */}
      <Table bordered>
        <thead>
          <tr>
            <th>Status</th>
            <th>Kategori</th>
            <th>Customer</th>
            <th>Operator</th>
            <th>Awal Chat</th>
            <th></th>
          </tr>
        </thead>
        {chats.map((cht) => (
          <tr>
            <td className={`is-uppercase ${cht.state == 'open' ? 'has-text-success' : ''}`}>
              <span className="has-text-weight-medium">{cht.state}</span>
            </td>
            <td>{cht.category?.name}</td>
            <td>
              <Link to={`/customers/${cht.customer?._id}`}>
                <span className="has-text-weight-medium">{cht.customer?.fullname || '?'}</span>
              </Link>
              <br />
              <span className="has-text-grey-light">{cht.customer?.phonenumber}</span>
            </td>
            <td>{cht.operator?.fullname}</td>
            <td>{dayjs(cht.createdAt).format('DD/MMM/YY HH:mm')}</td>
            <td class="is-narrow">
              {/* <ActionButton onClick={() => history.push(`/chats/${cht._id}/edit`)}>
                <FiEdit />
              </ActionButton> */}
              <ActionButton onClick={() => handleDelete(cht._id)}>
                <FiTrash2 />
              </ActionButton>
            </td>
          </tr>
        ))}
        {chats.length == 0 && !loading && <p>Data Not Found</p>}
      </Table>
      <Pagination
        current={page}
        total={total > 0 ? Math.ceil(total / limit) : 0}
        delta={2}
        onChange={(page) => getChats({ page: page })}
      />
      {loading && (
        <p>
          <Loader />
        </p>
      )}
    </Container>
  );
};

export default Chats;
