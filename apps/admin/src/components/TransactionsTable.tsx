'use client'

import { useState, useEffect } from 'react'
import { TransactionRequest, TransactionStatus } from '@point-system/shared'
import { api } from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/i18n'

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<TransactionRequest[]>([])
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = async () => {
    try {
      const response = await api.get('/points/transactions')
      setTransactions(response.data || [])
    } catch (error: any) {
      console.error('Failed to load transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (transactionId: string, status: TransactionStatus) => {
    try {
      await api.patch(`/transactions/${transactionId}/status`, { status })
      loadTransactions() // Reload to get updated data
    } catch (error: any) {
      console.error('Failed to update transaction status:', error)
    }
  }

  if (loading) {
    return <div className="card">{t('dashboard.loading')}</div>
  }

  return (
    <div className="card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('dashboard.user')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('dashboard.type')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('dashboard.points')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('dashboard.requestedAmount')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('dashboard.status')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('dashboard.date')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('dashboard.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {typeof transaction.userId === 'object' && transaction.userId ? (transaction.userId as any).username : transaction.userId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    transaction.type === 'deposit' 
                      ? 'bg-green-100 text-green-800'
                      : transaction.type === 'withdrawal'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.type === 'deposit' ? t('dashboard.deposit') : transaction.type === 'withdrawal' ? t('dashboard.withdrawal') : transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.points}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.requestedAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    transaction.status === 'approved' 
                      ? 'bg-green-100 text-green-800'
                      : transaction.status === 'declined'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status === 'approved' ? t('dashboard.approved') : transaction.status === 'declined' ? t('dashboard.declined') : t('dashboard.pending')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.createdAt ? new Date(transaction.createdAt).toLocaleString() : 'Unknown'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusUpdate(transaction._id, TransactionStatus.APPROVED)}
                        className="text-green-600 hover:text-green-900 text-xs"
                      >
                        {t('dashboard.approve')}
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(transaction._id, TransactionStatus.DECLINED)}
                        className="text-red-600 hover:text-red-900 text-xs"
                      >
                        {t('dashboard.decline')}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
