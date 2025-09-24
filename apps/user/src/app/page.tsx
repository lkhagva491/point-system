'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoginDto, CreateUserDto } from '@point-system/shared'
import { Button, Input } from '@point-system/ui'
import { api } from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState<LoginDto & Partial<CreateUserDto>>({
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
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
      const endpoint = isLogin ? '/auth/login' : '/auth/register'
      const response = await api.post(endpoint, formData)
      const { token, user } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || `${isLogin ? 'Login' : 'Registration'} failed`)
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <LanguageSwitcher />
            </div>
            <h1 className="text-4xl font-bold text-primary-600 mb-2">⭐ {t('system.pointSystem')}</h1>
            <p className="text-gray-600">{t('system.earnPointsAndRewards')}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex mb-6">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-lg ${
                  isLogin
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('auth.login')}
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-lg ${
                  !isLogin
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('auth.register')}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <Input
                      label={t('auth.firstName')}
                      name="firstName"
                      type="text"
                      required={!isLogin}
                      value={formData.firstName || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Input
                      label={t('auth.lastName')}
                      name="lastName"
                      type="text"
                      required={!isLogin}
                      value={formData.lastName || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Input
                      label={t('auth.username')}
                      name="username"
                      type="text"
                      required={!isLogin}
                      value={formData.username || ''}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              
              <div>
                <Input
                  label={t('auth.email')}
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Input
                  label={t('auth.password')}
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                loading={isLoading}
                variant="primary"
                className="w-full"
              >
                {isLogin ? t('auth.signIn') : t('auth.createAccount')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

