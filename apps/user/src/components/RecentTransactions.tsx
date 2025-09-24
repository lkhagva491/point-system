'use client'

import { TransactionRequest, Transaction } from '@point-system/shared'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/i18n'

interface RecentTransactionsProps {
  transactions: (TransactionRequest | Transaction)[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.recentActivity')}</h3>
      
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center py-4">{t('dashboard.noRecentTransactions')}</p>
      ) : (
        <div className="space-y-3">
          {transactions.slice(0, 5).map((transaction) => {
            const isTransactionRequest = 'status' in transaction && 'points' in transaction;
            const points = isTransactionRequest ? transaction.points : transaction.amount;
            const status = isTransactionRequest ? transaction.status : 'completed';
            
            return (
              <div key={transaction._id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {transaction.type === 'deposit' ? t('dashboard.depositRequest') : t('dashboard.withdrawalRequest')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {t('dashboard.status')}: {status === 'approved' ? t('dashboard.statusApproved') : status === 'declined' ? t('dashboard.statusDeclined') : t('dashboard.statusPending')}
                  </div>
                </div>
                <div className={`text-sm font-semibold ${
                  status === 'approved' || status === 'completed'
                    ? transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                    : status === 'declined'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'}{points}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}
