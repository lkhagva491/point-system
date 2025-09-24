'use client'

import { User } from '@point-system/shared'
import { 
  HomeIcon, 
  UsersIcon, 
  CreditCardIcon, 
  GiftIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/i18n'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onLogout: () => void
  user: User
}

export function Sidebar({ activeTab, onTabChange, onLogout, user }: SidebarProps) {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  const navigation = [
    { name: t('dashboard.dashboard'), tab: 'dashboard', icon: HomeIcon },
    { name: t('dashboard.users'), tab: 'users', icon: UsersIcon },
    { name: t('dashboard.admins'), tab: 'admins', icon: UsersIcon },
    { name: t('dashboard.transactions'), tab: 'transactions', icon: CreditCardIcon },
    { name: t('dashboard.rewards'), tab: 'rewards', icon: GiftIcon },
  ]

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-gray-900">{t('system.pointSystemAdmin')}</h1>
        </div>
        
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = activeTab === item.tab
              return (
                <button
                  key={item.name}
                  onClick={() => onTabChange(item.tab)}
                  className={`${
                    isActive
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left`}
                >
                  <item.icon
                    className={`${
                      isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                    } mr-3 flex-shrink-0 h-6 w-6`}
                  />
                  {item.name}
                </button>
              )
            })}
          </nav>
        </div>
        
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user.firstName || 'Unknown'} {user.lastName || 'User'}</p>
              <p className="text-xs text-gray-500">{user.email || 'No email'}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="ml-auto flex items-center text-gray-400 hover:text-gray-600"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

