import { useCallback, useMemo, useRef, useState } from 'react';

export const PHONE_DIGITS = 10;
export const MESSAGE_WORD_LIMIT = 400;

export const countWords = (text) => (text.trim() ? text.trim().split(/\s+/).length : 0);

/*
 * Each rule returns { live, final }:
 *  - live errors show the moment a user types something invalid
 *    (letters in a phone number, a phone number that is too long, digits in a name)
 *  - final errors show once the user leaves the field or submits
 *    (required, too short, malformed email)
 */
const rules = {
  name(value, { required = true, label = 'This field' } = {}) {
    const v = value.trim();
    if (/[0-9]/.test(value)) return { live: `${label} cannot contain numbers` };
    if (/[^\p{L}\s.'-]/u.test(value)) return { live: `${label} can only contain letters` };
    if (v.length > 40) return { live: `${label} cannot be longer than 40 characters` };
    if (required && !v) return { final: `${label} is required` };
    if (v && v.length < 2) return { final: `${label} must be at least 2 characters` };
    return {};
  },
  phone(value, { required = true } = {}) {
    const v = value.replace(/\s+/g, '');
    if (/[^0-9]/.test(v)) return { live: 'Phone number can only contain numbers (0–9)' };
    if (v.length > PHONE_DIGITS) return { live: `Phone number cannot exceed ${PHONE_DIGITS} digits` };
    if (required && !v) return { final: 'Phone number is required' };
    if (v && v.length < PHONE_DIGITS) return { final: `Enter a valid ${PHONE_DIGITS}-digit phone number (${v.length}/${PHONE_DIGITS})` };
    return {};
  },
  email(value, { required = true } = {}) {
    const v = value.trim();
    if (/\s/.test(v)) return { live: 'Email cannot contain spaces' };
    if (required && !v) return { final: 'Email is required' };
    if (v && !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(v)) return { final: 'Enter a valid email address, e.g. name@example.com' };
    return {};
  },
  message(value, { required = false, limit = MESSAGE_WORD_LIMIT, label = 'Message' } = {}) {
    const words = countWords(value);
    if (words > limit) return { live: `${label} cannot exceed ${limit} words (${words}/${limit})` };
    if (required && !value.trim()) return { final: `${label} is required` };
    return {};
  },
  number(value, { required = true, label = 'This field', min = 0, max = Infinity } = {}) {
    const v = value.trim();
    if (/[^0-9]/.test(v)) return { live: `${label} can only contain numbers` };
    if (v && Number(v) > max) return { live: `${label} cannot be more than ${max}` };
    if (required && !v) return { final: `${label} is required` };
    if (v && Number(v) < min) return { final: `${label} must be at least ${min}` };
    return {};
  },
  text(value, { required = true, label = 'This field', max = 120 } = {}) {
    const v = value.trim();
    if (v.length > max) return { live: `${label} cannot be longer than ${max} characters` };
    if (required && !v) return { final: `${label} is required` };
    return {};
  },
  pincode(value, { required = true } = {}) {
    const v = value.trim();
    if (/[^0-9]/.test(v)) return { live: 'PIN code can only contain numbers' };
    if (v.length > 6) return { live: 'PIN code cannot exceed 6 digits' };
    if (required && !v) return { final: 'PIN code is required' };
    if (v && v.length < 6) return { final: 'Enter a valid 6-digit PIN code' };
    return {};
  },
  select(value, { required = true, label = 'an option' } = {}) {
    if (required && !value) return { final: `Please select ${label}` };
    return {};
  },
  checks(value, { required = true, label = 'at least one option' } = {}) {
    if (required && (!value || value.length === 0)) return { final: `Please select ${label}` };
    return {};
  },
  file(value, { required = true, label = 'a file', maxMb = 5, accept = [] } = {}) {
    if (!value) return required ? { final: `Please upload ${label}` } : {};
    if (accept.length && !accept.some((ext) => value.name.toLowerCase().endsWith(ext))) {
      return { live: `Unsupported file type. Allowed: ${accept.join(', ')}` };
    }
    if (value.size > maxMb * 1024 * 1024) return { live: `File is too large. Maximum size is ${maxMb} MB` };
    return {};
  },
  date(value, { required = true, label = 'Date', future = true } = {}) {
    if (required && !value) return { final: `${label} is required` };
    if (value && future) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(`${value}T00:00`) < today) return { live: `${label} cannot be in the past` };
    }
    return {};
  },
};

export const validate = (type, value, opts) => rules[type](value ?? '', opts);

/**
 * Small form hook.
 * schema: { fieldName: { type, initial, ...ruleOptions } }
 */
export function useForm(schema) {
  const initial = useMemo(
    () => Object.fromEntries(Object.entries(schema).map(([k, s]) => [k, s.initial ?? (s.type === 'checks' ? [] : s.type === 'file' ? null : '')])),
    // schema objects are declared inline by callers; the initial state only needs computing once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const refs = useRef({});

  const errorFor = useCallback(
    (name, vals = values, isTouched = touched[name] || submitted) => {
      const { type, ...opts } = schema[name];
      const res = validate(type, vals[name], opts);
      if (res.live) return res.live;
      if (isTouched && res.final) return res.final;
      return '';
    },
    [schema, values, touched, submitted],
  );

  const errors = Object.fromEntries(Object.keys(schema).map((k) => [k, errorFor(k)]));

  const setValue = (name, value) => setValues((v) => ({ ...v, [name]: value }));

  const bind = (name) => ({
    name,
    value: values[name],
    error: errors[name],
    ref: (el) => { refs.current[name] = el; },
    onChange: (e) => setValue(name, e && e.target ? e.target.value : e),
    onBlur: () => setTouched((t) => ({ ...t, [name]: true })),
  });

  /** Validates everything; focuses + scrolls to the first invalid field. Returns true when valid. */
  const validateAll = () => {
    setSubmitted(true);
    const names = Object.keys(schema);
    const firstBad = names.find((k) => errorFor(k, values, true));
    if (firstBad) {
      const el = refs.current[firstBad];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (el.focus) el.focus({ preventScroll: true });
      }
      return false;
    }
    return true;
  };

  const reset = () => {
    setValues(initial);
    setTouched({});
    setSubmitted(false);
  };

  const errorCount = Object.keys(schema).filter((k) => errorFor(k, values, true)).length;

  return { values, errors, setValue, bind, validateAll, reset, submitted, errorCount };
}
