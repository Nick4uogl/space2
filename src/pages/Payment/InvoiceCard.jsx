import { Button } from '@mui/material';

import { ReactComponent as DownloadIcon } from '../../assets/img/icons/downloadPDF.svg';

const InvoiceCard = () => {
  return (
    <div className="invoice-card">
      <div className="invoice-card__top">
        <div className="invoice-card__top-info">
          <p className="text-small-bold">
            Quote number: ARABIDOPSIS 9999 - 9999 -9999A
          </p>
          <p className="text-small-bold">Order Created: 2023-05-01</p>
          <p className="text-small-bold">Ammount: $3750</p>
        </div>
        <Button
          variant="contained"
          className="invoice-card__btn flex-align-center"
        >
          <DownloadIcon />
          Download
        </Button>
      </div>
      <div className="invoice-card__info">
        <div className="invoice-card-info-block">
          <p className="txt-small-bold-underlined invoice-card-info-block__header">
            Purchaser
          </p>
          <div className="invoice-card-info-block__content">
            <p className="txt-small-bolв">Dmitry Zharko</p>
            <p className="txt-small-bolв">Apo, AE 9600</p>
            <p className="txt-small-bolв">United States</p>
          </div>
        </div>
        <div className="invoice-card-info-block">
          <p className="txt-small-bold-underlined invoice-card-info-block__header">
            Seller
          </p>
          <div className="invoice-card-info-block__content">
            <p className="txt-small-bolв">Knetminer</p>
            <p className="txt-small-bolв">Rothamsted Research,</p>
            <p className="txt-small-bolв">Harpenden</p>
            <p className="txt-small-bolв">AL5 2JQ, UK</p>
          </div>
        </div>
        <div className="invoice-card-info-block">
          <p className="txt-small-bold-underlined invoice-card-info-block__header">
            Product Support
          </p>
          <div className="invoice-card-info-block__content">
            <p className="txt-small-bolв">https://www.knetminer.com/</p>
            <p className="txt-small-bolв">support@knetminer.com</p>
          </div>
        </div>
      </div>
      <table className="invoice-card-table">
        <thead>
          <th>Product Description</th>
          <th>Quantity</th>
          <th>Date</th>
          <th>Amount</th>
        </thead>
        <tbody>
          <tr>
            <td className="invoice-card-table-data">
              <p className="invoice-card-table-data__title">
                KnetMiner Subscription
              </p>
              <p className="invoice-card-table-data__subtitle">
                Cereals Premium x 1 seats, Solanaceae Premium x 2
                seats,Brassicaceae Premium x 3 seats.
              </p>
            </td>
            <td>4</td>
            <td>2023-05-01</td>
            <td>£3750.00</td>
          </tr>
        </tbody>
      </table>
      <dir>
        <div className="invoice-card-info-row">
          <p className="invoice-card-info-row__label">Subtotal</p>
          <p className="invoice-card-info-row__price">£3750.00</p>
        </div>
        <div className="invoice-card-info-row">
          <p className="invoice-card-info-row__label">Sales Tax</p>
          <p className="invoice-card-info-row__price">£00.00</p>
        </div>
        <div className="invoice-card-info-row">
          <p className="invoice-card-info-row__label txt-small-black">Total</p>
          <p className="invoice-card-info-row__price txt-small-black">
            £3750.00
          </p>
        </div>
      </dir>
    </div>
  );
};

export default InvoiceCard;
