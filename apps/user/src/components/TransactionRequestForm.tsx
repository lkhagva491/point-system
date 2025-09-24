'use client'

import { useState } from 'react'
import { TransactionType } from '@point-system/shared'
import { api } from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { useToast } from '@/contexts/ToastContext'

interface TransactionRequestFormProps {
  userId: string
  onSuccess: () => void
}

export function TransactionRequestForm({ userId, onSuccess }: TransactionRequestFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    type: TransactionType.DEPOSIT,
    points: 0,
    requestedAmount: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const { addToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await api.post('/points/transaction-request', {
        userId,
        ...formData,
      })
      
      addToast({
        type: 'success',
        title: t('dashboard.transactionSubmitted'),
        message: t('dashboard.transactionSubmittedMessage'),
      })
      setIsOpen(false)
      setFormData({ type: TransactionType.DEPOSIT, points: 0, requestedAmount: 0 })
      onSuccess()
    } catch (error: any) {
      addToast({
        type: 'error',
        title: t('dashboard.transactionError'),
        message: error.response?.data?.message || t('dashboard.transactionErrorMessage'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'points' || name === 'requestedAmount' ? Number(value) : value,
    }))
  }

  if (!isOpen) {
    return (
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.requestTransaction')}</h3>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setFormData(prev => ({ ...prev, type: TransactionType.DEPOSIT }))
              setIsOpen(true)
            }}
            className="btn btn-primary"
          >
            {t('dashboard.requestDeposit')}
          </button>
          <button
            onClick={() => {
              setFormData(prev => ({ ...prev, type: TransactionType.WITHDRAWAL }))
              setIsOpen(true)
            }}
            className="btn btn-secondary"
          >
            {t('dashboard.requestWithdrawal')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {formData.type === TransactionType.DEPOSIT ? t('dashboard.requestDeposit') : t('dashboard.requestWithdrawal')}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">{t('dashboard.type')}</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="input"
            disabled
          >
            <option value={TransactionType.DEPOSIT}>{t('dashboard.requestDeposit')}</option>
            <option value={TransactionType.WITHDRAWAL}>{t('dashboard.requestWithdrawal')}</option>
          </select>
        </div>

        <div>
          <label className="label">{t('dashboard.points')}</label>
          <input
            type="number"
            name="points"
            value={formData.points}
            onChange={handleChange}
            className="input"
            min="1"
            required
          />
        </div>

        <div>
          <label className="label">{t('dashboard.requestedAmount')}</label>
          <input
            type="number"
            name="requestedAmount"
            value={formData.requestedAmount}
            onChange={handleChange}
            className="input"
            min="1"
            required
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? t('dashboard.submitting') : t('dashboard.submitRequest')}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="btn btn-secondary"
          >
            {t('dashboard.cancel')}
          </button>
        </div>
      </form>
    </div>
  )
}

