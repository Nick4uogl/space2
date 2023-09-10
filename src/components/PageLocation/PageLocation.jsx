import './pageLocation.scss';

const PageLocation = ({ items }) => {
  return (
    <div className="page-location">
      {items?.map((item, i) => (
        <div key={i} className="page-location__item">
          {item}
          {i != items?.length - 1 ? <span>{'>'}</span> : null}
        </div>
      ))}
    </div>
  );
};

export default PageLocation;
