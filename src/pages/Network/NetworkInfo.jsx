import { useState } from 'react';

import { IconButton } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import { DateTime } from 'luxon';

import { ReactComponent as EditIcon } from '../../assets/img/icons/edit.svg';
import { ReactComponent as ArrowForwardSharpIcon } from '../../assets/img/icons/smallArrow.svg';
import SizedBox from '../../lib/SizedBox/SizedBox.jsx';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardSharpIcon />} {...props} />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  padding: '0',
  position: 'relative',
  border: 'none',
  minHeight: 'auto',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    position: 'absolute',
    top: '1.25rem',
    left: '-10px',
    zIndex: '20',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    margin: 0,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: '0',
  border: 'none',
}));

const NetworkInfo = ({
  isOwner,
  networkName,
  setOpenEditName,
  setOpenEditDescription,
  networkDescription,
  currentNetwork,
}) => {
  const [expanded, setExpanded] = useState('panel');

  const handleChange = (panel) => (_, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const parsedGenes = JSON.parse(currentNetwork?.gene);
  return (
    <div className="info-network-page">
      <div className="info-network-page__top flex-space">
        {isOwner ? (
          <div className="flex-align-center">
            <h2 className="network-page__header-title">{networkName}</h2>
            <IconButton onClick={() => setOpenEditName(true)}>
              <EditIcon fill="#BDC5CE" width="1.5rem" height="1.5rem" />
            </IconButton>
          </div>
        ) : (
          <h2 className="network-page__header-title">{networkName}</h2>
        )}
      </div>
      <div className="info-network-page__description">
        {isOwner ? (
          <div className="flex-align-center">
            <p className="network-page__header-description grey-15">
              {networkDescription}
            </p>
            <IconButton
              onClick={() => setOpenEditDescription(true)}
              sx={{
                padding: '0.2rem',
              }}
            >
              <EditIcon fill="#BDC5CE" width="1.25rem" height="1.25rem" />
            </IconButton>
          </div>
        ) : (
          <>
            <SizedBox mt={9} />
            <p className="grey-15">{networkDescription}</p>
          </>
        )}
      </div>

      <div className="info-network-page__content">
        <ul className="info-network-page__list">
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary>
              <li className="info-network-page__item  txt-small">
                <span className="txt-small-bold">Gene(s):</span>{' '}
                <div>
                  {parsedGenes?.map((gene, i) =>
                    i < 2 ? `"${gene}"${i < 1 ? ',' : ''} ` : '',
                  )}

                  <AccordionDetails>
                    <p>
                      {parsedGenes?.map((gene, i) =>
                        i >= 2
                          ? `,"${gene}"${
                              i < parsedGenes.length - 1 ? ',' : ''
                            } `
                          : '',
                      )}
                    </p>
                  </AccordionDetails>
                </div>
              </li>
            </AccordionSummary>
          </Accordion>

          <li className="info-network-page__item txt-small">
            <span className="txt-small-bold">Keyword(s):</span>{' '}
            {currentNetwork?.keyword}
          </li>
          <li className="info-network-page__item  txt-small">
            <span className="txt-small-bold">KnetMiner:</span>{' '}
            {currentNetwork?.species_name}
          </li>

          <li className="info-network-page__item txt-small">
            <span className="txt-small-bold">Network size:</span>{' '}
            {currentNetwork?.num_nodes} Nodes / {currentNetwork?.num_edges}{' '}
            Edges
          </li>
          <li className="info-network-page__item txt-small">
            <span className="txt-small-bold">DB version:</span>{' '}
            {currentNetwork?.db_version}
          </li>
          <li className="info-network-page__item txt-small">
            <span className="txt-small-bold">Source Organization:</span>{' '}
            {currentNetwork?.source_organization}
          </li>
          <li className="info-network-page__item txt-small">
            <span className="txt-small-bold">Last modified:</span>{' '}
            {DateTime.fromISO(currentNetwork?.date_modified, {
              zone: 'utc',
            })
              .setZone('Europe/London')
              .toRelative({ locale: 'en' })}
          </li>
          <li className="info-network-page__item txt-small">
            <span className="txt-small-bold">Owner:</span>{' '}
            {currentNetwork?.owner?.first_name}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NetworkInfo;
