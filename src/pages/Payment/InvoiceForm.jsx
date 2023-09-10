// import { useEffect, useState } from 'react';

// import { Autocomplete, TextField } from '@mui/material';
// import { Country, City } from 'country-state-city';
// import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import Select, { components } from 'react-select';

// import { ReactComponent as ArrowBack } from '../../assets/img/icons/arrowLeft.svg';
// import { ReactComponent as CheckmarkIcon } from '../../assets/img/icons/checkmark.svg';
// import DropdownIndicator from '../../components/DropDownIndicator/DropDownIndicator.jsx';
// import Header from '../../components/Header/Header.jsx';
// import { selectPaymentData } from '../../redux/resources/resourcesSlice.js';
// import { selectUser } from '../../redux/user/userSlice.js';

// var currentDate = new Date();
// var inAYear = new Date(currentDate);
// var inAMonth = new Date(currentDate);
// inAYear.setFullYear(currentDate.getFullYear() + 1);
// inAMonth.setMonth(currentDate.getMonth() + 1);
// var options = { year: 'numeric', day: 'numeric', month: 'long' };
// var formattedInAYear = inAYear.toLocaleDateString('en-GB', options);
// var formattedInAMonth = inAMonth.toLocaleDateString('en-GB', options);

// const CustomOption = (props) => (
//   <components.Option {...props}>
//     {props.isSelected && (
//       <CheckmarkIcon
//         fill="#51CE7B"
//         style={{
//           position: 'absolute',
//           top: '1rem',
//           right: '0.62rem',
//           width: '1.25rem',
//           height: '1.25rem',
//         }}
//       />
//     )}

//     {props.label}
//   </components.Option>
// );

// const InvoiceForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     getValues,
//     setValue,
//     watch,
//   } = useForm({
//     mode: 'all',
//     defaultValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       institution: '',
//       street: '',
//       country: '',
//       postalCode: '',
//       department: '',
//       vatid: '',
//       additionalDetails: '',
//     },
//   });

//   const [countryOptions, setCountryOptions] = useState([]);
//   const [cityOptions, setCityOptions] = useState([]);
//   const [selectedContry, setSelectedCountry] = useState(null);

//   const navigate = useNavigate();
//   const user = useSelector(selectUser);
//   const paymentData = useSelector(selectPaymentData);

//   const onSubmit = () => {};

//   const handleCountrySelect = (selectedOption) => {
//     setSelectedCountry(selectedOption.value);
//     setValue('country', selectedOption.value, { shouldValidate: true });
//   };

//   if (!paymentData) {
//     navigate('/pricing-calculator');
//   }

//   useEffect(() => {
//     setValue('firstName', user?.first_name ? user.first_name : '');
//     setValue('lastName', user?.last_name);
//     setValue('email', user?.email);
//   }, [user]);

//   useEffect(() => {
//     const countries = Country.getAllCountries().map((country) => ({
//       value: country.isoCode,
//       label: country.name,
//     }));
//     setCountryOptions(countries);
//   }, []);

//   useEffect(() => {
//     const uniqueNames = {};
//     const cities = City.getCitiesOfCountry(selectedContry);
//     const filteredCities = cities.filter((obj) => {
//       if (!uniqueNames[obj.name]) {
//         uniqueNames[obj.name] = true;
//         return true;
//       }
//       return false;
//     });
//     setCityOptions(filteredCities);
//   }, [selectedContry]);

//   return (
//     <div className="invoice-payment-page">
//       <Header />
//       <div className="invoice-payment-page__container">
//         <h2 className="invoice-payment-page__title">
//           Please provide your contact details to generate a personal offer
//         </h2>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="invoice-payment-card"
//         >
//           <div className="invoice-payment-card-top">
//             <div className="invoice-payment-card-top__header flex-space">
//               <p>Billing cycle</p>
//               <p>
//                 {paymentData?.isYearly ? 'Annual' : 'Monthly'},{' '}
//                 {paymentData?.isYearly ? formattedInAYear : formattedInAMonth}
//               </p>
//             </div>
//             <div className="invoice-payment-card-top__resources-selected">
//               {paymentData?.resources?.map((resource) => (
//                 <div
//                   key={resource.id}
//                   className="invoice-payment-card-top__resource-selected flex-space"
//                 >
//                   <p>
//                     {resource?.source_name} x {resource.count} seats
//                   </p>
//                   <p>£{resource.price}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="invoice-payment-card-top__total flex-space">
//               <p>Total price</p>
//               <p>£{paymentData?.total}</p>
//             </div>
//           </div>
//           <div className="invoice-payment-card__content">
//             <div className="invoice-payment-card-billing">
//               <h3 className="invoice-payment-card__header-title">
//                 Billing info
//               </h3>
//               <div className="invoice-payment-card-billing__inputs invoice-payment-card__inputs">
//                 <div
//                   className={`invoice-payment-card-billing__input invoice-payment-card__input ${
//                     errors?.firstName && 'invoice-payment-card__input--required'
//                   } ${
//                     getValues().firstName &&
//                     'invoice-payment-card__input--validated'
//                   }`}
//                 >
//                   <label htmlFor="firstName">
//                     First Name <span>*</span>
//                   </label>
//                   <input
//                     {...register('firstName', {
//                       required: 'first name is required',
//                     })}
//                     value={watch('firstName')}
//                   />
//                   <CheckmarkIcon
//                     className="invoice-payment-card__input-checkmark"
//                     fill="#51ce7b"
//                   />
//                 </div>
//                 <div
//                   className={`invoice-payment-card-billing__input invoice-payment-card__input ${
//                     errors?.lastName
//                       ? 'invoice-payment-card__input--required'
//                       : ''
//                   } ${
//                     watch('lastName')
//                       ? 'invoice-payment-card__input--validated'
//                       : ''
//                   }`}
//                 >
//                   <label htmlFor="lastName">
//                     Last Name <span>*</span>
//                   </label>
//                   <input
//                     {...register('lastName', {
//                       required: 'last name is required',
//                     })}
//                   />
//                   <CheckmarkIcon
//                     className="invoice-payment-card__input-checkmark"
//                     fill="#51ce7b"
//                   />
//                 </div>
//               </div>
//               <div className="invoice-payment-card-billing__inputs invoice-payment-card__inputs">
//                 <div
//                   className={`invoice-payment-card-billing__input invoice-payment-card__input ${
//                     errors?.email ? 'invoice-payment-card__input--required' : ''
//                   } ${
//                     watch('email')
//                       ? 'invoice-payment-card__input--validated'
//                       : ''
//                   }`}
//                 >
//                   <label htmlFor="email">
//                     Email <span>*</span>
//                   </label>
//                   <input
//                     {...register('email', {
//                       required: 'email is required',
//                     })}
//                   />
//                   <CheckmarkIcon
//                     className="invoice-payment-card__input-checkmark"
//                     fill="#51ce7b"
//                   />
//                 </div>
//                 <div className="invoice-payment-card-billing__input invoice-payment-card__input">
//                   <label htmlFor="institution">Institution</label>
//                   <input {...register('institution')} />
//                 </div>
//               </div>
//               <div className="invoice-payment-card-billing__inputs invoice-payment-card__inputs">
//                 <div className="invoice-payment-card-billing__input invoice-payment-card__input">
//                   <label htmlFor="department">Department</label>
//                   <input {...register('Department')} />
//                 </div>
//                 <div className="invoice-payment-card-billing__input invoice-payment-card__input">
//                   <label htmlFor="VAT ID">VAT ID</label>
//                   <input {...register('vatid')} />
//                 </div>
//               </div>
//             </div>
//             <div className="invoice-payment-card-adress">
//               <h2 className="invoice-payment-card__header-title">Adress</h2>
//               <div className="invoice-payment-card-adress__inputs invoice-payment-card__inputs">
//                 <div
//                   className={`invoice-payment-card__input ${
//                     errors?.street
//                       ? 'invoice-payment-card__input--required'
//                       : ''
//                   } ${
//                     watch('street')
//                       ? 'invoice-payment-card__input--validated'
//                       : ''
//                   }`}
//                 >
//                   <label htmlFor="street">
//                     Street <span>*</span>
//                   </label>
//                   <input
//                     {...register('street', {
//                       required: 'street is required',
//                     })}
//                   />
//                   <CheckmarkIcon
//                     className="invoice-payment-card__input-checkmark"
//                     fill="#51ce7b"
//                   />
//                 </div>
//                 <div
//                   className={`invoice-payment-card__input ${
//                     errors?.city ? 'invoice-payment-card__input--required' : ''
//                   } ${
//                     watch('city')
//                       ? 'invoice-payment-card__input--validated'
//                       : ''
//                   }`}
//                 >
//                   <label htmlFor="city">
//                     City <span>*</span>
//                   </label>

//                   <Autocomplete
//                     freeSolo
//                     options={cityOptions.map((option) => option.name)}
//                     disableClearable
//                     onChange={(e, value) => setValue('city', value)}
//                     disablePortal
//                     PopperProps={{
//                       style: {},
//                     }}
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         InputLabelProps={{ shrink: false }}
//                         variant="outlined"
//                         {...register('city', {
//                           required: 'city is required',
//                         })}
//                         sx={{
//                           '& .MuiOutlinedInput-root': {
//                             borderRadius: '0.5rem',
//                           },
//                           '& .MuiOutlinedInput-root fieldset': {
//                             borderColor: watch('city')
//                               ? '#51ce7b'
//                               : errors?.city
//                               ? '#F34A4A'
//                               : '#BDC5CE',
//                           },
//                           '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
//                             {
//                               borderColor: watch('city')
//                                 ? '#51ce7b'
//                                 : errors?.city
//                                 ? '#F34A4A'
//                                 : '#BDC5CE',
//                             },
//                           '& .MuiOutlinedInput-input': {
//                             border: 'none',
//                           },
//                           '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
//                             {
//                               borderColor: watch('city')
//                                 ? '#51ce7b'
//                                 : errors?.city
//                                 ? '#F34A4A'
//                                 : '#BDC5CE',
//                             },
//                         }}
//                       />
//                     )}
//                   />
//                   <CheckmarkIcon
//                     className="invoice-payment-card__input-checkmark"
//                     fill="#51ce7b"
//                   />
//                 </div>
//               </div>
//               <div className="invoice-payment-card-adress__inputs invoice-payment-card-adress__inputs--reversed invoice-payment-card__inputs">
//                 <div
//                   className={`invoice-payment-card__input ${
//                     errors?.postalCode
//                       ? 'invoice-payment-card__input--required'
//                       : ''
//                   } ${
//                     watch('postalCode') &&
//                     'invoice-payment-card__input--validated'
//                   }`}
//                 >
//                   <label htmlFor="postalCode">
//                     Postal Code <span>*</span>
//                   </label>
//                   <input
//                     {...register('postalCode', {
//                       required: 'postal code is required',
//                     })}
//                   />
//                   <CheckmarkIcon
//                     className="invoice-payment-card__input-checkmark"
//                     fill="#51ce7b"
//                   />
//                 </div>
//                 <div
//                   className={`invoice-payment-card__input ${
//                     errors?.country && 'invoice-payment-card__input--required'
//                   } ${
//                     watch('country') && 'invoice-payment-card__input--validated'
//                   }`}
//                 >
//                   <label htmlFor="country">
//                     Country <span>*</span>
//                   </label>
//                   <Select
//                     {...register('country', { required: true })}
//                     options={countryOptions}
//                     onChange={handleCountrySelect}
//                     placeholder=""
//                     components={{
//                       IndicatorSeparator: () => null,
//                       DropdownIndicator: DropdownIndicator,
//                       Option: CustomOption,
//                     }}
//                     styles={{
//                       control: (baseStyles, state) => ({
//                         ...baseStyles,
//                         outline: 'none',
//                         border: errors?.country
//                           ? '1px solid #F34A4A'
//                           : watch('country')
//                           ? '1px solid #51CE7B'
//                           : '1px solid #BDC5CE',
//                         padding: '0rem 1.25rem',
//                         borderRadius: '0.5rem',
//                         cursor: 'pointer',
//                         height: '3.3125rem',
//                         '&:hover': {
//                           borderColor: '#51CE7B',
//                         },
//                         boxShadow: state.isFocused ? '0 0 0 2px 51CE7B' : '',
//                         gap: '6px',
//                       }),

//                       singleValue: (provided) => ({
//                         ...provided,
//                         padding: '7.5px 0rem',
//                         color: '#6f7f8f',
//                       }),
//                       option: (provided, state) => ({
//                         ...provided,
//                         cursor: state.isDisabled ? 'not-allowed' : 'pointer',
//                         padding: '1rem',
//                         position: 'relative',
//                         borderRadius: '0.375rem',
//                         fontWeight: '700',
//                         fontFamily: 'Nexa',
//                         color: '#000',
//                         opacity: state.isDisabled && '0.3',
//                         backgroundColor:
//                           state.isFocused || state.isSelected
//                             ? '#F7F8F9'
//                             : 'transparent',
//                         '&:hover': {
//                           backgroundColor: '#F7F8F9',
//                         },
//                         '&:active': {
//                           backgroundColor: '#F7F8F9',
//                         },
//                       }),
//                       dropdownIndicator: (baseStyles) => ({
//                         ...baseStyles,
//                         padding: '0px',
//                       }),
//                       placeholder: (provided) => ({
//                         ...provided,
//                         fontSize: '1rem',
//                         fontWeight: '700',
//                         color: '#bdc5ce',
//                         fontFamily: 'Nexa',
//                         lineHeight: '125%',
//                         letterSpacing: '-0.01rem',
//                         padding: '0px',
//                       }),
//                       valueContainer: (provided) => ({
//                         ...provided,
//                         padding: '0px',
//                       }),
//                       menuList: (provided) => ({
//                         ...provided,
//                         padding: '0.5rem',
//                       }),
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="invoice-payment-card-billing__input invoice-payment-card__input">
//                 <label htmlFor="additionalDetails">
//                   Please enter additional details here (optional)
//                 </label>
//                 <textarea
//                   {...register('additionalDetails')}
//                   className="invoice-payment-card__textarea"
//                   rows="5"
//                 />
//               </div>
//             </div>
//             <button
//               type="submit"
//               className={`invoice-payment-card__submit btn ${
//                 (!getValues().firstName ||
//                   !getValues().lastName ||
//                   !getValues().email ||
//                   !getValues().street ||
//                   !getValues().city ||
//                   !getValues().country ||
//                   !getValues().postalCode) &&
//                 'btn--disabled'
//               }`}
//             >
//               Proceed to Quote
//             </button>
//             <Link className="invoice-payment-card__back flex-align-center">
//               <ArrowBack fill="#6F7F8F" /> Go Back
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InvoiceForm;
