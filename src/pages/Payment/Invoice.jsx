// import { Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// import InvoiceCard from './InvoiceCard';
// import InvoicePagePO from './InvoicePagePO';
// import InvoiceSendEmailCard from './InvoiceSendEmailCard';
// import { ReactComponent as ArrowLeft } from '../../assets/img/icons/arrowLeft.svg';
// import Header from '../../components/Header/Header';

// import './invoice.scss';

// const Invoice = () => {
//   const navitate = useNavigate();

//   return (
//     <div className="invoice-page">
//       <Header />
//       <div className="invoice-page__container">
//         <h1 className="invoice-page__title">Quote</h1>
//         <p className="invoice-page__subtitle">
//           Here is a quote that you can give to the accounting department to get
//           a PO number.
//         </p>
//         <InvoiceCard />
//         <InvoiceSendEmailCard />
//         <InvoicePagePO />
//         <div className="invoice-page__footer">
//           <Button
//             variant="text"
//             className="invoice-page__link-back flex-align-center"
//             sx={{ color: '#6F7F8F' }}
//             onClick={() => navitate(-1)}
//           >
//             <ArrowLeft fill="#6F7F8F" width="1.25rem" height="1.25rem" />
//             Go Back
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Invoice;
