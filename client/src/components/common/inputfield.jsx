function Inputfield({
  label,
  value,
  type,
  name,
  className,
  id,
  handleChange,
  error,
}) {
  return (
    <div>
      <label className="form-label">{label && label}</label>
      <input
        type={type && type}
        name={name && name}
        className={`${className} ${error && "is-invalid"}`}
        id={id && id}
        value={value && value}
        onChange={handleChange}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default Inputfield;
