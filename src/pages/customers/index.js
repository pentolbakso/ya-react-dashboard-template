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
import { calculateAge } from 'helpers/formatUtils';

const Customers = () => {
  const history = useHistory();
  const loading = useSelector((state) => state.loading.effects.customer.getCustomers);
  const customers = useSelector((state) => state.customer.items);
  const page = useSelector((state) => state.customer.page);
  const total = useSelector((state) => state.customer.total);
  const limit = useSelector((state) => state.customer.limit);
  const keyword = useSelector((state) => state.customer.keyword);
  const { getCustomers, deleteCustomer } = useRematchDispatch((dispatch) => ({
    getCustomers: dispatch.customer.getCustomers,
    deleteCustomer: dispatch.customer.deleteCustomer,
  }));

  const { handleSubmit, errors, control, setValue } = useForm();
  const onSearch = async ({ query }) => {
    try {
      await getCustomers({ keyword: query });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure want to delete this item?')) {
      try {
        await deleteCustomer({ id });
        toast.success('Deleted');
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  React.useEffect(() => {
    getCustomers({ keyword: '' });
  }, []);

  React.useEffect(() => {
    setValue('query', keyword);
  }, [keyword]);

  return (
    <Container>
      <Level>
        <Level.Side align="left">
          <Level.Item>
            <Heading weight="light">Customer</Heading>
          </Level.Item>
        </Level.Side>
        <Level.Side align="right">
          <Level.Item>
            <Link to={`/customers/create`}>
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
            placeholder="Search..."
            control={control}
            className="is-shadowless"
          />
        </Form.Control>
        <p style={{ marginBottom: '0.5rem' }} className="is-size-6">
          {keyword ? (
            <span>
              Menemukan {total} &rarr; untuk kata kunci <strong>{keyword}</strong>{' '}
              <a
                href="javascript:void(0)"
                onClick={() => {
                  getCustomers({ keyword: '' });
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
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Age / City</th>
            <th></th>
          </tr>
        </thead>
        {customers.map((cust) => (
          <tr>
            <td>
              <Link to={`/customers/${cust._id}`}>{cust.fullname}</Link>
            </td>
            <td>{cust.phonenumber}</td>
            <td>
              {calculateAge(cust.bornYear) || '?'} / {cust.city || '?'}
            </td>
            <td class="is-narrow">
              <ActionButton onClick={() => history.push(`/customers/${cust._id}/edit`)}>
                <FiEdit />
              </ActionButton>
              <ActionButton onClick={() => handleDelete(cust._id)}>
                <FiTrash2 />
              </ActionButton>
            </td>
          </tr>
        ))}
        {customers.length == 0 && !loading && <p>Data Not Found</p>}
      </Table>
      <Pagination
        current={page}
        total={total > 0 ? Math.ceil(total / limit) : 0}
        delta={2}
        onChange={(page) => getCustomers({ page: page })}
      />
      {loading && (
        <p>
          <Loader />
        </p>
      )}
    </Container>
  );
};

export default Customers;
