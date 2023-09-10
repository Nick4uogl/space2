import { Link, NavLink } from 'react-router-dom';
import Select from 'react-select';

import { ReactComponent as ArrowLeft } from '../../assets/img/icons/arrowLeft.svg';
import { ReactComponent as BatchDeleteIcon } from '../../assets/img/icons/batchDelete.svg';
import { ReactComponent as DeleteIcon } from '../../assets/img/icons/delete.svg';
import { ReactComponent as TableViewIcon } from '../../assets/img/icons/viewModel.svg';
import { ReactComponent as GridViewIcon } from '../../assets/img/icons/viewModel2.svg';
import DropdownIndicator from '../../components/DropDownIndicator/DropDownIndicator';

const options = [
  { value: 'descending', label: 'descending' },
  { value: 'ascending', label: 'ascending' },
];

const NetworksActions = ({
  isGrid,
  handleIsGrid,
  isRecycleBin,
  selectedNetworkIDs,
  removeNetworks,
  deleteNetworks,
  selectedNetworksToDelete,
  restoreNetworks,
}) => {
  return (
    <div
      className={`networks-page-top ${
        isRecycleBin ? 'recycle-bin-top' : 'networks-page__top'
      }`}
    >
      <div className="networks-page__top-left">
        {/* {isRecycleBin ? :} */}
        {isRecycleBin ? (
          <>
            <Link
              className="recycle-bin-back flex-align-center grey-15-700"
              to={'/'}
            >
              <ArrowLeft fill="#6F7F8F" width="1.5rem" height="1.5rem" />
              Back to Networks
            </Link>
            <div className="recycle-bin-info">
              <p className="recycle-bin-info__selected">
                Selected: <span>{selectedNetworksToDelete.length}</span>
              </p>
              <button
                className="recycle-bin-info__outlined-btn recycle-bin-info__outlined-btn--green"
                disabled={selectedNetworksToDelete.length === 0}
                onClick={() => restoreNetworks(selectedNetworksToDelete)}
              >
                Restore
              </button>
              <button
                className="recycle-bin-info__outlined-btn"
                disabled={selectedNetworksToDelete.length === 0}
                onClick={() => removeNetworks(selectedNetworksToDelete)}
              >
                Permanently delete
              </button>
              <div className="recycle-bin-info__underlined-btns">
                <button
                  className="recycle-bin-info__underlined-btn"
                  disabled={selectedNetworksToDelete.length === 0}
                  onClick={() => removeNetworks(selectedNetworksToDelete, true)}
                >
                  Permanently delete all
                </button>
                <button
                  className="recycle-bin-info__underlined-btn"
                  onClick={() =>
                    restoreNetworks(selectedNetworksToDelete, true)
                  }
                >
                  Restore all
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {selectedNetworkIDs.length > 1 && (
              <button
                className="networks-page__delete-outlined flex-align-center"
                onClick={() => deleteNetworks(selectedNetworkIDs)}
              >
                <BatchDeleteIcon />
                Batch delete
              </button>
            )}

            <Link
              to={'/recycle-bin'}
              className="networks-page__delete-outlined flex-align-center"
            >
              <DeleteIcon fill="#121212" />
              Recycle bin
            </Link>
          </>
        )}
      </div>
      {!isRecycleBin && (
        <div className="networks-page__top-middle">
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              `networks-page__top-btn ${
                isActive ? ' networks-page__top-btn-active' : ''
              }`
            }
          >
            My networks
          </NavLink>
          <NavLink
            to={'/share'}
            className={({ isActive }) =>
              `networks-page__top-btn ${
                isActive ? ' networks-page__top-btn-active' : ''
              }`
            }
          >
            Shared with me
          </NavLink>
        </div>
      )}
      <div className="networks-page__top-right">
        <Select
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: DropdownIndicator,
          }}
          options={options}
          placeholder="Sort by date"
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? '#51CE7B' : '#BDC5CE',
              outlineColor: '#51CE7B',
              width: '127px',
              borderRadius: '8px',
              boxShadow: state.isFocused ? '0 0 0 2px 51CE7B' : '',
              '&:hover': {
                borderColor: state.isFocused
                  ? '51CE7B'
                  : baseStyles.borderColor, // Keep the focus color on hover
              },
            }),
            option: (provided, state) => ({
              ...provided,
              background: state.isFocused
                ? '#94e0ad' // Change the background color on focus
                : state.isSelected
                ? '#33de6c'
                : state.isHovered
                ? '#33de6c'
                : '#fff',
              '&:hover': {
                backgroundColor: state.isSelected ? '#33de6c' : '#b2ebc5',
              },
              color: state.isSelected
                ? 'white' // Change the text color of the selected option
                : state.isHovered
                ? 'white'
                : provided.color, // Change the text color on hover
            }),
            dropdownIndicator: (baseStyles) => ({
              ...baseStyles,
              padding: '6px',
            }),
            placeholder: (provided) => ({
              ...provided,
              fontSize: '13px',
              fontWeight: '700',
              color: '#121212',
              fontFamily: 'Nexa',
            }),
          }}
        />

        {!isRecycleBin && (
          <>
            <button
              className={`networks-page__btn ${
                isGrid ? 'networks-page__btn-active' : ''
              } `}
              onClick={() => handleIsGrid(true)}
            >
              <GridViewIcon />
            </button>
            <button
              onClick={() => handleIsGrid(false)}
              className={`networks-page__btn ${
                !isGrid ? 'networks-page__btn-active' : ''
              } `}
            >
              <TableViewIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NetworksActions;
