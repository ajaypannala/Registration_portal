const AlertMessage = ({ type, message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className={`alert ${type}`}>
      {message}
    </div>
  );
};

export default AlertMessage;