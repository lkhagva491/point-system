'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/i18n'

interface DashboardStatsProps {
  stats: {
    totalUsers: number
    totalAdmins: number
    totalPoints: number
    totalTransactions: number
    totalRewards: number
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  const statCards = [
    {
      name: t('dashboard.totalUsers'),
      value: stats.totalUsers,
      icon: '👥',
      color: 'bg-blue-500',
    },
    {
      name: t('dashboard.totalAdmins'),
      value: stats.totalAdmins,
      icon: '👨‍💼',
      color: 'bg-red-500',
    },
    {
      name: t('dashboard.totalPoints'),
      value: stats.totalPoints.toLocaleString(),
      icon: '⭐',
      color: 'bg-yellow-500',
    },
    {
      name: t('dashboard.totalTransactions'),
      value: stats.totalTransactions,
      icon: '💳',
      color: 'bg-green-500',
    },
    {
      name: t('dashboard.activeRewards'),
      value: stats.totalRewards,
      icon: '🎁',
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {statCards.map((stat) => (
        <div key={stat.name} className="card">
          <div className="flex items-center">
            <div className={`flex-shrink-0 ${stat.color} rounded-md p-3`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {stat.name}
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  {stat.value}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

