import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { asset } from '../../lib/asset';
import { ROUTES } from '../../lib/routes';
import { useForm } from '../../lib/validation';
import { useCustomer } from '../../lib/customer';
import { EmailField, FormAlert, TextField } from '../../components/Field';
import './Account.css';

const schema = {
  email: { type: 'email' },
  password: { type: 'password' },
};

export default function Login() {
  const { customer, logIn } = useCustomer();
  const form = useForm(schema);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  if (customer) return <Navigate to={ROUTES.account} replace />;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.validateAll()) return;
    logIn(form.values.email.trim());
    navigate(ROUTES.account);
  };

  return (
    <main className="login-page">
      <section className="container login-top">
        <h1 className="page-title">Login to your Customer Profile</h1>
        <div className="login-panel">
          <form className="login-card" onSubmit={onSubmit} noValidate>
            <p className="login-note">The login credentials are already shared with you by Kalārika via mail</p>

            <div className="login-fields">
              {form.submitted && form.errorCount > 0 && (
                <FormAlert type="error">Please fix the highlighted field{form.errorCount > 1 ? 's' : ''} to log in.</FormAlert>
              )}
              <EmailField label="Enter your Email" placeholder="youremail@gmail.com" {...form.bind('email')} />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••••••"
                suffix={
                  <button
                    type="button"
                    className={`password-toggle ${showPassword ? 'on' : ''}`}
                    aria-pressed={showPassword}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    <img src={asset('account/i-eye.svg')} alt="" width="24" height="24" />
                  </button>
                }
                {...form.bind('password')}
              />
            </div>

            <div className="login-actions">
              <button type="submit" className="btn btn-primary login-submit">
                Login
              </button>
              {/* No destination in the design, so this stays inert */}
              <button type="button" className="login-forgot">
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="container login-help">
        <div className="maroon-panel need-help">
          <h2 className="h3 text-gold">Need help ?</h2>
          <p className="body text-gold">Can’t find credentials or having trouble logging in?</p>
          {/* No destinations in the design, so these stay inert */}
          <div className="need-help-actions">
            <button type="button" className="btn btn-gold help-btn">
              <img src={asset('enroll/i-phone.svg')} alt="" width="24" height="24" />
              Contact Support
            </button>
            <button type="button" className="btn btn-gold help-btn">
              <img src={asset('account/i-mail.svg')} alt="" width="24" height="24" />
              Email Us
            </button>
          </div>
        </div>
      </section>

      <section className="container login-join">
        <div className="join-card">
          <h2 className="h3">Not a customer yet?</h2>
          <p className="body">Start Planning your dream wedding with us or contact us to become our customer.</p>
          <div className="join-actions">
            <Link to={ROUTES.planWedding} className="btn btn-gold">
              Plan your Wedding
            </Link>
            <Link to={ROUTES.contact} className="btn btn-gold">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
