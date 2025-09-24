'use client'

import { useState, useEffect } from 'react'
import { User } from '@point-system/shared'
import { Button, Modal, Input, Badge } from '@point-system/ui'
import { api } from '@/lib/api'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { useToast } from '@/contexts/ToastContext'

export function AdminsTable() {
  const [admins, setAdmins] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [editingAdmin, setEditingAdmin] = useState<User | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    role: '',
  })
  const [createForm, setCreateForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    role: 'admin',
  })
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const { addToast } = useToast()

  useEffect(() => {
    // Get current user from localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
    loadAdmins()
  }, [])

  const loadAdmins = async () => {
    try {
      const response = await api.get('/admins')
      setAdmins(response.data)
    } catch (error: any) {
      console.error('Failed to load admins:', error)
      console.error('Error details:', error.response?.data)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (admin: User) => {
    setEditingAdmin(admin)
    setEditForm({
      firstName: admin.firstName || '',
      lastName: admin.lastName || '',
      username: admin.username || '',
      email: admin.email || '',
      password: '', // Don't populate password for editing
      role: admin.role || 'admin',
    })
  }

  const handleSave = async () => {
    if (!editingAdmin) return

    try {
      await api.patch(`/admins/${editingAdmin._id}`, editForm)
      await loadAdmins() // Reload admins list
      setEditingAdmin(null)
      addToast({
        type: 'success',
        title: t('dashboard.adminUpdated'),
        message: t('dashboard.adminUpdatedMessage'),
      })
    } catch (error: any) {
      console.error('Failed to update admin:', error)
      addToast({
        type: 'error',
        title: t('dashboard.adminUpdateError'),
        message: t('dashboard.adminUpdateErrorMessage'),
      })
    }
  }

  const handleDelete = async (adminId: string) => {
    // Check if trying to delete current user
    if (currentUser && currentUser._id === adminId) {
      addToast({
        type: 'warning',
        title: t('dashboard.cannotDeleteSelf'),
        message: t('dashboard.cannotDeleteSelfMessage'),
      })
      return
    }

    // Check if this is the last admin
    const activeAdmins = admins.filter(admin => admin.isActive !== false)
    if (activeAdmins.length <= 1) {
      addToast({
        type: 'warning',
        title: t('dashboard.cannotDeleteLastAdmin'),
        message: t('dashboard.cannotDeleteLastAdminMessage'),
      })
      return
    }

    if (!confirm(t('dashboard.confirmDeleteAdmin'))) {
      return
    }

    try {
      const response = await api.delete(`/admins/${adminId}`)
      await loadAdmins() // Reload admins list
      addToast({
        type: 'success',
        title: t('dashboard.adminDeleted'),
        message: t('dashboard.adminDeletedMessage'),
      })
    } catch (error: any) {
      console.error('Failed to delete admin:', error)
      console.error('Error details:', error.response?.data)
      addToast({
        type: 'error',
        title: t('dashboard.adminDeleteError'),
        message: error.response?.data?.message || t('dashboard.adminDeleteErrorMessage'),
      })
    }
  }

  const handleCreate = async () => {
    try {
      const response = await api.post('/admins', createForm)
      await loadAdmins() // Reload admins list
      setShowCreateForm(false)
      setCreateForm({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        role: 'admin',
      })
      addToast({
        type: 'success',
        title: t('dashboard.adminCreated'),
        message: t('dashboard.adminCreatedMessage'),
      })
    } catch (error: any) {
      console.error('Failed to create admin:', error)
      addToast({
        type: 'error',
        title: t('dashboard.adminCreateError'),
        message: t('dashboard.adminCreateErrorMessage'),
      })
    }
  }

  const handleCancel = () => {
    setEditingAdmin(null)
    setEditForm({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      role: '',
    })
  }

  const handleToggleActive = async (adminId: string, currentStatus: boolean) => {
    try {
      await api.patch(`/admins/${adminId}`, { isActive: !currentStatus })
      await loadAdmins() // Reload admins list
      addToast({
        type: 'success',
        title: `${t('dashboard.admin')} ${!currentStatus ? t('dashboard.activated') : t('dashboard.deactivated')}!`,
        message: `${t('dashboard.admin')} ${!currentStatus ? t('dashboard.activatedMessage') : t('dashboard.deactivatedMessage')}`,
      })
    } catch (error: any) {
      console.error('Failed to toggle admin status:', error)
      addToast({
        type: 'error',
        title: t('dashboard.adminStatusChangeError'),
        message: t('dashboard.adminStatusChangeErrorMessage'),
      })
    }
  }

  const handleCancelCreate = () => {
    setShowCreateForm(false)
    setCreateForm({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      role: 'admin',
    })
  }

  if (loading) {
    return <div className="card">{t('dashboard.loading')}</div>
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">{t('dashboard.admins')}</h3>
        <Button
          onClick={() => setShowCreateForm(true)}
          variant="primary"
        >
          {t('dashboard.addNewAdmin')}
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('dashboard.admin')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('dashboard.email')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('dashboard.role')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('dashboard.status')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('dashboard.created')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('dashboard.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-red-600">
                          {(admin.firstName?.[0] || 'A')}{(admin.lastName?.[0] || 'A')}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {admin.firstName || 'Unknown'} {admin.lastName || 'Admin'}
                      </div>
                      <div className="text-sm text-gray-500">
                        @{admin.username || 'unknown'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {admin.email || 'No email'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    {admin.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    admin.isActive 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {admin.isActive ? t('dashboard.active') : t('dashboard.inactive')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'Unknown'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleEdit(admin)}
                      variant="outline"
                      size="sm"
                    >
                      {t('dashboard.edit')}
                    </Button>
                    <Button
                      onClick={() => handleToggleActive(admin._id, admin.isActive)}
                      variant={admin.isActive ? "secondary" : "primary"}
                      size="sm"
                    >
                      {admin.isActive ? t('dashboard.deactivate') : t('dashboard.activate')}
                    </Button>
                    <Button
                      onClick={() => handleDelete(admin._id)}
                      variant="danger"
                      size="sm"
                      disabled={
                        (currentUser && currentUser._id === admin._id) || 
                        (admins.filter(a => a.isActive !== false).length <= 1)
                      }
                    >
                      {t('dashboard.delete')}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingAdmin && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {t('dashboard.editAdmin')}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('dashboard.firstName')}</label>
                  <input
                    type="text"
                    value={editForm.firstName}
                    onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('dashboard.lastName')}</label>
                  <input
                    type="text"
                    value={editForm.lastName}
                    onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('dashboard.username')}</label>
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('dashboard.email')}</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('dashboard.role')}</label>
                  <div className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-500">
                    {t('dashboard.adminRole')}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  {t('dashboard.cancel')}
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  {t('dashboard.save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Шинэ админ үүсгэх
              </h3>
              
              <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-md">
                <p className="text-sm text-yellow-800">
                  <strong>Анхаар:</strong> Шинэ админ идэвхгүй төлөвтэй үүсгэгдэнэ. Дараа нь идэвхижүүлэх шаардлагатай.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Нэр</label>
                  <input
                    type="text"
                    value={createForm.firstName}
                    onChange={(e) => setCreateForm({...createForm, firstName: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Овог</label>
                  <input
                    type="text"
                    value={createForm.lastName}
                    onChange={(e) => setCreateForm({...createForm, lastName: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Хэрэглэгчийн нэр</label>
                  <input
                    type="text"
                    value={createForm.username}
                    onChange={(e) => setCreateForm({...createForm, username: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Имэйл</label>
                  <input
                    type="email"
                    value={createForm.email}
                    onChange={(e) => setCreateForm({...createForm, email: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Нууц үг</label>
                  <input
                    type="password"
                    value={createForm.password}
                    onChange={(e) => setCreateForm({...createForm, password: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleCancelCreate}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Цуцлах
                </button>
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Үүсгэх
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
