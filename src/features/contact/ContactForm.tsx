import { useId, useRef, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Check, Send } from 'lucide-react';
import { apiPost, ApiNotConfiguredError } from '@/lib/api';
import { contactConfig, hasBackend } from '@/config/site';
import { visuallyHidden } from '@/theme/a11y';

const PROJECT_TYPES = [
  'Custom software',
  'Web application',
  'Mobile application',
  'Enterprise system',
  'Cloud / DevOps',
  'Blockchain / Web3',
  'Smart contracts',
  'AI solution',
  'Technology consulting',
  'Something else',
];

const BUDGET_RANGES = [
  'Not yet determined',
  'Under 25k',
  '25k – 75k',
  '75k – 150k',
  '150k+',
  'Retained / ongoing',
];

const CONTACT_PREFERENCES = ['Email', 'Phone call', 'Video call'];

interface FormState {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  preferredContact: string;
  message: string;
  /** Honeypot. Real users never see or fill this. */
  website: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  preferredContact: 'Email',
  message: '',
  website: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured';

/** Validation runs on blur and on submit — never on every keystroke. */
function validate(values: FormState): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) {
    errors.name = 'Enter your name so we know who we are replying to.';
  }

  if (!values.email.trim()) {
    errors.email = 'Enter an email address so we can reply.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'That does not look like a complete email address.';
  }

  if (!values.projectType) {
    errors.projectType = 'Choose the closest match — it routes your enquiry to the right engineer.';
  }

  if (!values.message.trim()) {
    errors.message = 'Describe the problem, even briefly.';
  } else if (values.message.trim().length < 20) {
    errors.message = 'A little more detail helps us give a useful answer (20 characters minimum).';
  }

  return errors;
}

/**
 * Project enquiry form.
 *
 * Behaviour when no backend is configured is deliberate: the form validates
 * normally, then reports plainly that submissions are not connected and offers
 * a mail fallback. It never displays a success state for a request that was
 * not actually sent.
 */
export function ContactForm({ defaults }: { defaults?: Partial<FormState> }) {
  const [values, setValues] = useState<FormState>({ ...EMPTY, ...defaults });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const formId = useId();
  const statusRef = useRef<HTMLDivElement | null>(null);

  const field = (key: keyof FormState) => ({
    value: values[key],
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [key]: event.target.value }));
      // Clear an existing error as soon as the user starts correcting it.
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    onBlur: () => {
      setTouched((prev) => ({ ...prev, [key]: true }));
      const next = validate(values);
      setErrors((prev) => ({ ...prev, [key]: next[key] }));
    },
    error: Boolean(touched[key] && errors[key]),
    helperText: touched[key] && errors[key] ? errors[key] : undefined,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      company: true,
      projectType: true,
      budget: true,
      message: true,
      preferredContact: true,
    });

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first field with a problem.
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`${formId}-${firstKey}`)?.focus();
      return;
    }

    // Silently accept and discard: a bot filled the hidden field.
    if (values.website) return;

    setStatus('submitting');
    setServerMessage('');

    try {
      await apiPost('/contact', {
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        projectType: values.projectType,
        budget: values.budget,
        preferredContact: values.preferredContact,
        message: values.message.trim(),
      });
      setStatus('success');
      setValues({ ...EMPTY, ...defaults });
      setTouched({});
    } catch (error) {
      if (error instanceof ApiNotConfiguredError) {
        setStatus('unconfigured');
      } else {
        setStatus('error');
        setServerMessage(
          error instanceof Error ? error.message : 'The request could not be completed.',
        );
      }
    } finally {
      // Announce the outcome to assistive technology without stealing focus.
      window.requestAnimationFrame(() => statusRef.current?.scrollIntoView({ block: 'nearest' }));
    }
  };

  const mailtoHref = () => {
    const subject = encodeURIComponent(`Project enquiry — ${values.projectType || 'General'}`);
    const body = encodeURIComponent(
      [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        values.company && `Company: ${values.company}`,
        `Project type: ${values.projectType}`,
        values.budget && `Budget: ${values.budget}`,
        `Preferred contact: ${values.preferredContact}`,
        '',
        values.message,
      ]
        .filter(Boolean)
        .join('\n'),
    );
    return `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
  };

  if (status === 'success') {
    return (
      <Box
        ref={statusRef}
        role="status"
        aria-live="polite"
        sx={{
          p: { xs: 4, md: 5 },
          border: '1px solid',
          borderColor: 'hairline',
          borderRadius: 1,
          bgcolor: 'surfaceRaised',
        }}
      >
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            borderRadius: '50%',
            bgcolor: 'success.main',
            color: 'background.default',
            mb: 2.5,
          }}
        >
          <Check size={22} strokeWidth={2.5} />
        </Box>

        <Typography variant="h3" component="h3">
          Enquiry received.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary', maxWidth: '54ch' }}>
          An engineer will read it and reply directly. If your enquiry is time-critical, say so in a
          follow-up and we will prioritise it.
        </Typography>

        <Button variant="outlined" onClick={() => setStatus('idle')} sx={{ mt: 3.5 }}>
          Send another enquiry
        </Button>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate aria-labelledby={`${formId}-legend`}>
      <Typography
        variant="label"
        component="h3"
        id={`${formId}-legend`}
        sx={{ color: 'text.disabled', mb: 3 }}
      >
        Project enquiry
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
          gap: 2.5,
        }}
      >
        <TextField
          {...field('name')}
          id={`${formId}-name`}
          label="Your name"
          required
          autoComplete="name"
          fullWidth
        />

        <TextField
          {...field('email')}
          id={`${formId}-email`}
          label="Email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          fullWidth
        />

        <TextField
          {...field('company')}
          id={`${formId}-company`}
          label="Company"
          autoComplete="organization"
          fullWidth
        />

        <TextField
          {...field('preferredContact')}
          id={`${formId}-preferredContact`}
          label="Preferred contact"
          select
          fullWidth
        >
          {CONTACT_PREFERENCES.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          {...field('projectType')}
          id={`${formId}-projectType`}
          label="Project type"
          select
          required
          fullWidth
        >
          {PROJECT_TYPES.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          {...field('budget')}
          id={`${formId}-budget`}
          label="Indicative budget"
          select
          fullWidth
          helperText={
            touched.budget && errors.budget
              ? errors.budget
              : 'Optional. It helps us propose a realistic scope.'
          }
        >
          {BUDGET_RANGES.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ gridColumn: '1 / -1' }}>
          <TextField
            {...field('message')}
            id={`${formId}-message`}
            label="What are you trying to build?"
            required
            multiline
            minRows={5}
            fullWidth
            helperText={
              touched.message && errors.message
                ? errors.message
                : 'The problem, the constraints and the deadline are the three most useful things to include.'
            }
          />
        </Box>
      </Box>

      {/* Honeypot: visually and programmatically hidden from real users. */}
      <Box
        aria-hidden="true"
        sx={visuallyHidden}
      >
        <label htmlFor={`${formId}-website`}>Leave this field empty</label>
        <input
          id={`${formId}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => setValues((prev) => ({ ...prev, website: event.target.value }))}
        />
      </Box>

      <Box ref={statusRef} aria-live="polite" sx={{ mt: status === 'idle' ? 0 : 3 }}>
        {status === 'unconfigured' && (
          <Alert severity="info" icon={false}>
            <AlertTitle sx={{ fontWeight: 600 }}>Form submission is not connected yet</AlertTitle>
            <Typography variant="body2" component="p">
              This deployment has no enquiry endpoint configured, so nothing was sent. Your details
              have not been transmitted anywhere.
              {contactConfig.email
                ? ' Use the button below to send the same information by email instead.'
                : ' Please use the contact details published elsewhere on this site.'}
            </Typography>
            {contactConfig.email && (
              <Button component="a" href={mailtoHref()} variant="outlined" size="small" sx={{ mt: 2 }}>
                Send by email instead
              </Button>
            )}
          </Alert>
        )}

        {status === 'error' && (
          <Alert severity="error" icon={false}>
            <AlertTitle sx={{ fontWeight: 600 }}>The enquiry could not be sent</AlertTitle>
            <Typography variant="body2" component="p">
              {serverMessage} Nothing was lost — press Send again, or{' '}
              {contactConfig.email ? 'email us directly.' : 'try again shortly.'}
            </Typography>
          </Alert>
        )}
      </Box>

      <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
        <Button
          type="submit"
          size="large"
          disabled={status === 'submitting'}
          startIcon={
            status === 'submitting' ? (
              <CircularProgress size={16} color="inherit" aria-hidden="true" />
            ) : (
              <Send size={16} strokeWidth={2} aria-hidden="true" />
            )
          }
        >
          {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
        </Button>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          Fields marked <abbr title="required">*</abbr> are required.
        </Typography>
      </Box>

      {!hasBackend && status === 'idle' && (
        <Typography variant="caption" component="p" sx={{ mt: 2, color: 'text.disabled' }}>
          Note: no enquiry endpoint is configured for this deployment yet.
        </Typography>
      )}
    </Box>
  );
}
