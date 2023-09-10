import { useForm } from 'react-hook-form';

const InvoicePagePO = () => {
  const { register, watch, handleSubmit } = useForm({ mode: 'all' });

  const onSubmit = () => {};

  return (
    <form className="invoice-page-po" onSubmit={handleSubmit(onSubmit)}>
      <label className="invoice-page-po__title txt-small-bold">
        PO Number (Optional)
      </label>
      <input
        type="text"
        className="invoice-page-po__input"
        {...register('po')}
      />
      <div className="invoice-page-po__btns">
        <button type="button" className="orange-btn invoice-page-po__save-btn">
          Save to finish later
        </button>
        <button className="invoice-page-po__submit-btn btn">
          Submit Order
        </button>
      </div>
    </form>
  );
};

export default InvoicePagePO;
