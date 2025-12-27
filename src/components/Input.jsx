export default function Input({id, labelText, error, ref, handleOnChange, handleOnBlur}) {


  return(
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input id={id} className="form-control" type={id} name={id} ref={ref} onBlur={handleOnBlur} onChange={handleOnChange}/>
      {error &&
        <div className="invalid-feedback d-block">{error}</div>  
      }
    </div>
  )
}