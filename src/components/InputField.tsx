import {Input, Label, TextField} from "react-aria-components"

export type FormError = {key: string, message: string}

export const FieldErrors = ({field, errors}: {field: string, errors: FormError[]}) => (
  <>
    {
      errors
        .filter(e => e.key === field)
        .map(e => (
          <div className='field-error'>{e.message}</div>
        ))
    }
  </>
)

export const hasError = (field: string, errors: FormError[]) =>
  errors
    .filter(e => e.key === field)
    .length > 0

const FormField = ({value, onChange, errors, label, type, field}: {
  value: string,
  onChange: (x: string) => void,
  errors: FormError[],
  type: string,
  label: string,
  field: string,
  autoComplete?: string,
}) => {
  return (

    <TextField
      value={value}
      onChange={onChange}
      type={type}
      autoComplete='new-email'
      className={`input-wrapper ${hasError(field, errors) || hasError('_form', errors) ? 'error' : ''}`}
    >
      <Label>{label}</Label>
      <Input />
      <FieldErrors field={field} errors={errors} />
    </TextField>
  )
}

export default FormField
