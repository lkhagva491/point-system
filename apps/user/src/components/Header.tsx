'use client'

import { User } from '@point-system/shared'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { LanguageSwitcher } from './LanguageSwitcher'

interface HeaderProps {
  user: User
  onLogout: () => void
}

export function Header({ user, onLogout }: HeaderProps) {
  const router = useRouter()
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary-600">⭐ {t('system.pointSystem')}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <div className="text-sm text-gray-700">
              {user.firstName} {user.lastName}
            </div>
            <button
              onClick={() => router.push('/profile')}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              {t('profile.profile')}
            </button>
            <button
              onClick={onLogout}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              {t('auth.logout')}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

