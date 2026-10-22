const Button = ({ children, loading }) => {
  return (
    <button
      type="submit"
      className="register-button"
      disabled={loading}
    >
      {loading ? "Creating Account..." : children}
    </button>
  );
};

export default Button;