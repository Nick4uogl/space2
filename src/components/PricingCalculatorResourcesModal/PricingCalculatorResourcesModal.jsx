import { useEffect, useState } from 'react';

import { Modal } from '@mui/material';

import { ReactComponent as CloseIcon } from '../../assets/img/icons/close.svg';
import { ReactComponent as SearchIcon } from '../../assets/img/icons/Search.svg';
import Resource_sample from '../../assets/img/resource-sample.png';
import './pricingCalculatorResourcesModal.scss';

const testResources = [
  {
    id: 1,
    name: 'Poaceae Plus',
    price: 450,
    count: 1,
    discount: 10,
    seatsForDiscount: 2,
  },
  {
    id: 2,
    name: 'Solanacea Premium',
    price: 450,
    count: 1,
    discount: 20,
    seatsForDiscount: 3,
  },
  {
    id: 3,
    name: 'Brassica Premium',
    price: 450,
    count: 1,
    discount: 5,
    seatsForDiscount: 4,
  },
];

const PricingCalculatorResourcesModal = ({
  openModal,
  handleClose,
  addedResources,
  setAddedResources,
  resources,
}) => {
  const [selectedResourcesIds, setSelectedResourcesIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const updateSelectedResourcesIds = (e, id) => {
    if (selectedResourcesIds.includes(id)) {
      const updatedArray = selectedResourcesIds.filter((el) => el !== id);
      setSelectedResourcesIds(updatedArray);
    } else {
      const updatedArray = [...selectedResourcesIds, id];
      setSelectedResourcesIds(updatedArray);
    }
  };

  const handleConfirm = () => {
    const updatedResources = [...addedResources];
    selectedResourcesIds.map((id) => {
      const item = resources.find((el) => el.id === id);
      const isAlreadyAdded =
        addedResources.find((el) => el.id === id) !== undefined;
      if (!isAlreadyAdded) {
        updatedResources.push(item);
      }
    });

    setAddedResources(updatedResources);
    handleClose();
  };

  useEffect(() => {
    let updatedSelectedResourcesIds = [];
    addedResources?.map((resource) => {
      if (!updatedSelectedResourcesIds.includes(resource.id)) {
        updatedSelectedResourcesIds.push(resource.id);
      }
    });
    setSelectedResourcesIds(updatedSelectedResourcesIds);
  }, [addedResources]);

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
        padding: '20px 20px',
      }}
    >
      <div className="resources-modal">
        <div className="resources-modal__container">
          <div className="resources-modal__header">
            <h2 className="resources-modal__title">Select resources</h2>
            <button type="button" onClick={handleClose}>
              <CloseIcon width={24} height={24} fill="#121212" />
            </button>
          </div>
          <div className="resources-modal__search">
            <SearchIcon width={20} height={20} fill="#6F7F8F" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
          </div>

          <div className="resources-modal__resources">
            {resources
              ?.filter((resource) =>
                resource?.source_name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()),
              )
              .map((resource) => (
                <article
                  className={`${
                    selectedResourcesIds.includes(resource?.id)
                      ? 'selected'
                      : ''
                  } resources-modal__resource`}
                  key={resource?.id}
                  onClick={(e) => updateSelectedResourcesIds(e, resource?.id)}
                >
                  <div className="resources-modal__resource-leading">
                    <img
                      src={
                        resource?.image
                          ? `data:image/png;base64, ${resource.image}`
                          : ''
                      }
                      alt=""
                    />
                    <div className="resources-modal__resource-info">
                      <h2>{resource?.source_name}</h2>
                      <p>${resource?.price} / per seat</p>
                    </div>
                  </div>
                  <label className="resources-modal__checkbox">
                    <input
                      type="checkbox"
                      name="checkbox"
                      onChange={(e) =>
                        updateSelectedResourcesIds(e, resource?.id)
                      }
                      checked={selectedResourcesIds.includes(resource?.id)}
                    />
                  </label>
                </article>
              ))}
          </div>
          <div className="resources-modal__footer">
            <p className="resources-modal__selected">
              Selected: <span>{selectedResourcesIds.length}</span>
            </p>
            <button
              onClick={handleConfirm}
              className="resources-modal__confirm"
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PricingCalculatorResourcesModal;
