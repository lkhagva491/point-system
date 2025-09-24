'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Point, Transaction, Reward } from '@point-system/shared'
import { api } from '@/lib/api'
import { Sidebar } from '@/components/Sidebar'
import { DashboardStats } from '@/components/DashboardStats'
import { UsersTable } from '@/components/UsersTable'
import { AdminsTable } from '@/components/AdminsTable'
import { TransactionsTable } from '@/components/TransactionsTable'
import { RewardsTable } from '@/components/RewardsTable'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalPoints: 0,
    totalTransactions: 0,
    totalRewards: 0,
  })
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

    setUser(JSON.parse(userData))
    loadDashboardData()
  }, [router])

  const loadDashboardData = async () => {
    try {
      const [usersRes, adminsRes, transactionsRes, rewardsRes] = await Promise.all([
        api.get('/users'),
        api.get('/admins'),
        api.get('/points/transactions'),
        api.get('/rewards'),
      ])

      const totalPoints = usersRes.data.reduce((sum: number, user: any) => sum + (user.point || 0), 0)

      setStats({
        totalUsers: usersRes.data.length,
        totalAdmins: adminsRes.data.length,
        totalPoints,
        totalTransactions: transactionsRes.data.length || 0,
        totalRewards: rewardsRes.data.length,
      })
    } catch (error: any) {
      console.error('Failed to load dashboard data:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) {
    return <div>{t('dashboard.loading')}</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        user={user}
      />
      
      <div className="lg:pl-64">
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                {activeTab === 'dashboard' && t('dashboard.dashboard')}
                {activeTab === 'users' && t('dashboard.users')}
                {activeTab === 'admins' && t('dashboard.admins')}
                {activeTab === 'transactions' && t('dashboard.transactions')}
                {activeTab === 'rewards' && t('dashboard.rewards')}
              </h1>
              <LanguageSwitcher />
            </div>
            
            {activeTab === 'dashboard' && (
              <div>
                <DashboardStats stats={stats} />
              </div>
            )}
            
            {activeTab === 'users' && (
              <div>
                <UsersTable />
              </div>
            )}
            
            {activeTab === 'admins' && (
              <div>
                <AdminsTable />
              </div>
            )}
            
            {activeTab === 'transactions' && (
              <div>
                <TransactionsTable />
              </div>
            )}
            
            {activeTab === 'rewards' && (
              <div>
                <RewardsTable />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
