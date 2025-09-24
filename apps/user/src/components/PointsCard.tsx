'use client'

import { PointSummary } from '@point-system/shared'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/i18n'

interface PointsCardProps {
  pointSummary: PointSummary
}

export function PointsCard({ pointSummary }: PointsCardProps) {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  return (
    <div className="card mb-6">
      <div className="text-center">
        <div className="text-4xl font-bold text-primary-600 mb-2">
          {pointSummary.balance.toLocaleString()}
        </div>
        <div className="text-lg text-gray-600 mb-4">{t('dashboard.pointsAvailable')}</div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-green-600 font-semibold">{t('dashboard.earned')}</div>
            <div className="text-green-800 font-bold">
              +{pointSummary.totalEarned.toLocaleString()}
            </div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="text-red-600 font-semibold">{t('dashboard.spent')}</div>
            <div className="text-red-800 font-bold">
              -{pointSummary.totalSpent.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

