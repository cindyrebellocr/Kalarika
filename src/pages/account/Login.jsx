import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { asset } from '../../lib/asset';
import { ROUTES } from '../../lib/routes';
import { useForm } from '../../lib/validation';
import { useCustomer } from '../../lib/customer';
import { EmailField, FormAlert, TextField } from '../../components/Field';
import './Login.css';

const schema = {
  email: { type: 'email' },
  password: { type: 'password' },
};

export default function Login() {
  const { customer, logIn, logOut } = useCustomer();
  const form = useForm(schema);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();
  const { state } = useLocation();
  const from = state?.from && state.from !== ROUTES.login ? state.from : ROUTES.home;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.validateAll()) return;
    logIn(form.values.email.trim(), remember);
    navigate(from, { replace: true });
  };

  return (
    <main className="login-page">
      <section className="container">
        <div className="login-panel">
          <div className="login-visual">
            <img src={asset('home/hero-1.jpg')} alt="" />
            <div className="login-visual-text">
              <p className="h3">Crafting sacred moments</p>
              <p className="intro">Pick up where you left off and keep shaping a celebration rooted in heritage and craft.</p>
            </div>
          </div>

          <div className="login-card">
            {customer ? (
              <div className="login-done" role="status">
                <h1 className="h2">You’re logged in</h1>
                <p className="body">
                  Logged in as <strong>{customer.email}</strong>.
                </p>
                <div className="login-done-actions">
                  <Link to={ROUTES.home} className="btn btn-primary">
                    Go to Home
                  </Link>
                  <button type="button" className="btn btn-outline" onClick={logOut}>
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <form className="login-form" onSubmit={onSubmit} noValidate>
                <div className="login-head">
                  <h1 className="h2">Customer Log In</h1>
                  <p className="body">Welcome back to Kalārika. Log in with the email you used to contact us.</p>
                </div>

                {form.submitted && form.errorCount > 0 && (
                  <FormAlert type="error">Please fix the highlighted field{form.errorCount > 1 ? 's' : ''} to log in.</FormAlert>
                )}

                <EmailField label="Email" required icon={asset('enroll/i-mail.svg')} placeholder="youremail@gmail.com" {...form.bind('email')} />
                <TextField
                  label="Password"
                  required
                  icon={asset('common/lock.svg')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="At least 8 characters"
                  suffix={
                    <button
                      type="button"
                      className="password-toggle"
                      aria-pressed={showPassword}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword((s) => !s)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  }
                  {...form.bind('password')}
                />

                <label className="login-remember">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                  Keep me logged in
                </label>

                <button type="submit" className="btn btn-primary login-submit">
                  Log In
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
