import { useForm } from 'react-hook-form';

const InvoiceSendEmailCard = () => {
  const { register, watch, handleSubmit } = useForm({ mode: 'all' });

  const onSubmit = () => {};

  return (
    <div className="invoice-email-card">
      <div className="invoice-email-card__left">
        <h2 className="invoice-email-card__title">Receive your quote as PDF</h2>
        <p className="invoice-email-card__subtitle">
          if you have any questions contact <span>hello@knetminer.com</span>
        </p>
      </div>
      <form
        className="invoice-email-card__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="invoice-email-card__input"
          type="text"
          {...register('email')}
        />
        <button className="invoice-email-card__btn">SEND</button>
      </form>
    </div>
  );
};

export default InvoiceSendEmailCard;
