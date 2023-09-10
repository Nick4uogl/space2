const SizedBox = ({ mb, mr, ml, mt, m }) => {
  return (
    <div
      style={{
        margin: m,
        marginTop: mt,
        marginLeft: ml,
        marginRight: mr,
        marginBottom: mb,
      }}
    ></div>
  );
};

export default SizedBox;
