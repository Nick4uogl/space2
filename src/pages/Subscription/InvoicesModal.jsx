import { useState } from 'react';

import { Modal, IconButton } from '@mui/material';

import { ReactComponent as CloseIcon } from '../../assets/img/icons/close.svg';
import { ReactComponent as DownloadIcon } from '../../assets/img/icons/downloadFile.svg';
import { ReactComponent as QuoteIcon } from '../../assets/img/icons/quote.svg';

const InvoicesModal = ({
  openInvoices,
  handleCloseInvoices,
  invoices,
  quotes,
}) => {
  const [activeTab, setActiveTab] = useState('invoices');
  return (
    <Modal
      open={openInvoices}
      onClose={handleCloseInvoices}
      className="invoices-modal"
    >
      <div className="invoices-modal__container">
        <div className="invoices-modal__top flex-space">
          <div className="invoices-modal__tabs">
            <button
              className={`invoices-modal__tab ${
                activeTab === 'invoices' ? 'invoices-modal__tab--active' : ''
              }`}
              onClick={() => setActiveTab('invoices')}
              type="button"
            >
              Invoices
            </button>
            <button
              className={`invoices-modal__tab ${
                activeTab === 'quotes' ? 'invoices-modal__tab--active' : ''
              }`}
              onClick={() => setActiveTab('quotes')}
              type="button"
            >
              Quotes
            </button>
          </div>

          <IconButton onClick={handleCloseInvoices} sx={{ padding: '3px' }}>
            <CloseIcon fill="#121212" />
          </IconButton>
        </div>
        <div className="invoices-modal__list">
          {activeTab === 'invoices' ? (
            <>
              <div className="invoices-modal-invoice-tile flex-space">
                <div className="invoices-modal-invoice-tile__left">
                  <h2 className="invoices-modal-invoice-tile__title">
                    May 01, 2023
                  </h2>
                  <p className="invoices-modal-invoice-tile__subtitle">
                    Subscription - Yearly
                  </p>
                </div>
                <div className="invoices-modal-invoice-tile__right">
                  <div className="invoices-modal-invoice-tile__price flex-align-center">
                    <IconButton sx={{ padding: '4px' }}>
                      <DownloadIcon />
                    </IconButton>
                    £3750.00
                  </div>
                  <div className="invoices-modal-invoice-tile__badge invoices-modal-invoice-tile__badge--red">
                    PAID
                  </div>
                </div>
              </div>
              <div className="invoices-modal-invoice-tile flex-space">
                <div className="invoices-modal-invoice-tile__left">
                  <h2 className="invoices-modal-invoice-tile__title">
                    May 01, 2023
                  </h2>
                  <p className="invoices-modal-invoice-tile__subtitle">
                    Subscription - Yearly
                  </p>
                </div>
                <div className="invoices-modal-invoice-tile__right">
                  <div className="invoices-modal-invoice-tile__price flex-align-center">
                    <IconButton sx={{ padding: '4px' }}>
                      <DownloadIcon />
                    </IconButton>
                    £3750.00
                  </div>
                  <div className="invoices-modal-invoice-tile__badge invoices-modal-invoice-tile__badge--green">
                    PAID
                  </div>
                </div>
              </div>
              <div className="invoices-modal-invoice-tile flex-space">
                <div className="invoices-modal-invoice-tile__left">
                  <h2 className="invoices-modal-invoice-tile__title">
                    May 01, 2023
                  </h2>
                  <p className="invoices-modal-invoice-tile__subtitle">
                    Subscription - Yearly
                  </p>
                </div>
                <div className="invoices-modal-invoice-tile__right">
                  <div className="invoices-modal-invoice-tile__price flex-align-center">
                    <IconButton sx={{ padding: '4px' }}>
                      <DownloadIcon />
                    </IconButton>
                    £3750.00
                  </div>
                  <div className="invoices-modal-invoice-tile__badge invoices-modal-invoice-tile__badge--gray">
                    PAID
                  </div>
                </div>
              </div>
              <div className="invoices-modal-invoice-tile flex-space">
                <div className="invoices-modal-invoice-tile__left">
                  <h2 className="invoices-modal-invoice-tile__title">
                    May 01, 2023
                  </h2>
                  <p className="invoices-modal-invoice-tile__subtitle">
                    Subscription - Yearly
                  </p>
                </div>
                <div className="invoices-modal-invoice-tile__right">
                  <div className="invoices-modal-invoice-tile__price flex-align-center">
                    <IconButton sx={{ padding: '4px' }}>
                      <DownloadIcon />
                    </IconButton>
                    £3750.00
                  </div>
                  <div className="invoices-modal-invoice-tile__badge invoices-modal-invoice-tile__badge--red">
                    PAID
                  </div>
                </div>
              </div>
              <div className="invoices-modal-invoice-tile flex-space">
                <div className="invoices-modal-invoice-tile__left">
                  <h2 className="invoices-modal-invoice-tile__title">
                    May 01, 2023
                  </h2>
                  <p className="invoices-modal-invoice-tile__subtitle">
                    Subscription - Yearly
                  </p>
                </div>
                <div className="invoices-modal-invoice-tile__right">
                  <div className="invoices-modal-invoice-tile__price flex-align-center">
                    <IconButton sx={{ padding: '4px' }}>
                      <DownloadIcon />
                    </IconButton>
                    £3750.00
                  </div>
                  <div className="invoices-modal-invoice-tile__badge invoices-modal-invoice-tile__badge--green">
                    PAID
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="profile-subscription-quote invoices-modal-quote">
                <div className="profile-subscription-quote__left">
                  <QuoteIcon />
                  <div className="profile-subscription-quote__info">
                    <h2>Quote #1</h2>
                    <p>Expire: 07, May 2023</p>
                  </div>
                </div>
                <div className="profile-subscription-quote__link">
                  View Quote
                </div>
              </div>
              <div className="profile-subscription-quotes__quote profile-subscription-quote">
                <div className="profile-subscription-quote__left">
                  <QuoteIcon />
                  <div className="profile-subscription-quote__info">
                    <h2>Quote #1</h2>
                    <p>Expire: 07, May 2023</p>
                  </div>
                </div>
                <div className="profile-subscription-quote__link">
                  View Quote
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default InvoicesModal;
