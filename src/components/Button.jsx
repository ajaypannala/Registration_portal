const Button = ({
  children,
  loading = false,
  loadingText = "Please wait...",
}) => {
  return (
    <button
      type="submit"
      className="register-button"
      disabled={loading}
      aria-busy={loading}
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default Button;
