'use client'

import { useState } from 'react'
import { Reward } from '@point-system/shared'
import { api } from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { useToast } from '@/contexts/ToastContext'

interface RewardsGridProps {
  rewards: Reward[]
  userPoints: number
  userId: string
}

export function RewardsGrid({ rewards, userPoints, userId }: RewardsGridProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const { addToast } = useToast()

  const handleRedeem = async (rewardId: string) => {
    setLoading(rewardId)
    try {
      await api.post('/rewards/redeem', { userId, rewardId })
      addToast({
        type: 'success',
        title: t('dashboard.rewardRedeemed'),
        message: t('dashboard.rewardRedeemedMessage'),
      })
    } catch (error: any) {
      addToast({
        type: 'error',
        title: t('dashboard.rewardRedeemError'),
        message: error.response?.data?.message || t('dashboard.rewardRedeemErrorMessage'),
      })
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('dashboard.availableRewards')}</h3>
      
      {rewards.length === 0 ? (
        <p className="text-gray-500 text-center py-8">{t('dashboard.noRewards')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => {
            const canRedeem = userPoints >= reward.pointsRequired
            const isRedeeming = loading === reward._id
            
            return (
              <div key={reward._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-gray-900">{reward.name}</h4>
                  <span className="text-sm font-medium text-primary-600">
                    {reward.pointsRequired} pts
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                
                <button
                  onClick={() => handleRedeem(reward._id)}
                  disabled={!canRedeem || isRedeeming}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    canRedeem
                      ? 'bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isRedeeming ? t('dashboard.redeeming') : canRedeem ? t('dashboard.redeemNow') : t('dashboard.insufficientPoints')}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

