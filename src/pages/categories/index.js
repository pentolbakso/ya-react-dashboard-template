import React from 'react';
import Container from 'react-bulma-components/lib/components/container';
import Heading from 'react-bulma-components/lib/components/heading';
import Level from 'react-bulma-components/lib/components/level';
import Button from 'react-bulma-components/lib/components/button';
import { useSelector } from 'react-redux';
import useRematchDispatch from 'hooks/useRematchDispatch';
import { Link, useHistory } from 'react-router-dom';
// import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loader from 'react-bulma-components/lib/components/loader';
import Table from 'react-bulma-components/lib/components/table';
import Pagination from 'react-bulma-components/lib/components/pagination';
import Content from 'react-bulma-components/lib/components/content';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import ToggleInput from 'components/ToggleInput';
import ActionButton from 'components/ActionButton';

const Users = () => {
  const history = useHistory();
  const loading = useSelector((state) => state.loading.effects.category.getCategories);
  const categories = useSelector((state) => state.category.items);
  const page = useSelector((state) => state.category.page);
  const total = useSelector((state) => state.category.total);
  const limit = useSelector((state) => state.category.limit);
  // const keyword = useSelector((state) => state.category.keyword);
  const { getCategories, toggleEnabled, deleteCategory } = useRematchDispatch((dispatch) => ({
    getCategories: dispatch.category.getCategories,
    toggleEnabled: dispatch.category.toggleEnabled,
    deleteCategory: dispatch.category.deleteCategory,
  }));

  React.useEffect(() => {
    getCategories({ keyword: '' });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure want to delete this item?')) {
      try {
        await deleteCategory({ id });
        toast.success('Deleted');
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <Container>
      <Level>
        <Level.Side align="left">
          <Level.Item>
            <Heading weight="light">Categories</Heading>
          </Level.Item>
        </Level.Side>
        <Level.Side align="right">
          <Level.Item>
            <Link to={`/categories/create`}>
              <Button color="primary">Create</Button>
            </Link>
          </Level.Item>
        </Level.Side>
      </Level>
      <Table bordered>
        <thead>
          <tr>
            <th>Keyword</th>
            <th>Nama</th>
            <th>Welcome Message</th>
            <th></th>
          </tr>
        </thead>
        {categories.map((cat) => (
          <tr>
            <td>{cat.keyword}</td>
            <td>{cat.name}</td>
            <td>
              <Content className="has-text-weight-light">
                {cat.welcomeMessage || <em className="has-text-grey-light">n/a</em>}
              </Content>
            </td>
            <td class="is-narrow">
              <ActionButton onClick={() => toggleEnabled({ id: cat._id, enabled: !cat.enabled })}>
                <ToggleInput active={cat.enabled} />
              </ActionButton>
              <ActionButton onClick={() => history.push(`/categories/${cat._id}/edit`)}>
                <FiEdit />
              </ActionButton>
              <ActionButton onClick={() => handleDelete(cat._id)}>
                <FiTrash2 />
              </ActionButton>
            </td>
          </tr>
        ))}
        {categories.length == 0 && !loading && <p>Data Not Found</p>}
      </Table>
      <Pagination
        current={page}
        total={total > 0 ? Math.ceil(total / limit) : 0}
        delta={2}
        onChange={(page) => getCategories({ page: page })}
      />
      {loading && (
        <p>
          <Loader />
        </p>
      )}
    </Container>
  );
};

export default Users;
