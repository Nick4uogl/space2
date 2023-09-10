import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

import { ReactComponent as RequestSvg } from '../../assets/img/icons/request.svg';

const ResourcesSidebar = ({
  availability,
  handleAvailability,
  filterOptions,
  handleCheckboxChange,
}) => {
  return (
    <div className="sidebar-resources">
      <div className="sidebar-resources__avalibility">
        <h2>Avalibility</h2>
        <button
          className={`sidebar-resources__btn ${
            availability === 'All' ? 'active' : ''
          } `}
          onClick={() => handleAvailability('All')}
        >
          All
        </button>
        <button
          className={`sidebar-resources__btn ${
            availability === 'Free' ? 'active' : ''
          }`}
          onClick={() => handleAvailability('Free')}
        >
          Free
        </button>
        <button
          className={`sidebar-resources__btn ${
            availability === 'Paid' ? 'active' : ''
          }`}
          onClick={() => handleAvailability('Paid')}
        >
          Paid
        </button>
        <button
          className={`sidebar-resources__btn ${
            availability === 'Upcoming' ? 'active' : ''
          }`}
          onClick={() => handleAvailability('Upcoming')}
        >
          Upcoming
        </button>
      </div>
      <div className="sidebar-resources__types">
        <h2>Types</h2>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#121212',
                  },
                }}
                checked={filterOptions.isDiseases}
                onChange={handleCheckboxChange}
                name="isDiseases"
              />
            }
            label="Diseases"
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#121212',
                  },
                }}
                checked={filterOptions.isPlants}
                onChange={handleCheckboxChange}
                name="isPlants"
              />
            }
            label="Plants"
          />
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: '#121212',
                  },
                }}
                checked={filterOptions.isAnimals}
                onChange={handleCheckboxChange}
              />
            }
            name="isAnimals"
            label="Animals"
          />
        </FormGroup>
      </div>
      <div className="sidebar-resources__request-btn">
        <button className="flex-align-center">
          <RequestSvg />
          Make a request
        </button>
      </div>
    </div>
  );
};

export default ResourcesSidebar;
