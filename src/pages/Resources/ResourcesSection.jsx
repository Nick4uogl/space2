import ResourceCard from './ResourceCard';

const filterResourcesByQuery = (array, query) => {
  return array?.filter((resource) =>
    resource.source_name.toLowerCase().includes(query.toLowerCase()),
  );
};

const ResourcesSection = ({
  resources,
  title,
  query,
  subscribedResources,
  subscriptionStatus,
}) => {
  return (
    <div className="main-resources__section">
      <div className="main-resources__line">
        {title}
        <span></span>
      </div>
      <div className="main-resources__list">
        {filterResourcesByQuery(resources, query)?.map((resource) => {
          const isSubscribed = subscribedResources?.find(
            (subResource) => subResource?.id === resource?.id,
          );
          return (
            <ResourceCard
              key={resource?.id}
              resource={resource}
              isSubscribed={isSubscribed}
              subscriptionStatus={subscriptionStatus}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ResourcesSection;
