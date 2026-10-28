import { createContext, useCallback, useContext, useMemo, useState } from 'react';

/*
 * Front-end only customer session. There is no backend, so any valid email and
 * password "logs in"; the session is kept in localStorage until Log Out.
 */
const KEY = 'kalarika-customer';
const CustomerContext = createContext(null);

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || null;
  } catch {
    return null;
  }
};

const nameFromEmail = (email) => {
  const first = email.split('@')[0].split(/[._\-+0-9]/).find(Boolean) || email.split('@')[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
};

export function CustomerProvider({ children }) {
  const [customer, setCustomer] = useState(read);

  const logIn = useCallback((email) => {
    const next = { email, name: nameFromEmail(email) };
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — the session lasts until the page is reloaded */
    }
    setCustomer(next);
  }, []);

  const logOut = useCallback(() => {
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* nothing stored */
    }
    setCustomer(null);
  }, []);

  const value = useMemo(() => ({ customer, logIn, logOut }), [customer, logIn, logOut]);
  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
}

export const useCustomer = () => useContext(CustomerContext);
