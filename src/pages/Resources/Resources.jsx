import { useState } from 'react';

import { CircularProgress } from '@mui/material';

import ResourcesSection from './ResourcesSection';
import ResourcesSidebar from './ResourcesSidebar';
import ResourcesTop from './ResourcesTop';
import Header from '../../components/Header/Header';
import { useGetResourcesQuery } from '../../redux/resources/resourcesApiSlice';
import { useGetSubscriptionQuery } from '../../redux/subscriptions/subscriptionsApiSlice';

import './resources.scss';

const filterResources = (resources, filterOptions) => {
  const selectedTypes = [];
  if (filterOptions.isDiseases) selectedTypes.push('Diseases');
  if (filterOptions.isAnimals) selectedTypes.push('Animals');
  if (filterOptions.isPlants) selectedTypes.push('Plants');

  if (selectedTypes.length === 0) return resources;

  return resources.filter((resource) => selectedTypes.includes(resource.type));
};

function Resources() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [availability, setAvailability] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    isDiseases: false,
    isAnimals: false,
    isPlants: false,
  });

  //api
  const resourcesResponse = useGetResourcesQuery();
  const subscriptionResponse = useGetSubscriptionQuery();
  const subscribedResources = subscriptionResponse?.data?.resources;
  const subscriptionStatus = subscriptionResponse?.data?.status;
  const resourcesResponseData = resourcesResponse?.data;

  console.log('resources', resourcesResponseData);
  console.log('subscription', subscriptionResponse);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilterOptions({
      ...filterOptions,
      [name]: checked,
    });
  };

  const handleSearchQuery = (e) => setSearchQuery(e.target.value);
  const handleSortByOption = (value) => setSelectedOption(value);

  const handleAvailability = (availability) => {
    setAvailability(availability);
  };

  const myResources = filterResources(resourcesResponseData?.my, filterOptions);
  const freeResources = filterResources(
    resourcesResponseData?.free,
    filterOptions,
  );
  const otherResources = filterResources(
    resourcesResponseData?.other,
    filterOptions,
  );
  const paidResources = filterResources(
    resourcesResponseData?.paid,
    filterOptions,
  );
  const upcomingResources = filterResources(
    resourcesResponseData?.upcoming,
    filterOptions,
  );

  console.log('subscriptionStatus', subscriptionStatus);

  const availabilityComponents = {
    All: (
      <>
        <ResourcesSection
          resources={myResources}
          title={'MY RESOURCES'}
          query={searchQuery}
          subscribedResources={subscribedResources}
        />
        <ResourcesSection
          resources={otherResources}
          title={'OTHER RESOURCES'}
          query={searchQuery}
          subscriptionStatus={subscriptionStatus}
        />
        <ResourcesSection
          resources={upcomingResources}
          title={'UPCOMING RESOURCES'}
          query={searchQuery}
        />
      </>
    ),
    Free: (
      <ResourcesSection
        resources={freeResources}
        title={'FREE RESOURCES'}
        query={searchQuery}
      />
    ),
    Paid: (
      <ResourcesSection
        resources={paidResources}
        title={'PAID RESOURCES'}
        query={searchQuery}
        subscriprionStatus={subscriptionStatus}
      />
    ),
    Upcoming: (
      <ResourcesSection
        resources={upcomingResources}
        title={'UPCOMING RESOURCES'}
        query={searchQuery}
      />
    ),
  };

  return (
    <div className="resources-page">
      <Header className="resources-page__header" />
      <div className="resources-page__container">
        {resourcesResponse?.isLoading ? (
          <CircularProgress
            size={55}
            sx={{
              color: '#51CE7B',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginLeft: '-22.5px',
            }}
          />
        ) : (
          <>
            <ResourcesSidebar
              {...{
                availability,
                handleAvailability,
                filterOptions,
                handleCheckboxChange,
              }}
            />
            <div className="resources-page__main main-resources">
              <div className="main-resources__container">
                <ResourcesTop
                  {...{
                    searchQuery,
                    selectedOption,
                    handleSearchQuery,
                    handleSortByOption,
                  }}
                />
                <div className="main-resources__lists">
                  {availabilityComponents[availability]}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Resources;
