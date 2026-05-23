import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, Mail, Sparkles } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useUIStore } from '../../store/uiStore'
import { login as loginAPI } from '../../api/auth.api'
import { USER_ROLES } from '../../utils/constants'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import usePageTitle from '../../utils/usePageTitle'

export default function Login() {
  const navigate = useNavigate()
  const { login, setLoading, setError, loading } = useAuthStore()
  const { addToast } = useUIStore()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [rememberMe, setRememberMe] = useState(false)

  usePageTitle('Login')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userData = await loginAPI(formData.email, formData.password)
      login(userData)

      if (!rememberMe) {
        localStorage.removeItem('auticare_remember_me')
      } else {
        localStorage.setItem('auticare_remember_me', 'true')
      }

      switch (userData.role) {
        case USER_ROLES.DOCTOR:
          navigate('/doctor/home')
          break
        case USER_ROLES.THERAPIST:
          navigate('/therapist/home')
          break
        case USER_ROLES.PARENT:
          navigate('/parent/home')
          break
        default:
          navigate('/')
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorData = error.response?.data;
      
      let errorMsg = 'Please check your credentials and try again.';
      
      if (error.message === 'Network Error') {
        errorMsg = 'Cannot connect to the server. Please ensure the backend is running and the API URL is correct.';
      } else {
        errorMsg = errorData?.detail || errorData?.title || errorData?.message || error.message || errorMsg;
      }

      setError(errorMsg)
      addToast({
        type: 'error',
        title: 'Login failed',
        message: errorMsg,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-[var(--hero-from)] via-[var(--hero-via)] to-[var(--hero-to)] flex items-center justify-center px-4 py-12 text-[var(--ink)]">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
        <div className="space-y-6 slide-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--card-alt)] px-4 py-2 text-sm font-medium text-[var(--muted)] border border-[var(--border)]">
            <Sparkles className="h-4 w-4" />
            Trusted by clinicians and families
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--ink)] leading-tight">
            Welcome back to AutiCare
          </h1>
          <p className="text-lg text-[var(--muted)]">
            Continue collaborating on therapy plans, progress tracking, and daily support with a secure, streamlined workspace.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Doctor portal', value: 'Clinical insights' },
              { label: 'Therapist hub', value: 'Session planning' },
              { label: 'Parent view', value: 'Daily guidance' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm">
                <p className="text-sm font-semibold text-[var(--ink)]">{item.label}</p>
                <p className="text-xs text-[var(--muted-2)] mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--card)] p-8 rounded-3xl shadow-xl border border-[var(--border)] slide-up">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[var(--ink)]">Login</h2>
            <p className="text-sm text-[var(--muted)] mt-1">Access your personalized dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--muted)] mb-2">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[var(--muted-2)] absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  className="input-field pl-9"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@auticare.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--muted)] mb-2">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[var(--muted-2)] absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  className="input-field pl-9"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="********"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-[var(--muted)]">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                Remember me
              </label>
              <button type="button" className="text-primary-600 hover:text-primary-700">
                Forgot password?
              </button>
            </div>

            <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-base" disabled={loading}>
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  Signing in
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[var(--muted)]">
            Don&apos;t have an account?{' '}
            <NavLink to="/signup" className="text-primary-600 font-semibold hover:text-primary-700">
              Sign up
            </NavLink>
          </div>


        </div>
      </div>
    </div>
  )
}
