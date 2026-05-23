import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  ArrowRight,
  CheckCircle,
  HeartHandshake,
  Lock,
  Mail,
  Phone,
  Stethoscope,
  User,
  Users,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card'
import { USER_ROLES } from '../../utils/constants'
import usePageTitle from '../../utils/usePageTitle'
import { signupSchema } from '../../utils/validators'
import { register as signupAPI, login as loginAPI } from '../../api/auth.api'
import { useUIStore } from '../../store/uiStore'
import { useAuthStore } from '../../store/authStore'

const roleOptions = [
  {
    value: USER_ROLES.DOCTOR,
    label: 'Doctor',
    description: 'Create a clinical care account',
    icon: Stethoscope,
  },
  {
    value: USER_ROLES.THERAPIST,
    label: 'Therapist',
    description: 'Set up your therapy workspace',
    icon: HeartHandshake,
  },
  {
    value: USER_ROLES.PARENT,
    label: 'Parent',
    description: 'Join to support your child',
    icon: Users,
  },
]

const doctorFields = [
  { name: 'specialization', label: 'Specialization', type: 'text', placeholder: 'Pediatric Neurology' },
  { name: 'clinicHospital', label: 'Clinic/Hospital', type: 'text', placeholder: 'Sunrise Medical Center' },
  { name: 'yearsOfExperience', label: 'Years of Experience', type: 'number', placeholder: '8' },
]

const therapistFields = [
  { name: 'therapyType', label: 'Therapy Type', type: 'text', placeholder: 'Speech Therapy' },
  { name: 'experienceYears', label: 'Experience Years', type: 'number', placeholder: '5' },
]

const parentFields = [
  { name: 'childName', label: 'Child Name', type: 'text', placeholder: 'Liam Johnson' },
  { name: 'childAge', label: 'Child Age', type: 'number', placeholder: '6' },
]

const defaultValues = {
  role: USER_ROLES.PARENT,
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  specialization: '',
  clinicHospital: '',
  yearsOfExperience: '',
  therapyType: '',
  experienceYears: '',
  childName: '',
  childAge: '',
  behavior: '',
}

function Field({ label, name, register, error, type = 'text', placeholder }) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-semibold text-[var(--ink)]">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        min={type === 'number' ? '0' : undefined}
        {...register(name)}
        className="input-field w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-emerald-400"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
}

export default function Signup() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [submitMessage, setSubmitMessage] = useState('')
  const { addToast } = useUIStore()
  const { login } = useAuthStore()

  usePageTitle('Sign Up')

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues,
    shouldUnregister: true,
  })

  const selectedRole = watch('role')

  useEffect(() => {
    const stateData = location.state || {}
    const emailParam = searchParams.get('email')
    const roleParam = searchParams.get('role')
    const nameParam = searchParams.get('name')
    const nextRole = roleParam || stateData.role

    reset({
      ...defaultValues,
      email: stateData.email || emailParam || '',
      role: Object.values(USER_ROLES).includes(nextRole) ? nextRole : USER_ROLES.PARENT,
      fullName: stateData.name || nameParam || '',
    })
  }, [location.state, reset, searchParams])

  const onSubmit = async (data) => {
    try {
      const payload = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: data.role,
        phone: data.phone,
        specialization: data.role === USER_ROLES.PARENT ? "" : (data.specialization || data.therapyType || ""),
        licenseNumber: data.licenseNumber || "",
        nationalId: data.nationalId || "",
      };
      
      const signupResponse = await signupAPI(payload);
      
      addToast({
        type: 'success',
        title: 'Account created',
        message: 'Registration successful! Welcome to AutiCare.',
      });

      // Log in using the response from registration
      if (signupResponse && signupResponse.token) {
        login(signupResponse);
        setSubmitMessage('Account created successfully! Redirecting...');
        
        // Redirect based on role
        setTimeout(() => {
          switch (signupResponse.role) {
            case USER_ROLES.DOCTOR:
              navigate('/doctor/home');
              break;
            case USER_ROLES.THERAPIST:
              navigate('/therapist/home');
              break;
            case USER_ROLES.PARENT:
              navigate('/parent/questionnaire');
              break;
            default:
              navigate('/');
          }
        }, 1500);
      } else {
        // Fallback if token is missing (should not happen with AuthResponse)
        setSubmitMessage('Account created! Please log in.');
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (error) {
      console.error('Signup error:', error);
      const errorData = error.response?.data;
      
      let errorMsg = 'Failed to create account. Please try again.';
      
      if (error.message === 'Network Error' || !error.response) {
        errorMsg = 'Cannot connect to the server. Please ensure the backend is running and your internet connection is stable.';
      } else if (errorData) {
        // Handle ASP.NET Core Identity validation errors
        if (errorData.errors && typeof errorData.errors === 'object') {
          errorMsg = Object.values(errorData.errors).flat().join(' ');
        } else {
          errorMsg = errorData.detail || errorData.error || errorData.title || errorData.message || errorMsg;
        }
      } else {
        errorMsg = error.message || errorMsg;
      }
      
      addToast({
        type: 'error',
        title: 'Signup failed',
        message: errorMsg,
      });
    }
  };


  const renderRoleFields = () => {
    if (selectedRole === USER_ROLES.DOCTOR) {
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {doctorFields.map((field) => (
            <Field key={field.name} {...field} register={register} error={errors[field.name]?.message} />
          ))}
        </div>
      )
    }

    if (selectedRole === USER_ROLES.THERAPIST) {
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {therapistFields.map((field) => (
            <Field key={field.name} {...field} register={register} error={errors[field.name]?.message} />
          ))}
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {parentFields.map((field) => (
            <Field key={field.name} {...field} register={register} error={errors[field.name]?.message} />
          ))}
        </div>
        <div className="space-y-2">
          <label htmlFor="behavior" className="text-sm font-semibold text-[var(--ink)]">
            Behavior
          </label>
          <textarea
            id="behavior"
            rows="4"
            placeholder="Describe the main behaviors or support needs"
            {...register('behavior')}
            className="input-field w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-emerald-400"
          />
          {errors.behavior && <p className="text-sm text-red-600">{errors.behavior.message}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[var(--hero-from)] via-[var(--hero-via)] to-[var(--hero-to)] px-4 py-10 text-[var(--ink)]">
      <div className="mx-auto max-w-5xl">
        <Card className="overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-0 shadow-2xl">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative overflow-hidden bg-[var(--ink)] px-8 py-10 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.28),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.26),transparent_42%)]" />
              <div className="relative space-y-6">
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100">
                  Join AutiCare
                </span>
                <div className="space-y-3">
                  <h1 className="text-4xl font-display font-bold leading-tight">
                    Create the right account for your care role
                  </h1>
                  <p className="max-w-md text-sm text-slate-200">
                    Start with the essentials, then tailor the form for doctors, therapists, or parents in one place.
                  </p>
                </div>
                <div className="space-y-3">
                  {roleOptions.map((role) => {
                    const Icon = role.icon
                    const isActive = selectedRole === role.value

                    return (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => {
                          setValue('role', role.value, { shouldValidate: true })
                          setSubmitMessage('')
                        }}
                        className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-all ${
                          isActive
                            ? 'border-emerald-300 bg-white/15 shadow-lg'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{role.label}</p>
                          <p className="text-sm text-slate-200">{role.description}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="px-6 py-8 sm:px-8 sm:py-10">
              <CardHeader className="mb-8 px-0">
                <CardTitle className="text-3xl text-[var(--ink)]">Sign up</CardTitle>
                <CardDescription className="mt-2 text-sm text-[var(--muted)]">
                  Complete the details below. The visible fields update automatically when you switch roles.
                </CardDescription>
              </CardHeader>

              <CardContent className="px-0">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <input type="hidden" {...register('role')} />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <label htmlFor="fullName" className="text-sm font-semibold text-[var(--ink)]">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-2)]" />
                        <input
                          id="fullName"
                          type="text"
                          placeholder="Alex Johnson"
                          {...register('fullName')}
                          className="input-field w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] py-3 pl-11 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>
                      {errors.fullName && <p className="text-sm text-red-600">{errors.fullName.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-[var(--ink)]">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-2)]" />
                        <input
                          id="email"
                          type="email"
                          placeholder="you@auticare.com"
                          {...register('email')}
                          className="input-field w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] py-3 pl-11 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>
                      {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-semibold text-[var(--ink)]">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-2)]" />
                        <input
                          id="phone"
                          type="tel"
                          placeholder="01234567890"
                          {...register('phone')}
                          className="input-field w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] py-3 pl-11 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>
                      {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-semibold text-[var(--ink)]">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-2)]" />
                        <input
                          id="password"
                          type="password"
                          placeholder="Create a strong password"
                          {...register('password')}
                          className="input-field w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] py-3 pl-11 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>
                      {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-semibold text-[var(--ink)]">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-2)]" />
                        <input
                          id="confirmPassword"
                          type="password"
                          placeholder="Repeat your password"
                          {...register('confirmPassword')}
                          className="input-field w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] py-3 pl-11 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-[var(--border)] bg-[var(--card-alt)] p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-semibold text-[var(--ink)]">Role details</h2>
                        <p className="text-sm text-[var(--muted)]">Additional information for your selected role.</p>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                        {selectedRole}
                      </span>
                    </div>
                    {renderRoleFields()}
                  </div>

                  {submitMessage && (
                    <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" />
                      <p className="text-sm">{submitMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-[var(--surface)] shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? 'Submitting...' : 'Create account'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-[var(--muted)]">
                  Already have an account?{' '}
                  <NavLink to="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">
                    Login
                  </NavLink>
                </p>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
