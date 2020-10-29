import React from 'react';
import Level from 'react-bulma-components/lib/components/level';
import Heading from 'react-bulma-components/lib/components/heading';

const DashboardStats = () => {
  return (
    <Level>
      <Level.Item className="has-text-centered">
        <div>
          <Heading heading>Active Orders</Heading>
          <Heading>20</Heading>
        </div>
      </Level.Item>
      <Level.Item className="has-text-centered">
        <div>
          <Heading heading>Places</Heading>
          <Heading>100</Heading>
        </div>
      </Level.Item>
      <Level.Item className="has-text-centered">
        <div>
          <Heading heading>Restaurants</Heading>
          <Heading>50</Heading>
        </div>
      </Level.Item>
    </Level>
  );
};

export default DashboardStats;
