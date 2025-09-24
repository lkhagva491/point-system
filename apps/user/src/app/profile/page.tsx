'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, UpdateUserDto } from '@point-system/shared'
import { Button, Input } from '@point-system/ui'
import { api } from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useToast } from '@/contexts/ToastContext'

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<UpdateUserDto>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const { addToast } = useToast()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      router.push('/')
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData({
        firstName: parsedUser.firstName || '',
        lastName: parsedUser.lastName || '',
        username: parsedUser.username || '',
        email: parsedUser.email || '',
        password: '',
      })
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!user) return

      // Remove empty password from update data
      const updateData = { ...formData }
      if (!updateData.password) {
        delete updateData.password
      }

      const response = await api.patch(`/users/profile/${user._id}`, updateData)
      const updatedUser = response.data

      // Update localStorage with new user data
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      addToast({
        type: 'success',
        title: t('profile.profileUpdated'),
        message: t('profile.profileUpdatedMessage'),
      })
      
      // Clear password field
      setFormData(prev => ({ ...prev, password: '' }))
    } catch (err: any) {
      addToast({
        type: 'error',
        title: t('profile.profileUpdateError'),
        message: err.response?.data?.message || t('profile.profileUpdateErrorMessage'),
      })
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

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('dashboard.loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">⭐ {t('system.pointSystem')}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <span className="text-gray-700">{t('dashboard.welcomeBack', { name: user.firstName })}</span>
              <button
                onClick={() => router.push('/dashboard')}
                className="btn btn-secondary"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-outline"
              >
                {t('auth.logout')}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('profile.editProfile')}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label={t('auth.firstName')}
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Input
                  label={t('auth.lastName')}
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Input
                label={t('auth.username')}
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>

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
                label={`${t('auth.password')} (${t('common.optional')})`}
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t('profile.enterNewPassword')}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                onClick={() => router.push('/dashboard')}
                variant="outline"
              >
                {t('dashboard.cancel')}
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                loading={isLoading}
                variant="primary"
              >
                {t('profile.updateProfile')}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
