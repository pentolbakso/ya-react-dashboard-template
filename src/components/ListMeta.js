import React from 'react';
import Heading from 'react-bulma-components/lib/components/heading';
import List from 'react-bulma-components/lib/components/list';

const ListMeta = ({ label, value }) => {
  return (
    <List.Item>
      <Heading heading>{label}</Heading>
      <p>{value || <span className="has-text-grey-light">n/a</span>}</p>
    </List.Item>
  );
};

export default ListMeta;
