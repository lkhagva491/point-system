'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, PointSummary, Reward } from '@point-system/shared'
import { api } from '@/lib/api'
import { Header } from '@/components/Header'
import { PointsCard } from '@/components/PointsCard'
import { RecentTransactions } from '@/components/RecentTransactions'
import { RewardsGrid } from '@/components/RewardsGrid'
import { TransactionRequestForm } from '@/components/TransactionRequestForm'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/i18n'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [pointSummary, setPointSummary] = useState<PointSummary | null>(null)
  const [rewards, setRewards] = useState<Reward[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { language } = useLanguage()
  const { t } = useTranslation(language)

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
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/')
      return
    }
  }, [router])

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    try {
      if (!user) return
      
      const [pointsRes, transactionsRes, rewardsRes] = await Promise.all([
        api.get(`/points/user/${user._id}`),
        api.get(`/points/user/${user._id}/transactions`),
        api.get('/rewards/active'),
      ])

      const pointSummary = {
        userId: user._id,
        balance: pointsRes.data?.points || 0,
        totalEarned: 0, // We'll calculate this from transactions
        totalSpent: 0,  // We'll calculate this from transactions
        recentTransactions: transactionsRes.data || [],
      }

      // Calculate totals from transactions
      if (transactionsRes.data && Array.isArray(transactionsRes.data)) {
        transactionsRes.data.forEach((transaction: any) => {
          if (transaction.type === 'deposit' && transaction.status === 'approved') {
            pointSummary.totalEarned += transaction.points
          } else if (transaction.type === 'withdrawal' && transaction.status === 'approved') {
            pointSummary.totalSpent += transaction.points
          }
        })
      }

      setPointSummary(pointSummary)
      setRewards(rewardsRes.data || [])
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
      // Set default values if API calls fail
      setPointSummary({
        userId: user?._id || '',
        balance: 0,
        totalEarned: 0,
        totalSpent: 0,
        recentTransactions: [],
      })
      setRewards([])
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('dashboard.loading')}</p>
        </div>
      </div>
    )
  }

  if (!user || !pointSummary) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-4">{t('dashboard.errorLoading')}</div>
          <p className="text-gray-600 mb-4">
            {!user ? t('dashboard.userDataNotFound') : t('dashboard.dashboardDataNotLoaded')}
          </p>
          <button
            onClick={() => router.push('/')}
            className="btn btn-primary"
          >
            {t('dashboard.goToLogin')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('dashboard.welcomeBack', { name: user.firstName })}
          </h1>
          <p className="text-gray-600 mt-2">
            {t('dashboard.managePoints')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <PointsCard pointSummary={pointSummary} />
            <TransactionRequestForm userId={user._id} onSuccess={loadDashboardData} />
            <RecentTransactions transactions={pointSummary.recentTransactions} />
          </div>
          
          <div className="lg:col-span-2">
            <RewardsGrid rewards={rewards} userPoints={pointSummary.balance} userId={user._id} />
          </div>
        </div>
      </main>
    </div>
  )
}
