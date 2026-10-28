import { useId } from 'react';
import { countWords, MESSAGE_WORD_LIMIT } from '../lib/validation';

function FieldShell({ id, label, required, error, hint, className = '', children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''} ${className}`}>
      {label && (
        <label className="field-label" htmlFor={id}>
          {label}
          {required && ' *'}
        </label>
      )}
      {children}
      {error ? (
        <p className="field-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : (
        hint && <p className="field-hint">{hint}</p>
      )}
    </div>
  );
}

/** Optional leading icon (image src) or text prefix such as "+91", and a trailing element (e.g. a show-password button), drawn inside the input border. */
function Adorned({ icon, prefix, suffix, children }) {
  if (!icon && !prefix && !suffix) return children;
  return (
    <div className="input-adorn">
      {icon && <img src={icon} alt="" width="24" height="24" />}
      {prefix && <span className="input-prefix">{prefix}</span>}
      {children}
      {suffix}
    </div>
  );
}

export function TextField({ label, required, error, hint, className, inputClassName = '', type = 'text', icon, prefix, suffix, ...props }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <Adorned icon={icon} prefix={prefix} suffix={suffix}>
        <input
          id={id}
          type={type}
          className={`input ${inputClassName}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
      </Adorned>
    </FieldShell>
  );
}

export function PhoneField(props) {
  return <TextField type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="10-digit mobile number" {...props} />;
}

export function EmailField(props) {
  return <TextField type="email" autoComplete="email" placeholder="name@example.com" {...props} />;
}

export function TextArea({ label, required, error, className, limit = MESSAGE_WORD_LIMIT, rows = 2, value, placeholder = 'Enter your message...', ref, ...props }) {
  const id = useId();
  const words = countWords(value || '');
  return (
    <FieldShell id={id} label={label} required={required} error={error} className={className}>
      <div className="textarea-wrap">
        <textarea
          id={id}
          ref={ref}
          className="textarea"
          rows={rows}
          value={value}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        <span className={`word-count ${words > limit ? 'over' : ''}`}>
          {words}/{limit} words
        </span>
      </div>
    </FieldShell>
  );
}

export function SelectField({ label, required, error, hint, className, options, placeholder = 'Select', icon, ...props }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <Adorned icon={icon}>
        <select id={id} className={`select ${props.value ? '' : 'is-empty'}`} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} {...props}>
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Adorned>
    </FieldShell>
  );
}

export function FormAlert({ type = 'success', children }) {
  return (
    <div className={`form-alert ${type}`} role={type === 'error' ? 'alert' : 'status'}>
      {children}
    </div>
  );
}

/** File picker styled as an outlined button; shows the chosen file name and validation errors. */
export function FileField({ label, required, error, value, onChange, onBlur, accept, icon, ref, name }) {
  const id = useId();
  return (
    <div className={`field file-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id} className="file-btn">
        {icon && <img src={icon} alt="" width="15" height="15" />}
        {label}
        {required && ' *'}
      </label>
      <input
        id={id}
        ref={ref}
        name={name}
        type="file"
        accept={accept}
        className="sr-only"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => {
          onChange(e.target.files[0] || null);
          onBlur?.();
        }}
      />
      {value && !error && <span className="file-name">✓ {value.name}</span>}
      {error && (
        <p className="field-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
