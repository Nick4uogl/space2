import { useState } from 'react';

import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

import { ReactComponent as ArrowRight } from '../../assets/img/icons/arrowRight.svg';
import {
  useVoteResourceMutation,
  useUnVoteResourceMutation,
} from '../../redux/resources/resourcesApiSlice';

function ResourceCard({ resource, isSubscribed, subscriptionStatus }) {
  const [vote, setVote] = useState(true);
  const [voteResource, voteResourceResponse] = useVoteResourceMutation();
  const [unVoteResource, unVoteResourceResponse] = useUnVoteResourceMutation();

  const handleVote = async () => {
    try {
      if (vote) {
        await voteResource(resource.id);
        setVote(false);
      } else {
        await unVoteResource(resource.id);
        setVote(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={resource?.id} className="resource-resources">
      <div className="resource-resources__container">
        <div className="resource-resources__image">
          <img
            src={`data:image/png;base64, ${resource?.image}`}
            alt={`${resource?.source_name}`}
          />
          {!resource.is_currently_available && (
            <div className="resource-resources__label resource-resources__label--upcoming">
              Upcoming
            </div>
          )}
          {isSubscribed && (
            <div className="resource-resources__label resource-resources__label--subscribed">
              Subscribed
            </div>
          )}
          {resource.is_public && (
            <div className="resource-resources__label resource-resources__label--free">
              Free
            </div>
          )}
        </div>
        <div className="resource-resources__info">
          <h2 className="resource-resources__title">{resource?.source_name}</h2>
          <p className="resource-resources__text">{resource?.description}</p>
          <div className="resource-resources__date">Expires: 01 May, 2024</div>
        </div>
        <div className="resource-resources__bottom">
          <Link
            to={`/resource-detail/${resource.id}`}
            className="resource-resources__more"
          >
            Learn more
            <ArrowRight />
          </Link>
          {!resource.is_currently_available && (
            <button
              className="resource-resources__open-link resource-resources__open-link--vote"
              onClick={handleVote}
            >
              {voteResourceResponse?.isLoading ||
              unVoteResourceResponse?.isLoading ? (
                <CircularProgress
                  size={20}
                  sx={{
                    color: '#121212',
                  }}
                />
              ) : vote ? (
                'Vote'
              ) : (
                'Unvote'
              )}
            </button>
          )}
          {!resource.is_public &&
            resource.is_currently_available &&
            !isSubscribed && (
              <Link
                to={`${
                  subscriptionStatus === 'active'
                    ? `/subscription/manage-subscription?resourceId=${resource?.id}`
                    : `/pricing-calculator?resourceId=${resource?.id}`
                }`}
                className="resource-resources__open-link resource-resources__open-link--subscribe"
              >
                Subscribe
              </Link>
            )}
          {(resource.is_public || isSubscribed) &&
            resource.is_currently_available && (
              <Link
                to={`/subscription/${resource?.id}`}
                className="resource-resources__open-link resource-resources__open-link--open"
              >
                Open
              </Link>
            )}
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;
