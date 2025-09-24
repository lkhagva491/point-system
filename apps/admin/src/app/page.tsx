'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoginDto } from '@point-system/shared'
import { Button, Input } from '@point-system/ui'
import { api } from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginDto>({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await api.post('/auth/login', formData)
      const { token, user } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center mb-4">
            <LanguageSwitcher />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('auth.adminLogin')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('auth.signInAdminAccount')}
          </p>
        </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  label={t('auth.emailAddress')}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={t('auth.emailAddress')}
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  label={t('auth.password')}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder={t('auth.password')}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}

              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  loading={isLoading}
                  variant="primary"
                  className="w-full"
                >
                  {t('auth.signIn')}
                </Button>
              </div>
            </form>
      </div>
    </div>
  )
}

