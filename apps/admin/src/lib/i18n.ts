export type Language = 'en' | 'mn';

export interface AdminTranslations {
  system: {
    pointSystemAdmin: string;
  };
  auth: {
    adminLogin: string;
    signInAdminAccount: string;
    emailAddress: string;
    password: string;
    signingIn: string;
    signIn: string;
  };
  dashboard: {
    dashboard: string;
    users: string;
    admins: string;
    transactions: string;
    rewards: string;
    totalUsers: string;
    totalAdmins: string;
    totalPoints: string;
    totalTransactions: string;
    activeRewards: string;
    loading: string;
    edit: string;
    delete: string;
    save: string;
    cancel: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
    actions: string;
    created: string;
    admin: string;
    status: string;
    active: string;
    inactive: string;
    activate: string;
    deactivate: string;
    addNewAdmin: string;
    editAdmin: string;
    adminRole: string;
    user: string;
    type: string;
    points: string;
    requestedAmount: string;
    date: string;
    deposit: string;
    withdrawal: string;
    approved: string;
    declined: string;
    pending: string;
    approve: string;
    decline: string;
    editUser: string;
    cannotBeChanged: string;
    name: string;
    description: string;
    pointsRequired: string;
    adminUpdatedMessage: string;
    adminUpdateErrorMessage: string;
    cannotDeleteSelfMessage: string;
    cannotDeleteLastAdminMessage: string;
    adminDeletedMessage: string;
    adminDeleteErrorMessage: string;
    adminCreatedMessage: string;
    adminCreateErrorMessage: string;
    activatedMessage: string;
    deactivatedMessage: string;
    adminStatusChangeErrorMessage: string;
  };
}

export const translations: Record<Language, AdminTranslations> = {
  en: {
    system: {
      pointSystemAdmin: 'Point System Admin',
    },
    auth: {
      adminLogin: 'Admin Login',
      signInAdminAccount: 'Sign in to your admin account',
      emailAddress: 'Email address',
      password: 'Password',
      signingIn: 'Signing in...',
      signIn: 'Sign in',
    },
    dashboard: {
      dashboard: 'Dashboard',
      users: 'Users',
      admins: 'Admins',
      transactions: 'Transactions',
      rewards: 'Rewards',
      totalUsers: 'Total Users',
      totalAdmins: 'Total Admins',
      totalPoints: 'Total Points',
      totalTransactions: 'Total Transactions',
      activeRewards: 'Active Rewards',
      loading: 'Loading...',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      firstName: 'First Name',
      lastName: 'Last Name',
      username: 'Username',
      email: 'Email',
      role: 'Role',
      actions: 'Actions',
      created: 'Created',
      admin: 'Admin',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      activate: 'Activate',
      deactivate: 'Deactivate',
      addNewAdmin: 'Add New Admin',
      editAdmin: 'Edit Admin',
      adminRole: 'Admin (Cannot be changed)',
      user: 'User',
      type: 'Type',
      points: 'Points',
      requestedAmount: 'Requested Amount',
      date: 'Date',
      deposit: 'Deposit',
      withdrawal: 'Withdrawal',
      approved: 'Approved',
      declined: 'Declined',
      pending: 'Pending',
      approve: 'Approve',
      decline: 'Decline',
      editUser: 'Edit User',
      cannotBeChanged: '(Cannot be changed)',
      name: 'Name',
      description: 'Description',
      pointsRequired: 'Points Required',
      adminUpdatedMessage: 'Admin information has been updated successfully.',
      adminUpdateErrorMessage: 'Failed to update admin information. Please try again.',
      cannotDeleteSelfMessage: 'You cannot delete your own account.',
      cannotDeleteLastAdminMessage: 'Cannot delete the last active admin.',
      adminDeletedMessage: 'Admin has been deleted successfully.',
      adminDeleteErrorMessage: 'Failed to delete admin. Please try again.',
      adminCreatedMessage: 'New admin has been created successfully.',
      adminCreateErrorMessage: 'Failed to create admin. Please try again.',
      activatedMessage: 'has been activated successfully.',
      deactivatedMessage: 'has been deactivated successfully.',
      adminStatusChangeErrorMessage: 'Failed to change admin status. Please try again.',
    },
  },
  mn: {
    system: {
      pointSystemAdmin: 'Онооны Систем Админ',
    },
    auth: {
      adminLogin: 'Админ нэвтрэх',
      signInAdminAccount: 'Админ эрхээр нэвтэрнэ үү',
      emailAddress: 'Имэйл хаяг',
      password: 'Нууц үг',
      signingIn: 'Нэвтэрч байна...',
      signIn: 'Нэвтрэх',
    },
    dashboard: {
      dashboard: 'Хяналтын самбар',
      users: 'Хэрэглэгчид',
      admins: 'Админууд',
      transactions: 'Гүйлгээнүүд',
      rewards: 'Урамшуулал',
      totalUsers: 'Нийт хэрэглэгчид',
      totalAdmins: 'Нийт админууд',
      totalPoints: 'Нийт оноо',
      totalTransactions: 'Нийт гүйлгээ',
      activeRewards: 'Идэвхтэй урамшуулал',
      loading: 'Ачааллаж байна...',
      edit: 'Засах',
      delete: 'Устгах',
      save: 'Хадгалах',
      cancel: 'Цуцлах',
      firstName: 'Нэр',
      lastName: 'Овог',
      username: 'Хэрэглэгчийн нэр',
      email: 'Имэйл',
      role: 'Эрх',
      actions: 'Үйлдэл',
      created: 'Үүсгэсэн',
      admin: 'Админ',
      status: 'Төлөв',
      active: 'Идэвхтэй',
      inactive: 'Идэвхгүй',
      activate: 'Идэвхижүүлэх',
      deactivate: 'Идэвхгүй болгох',
      addNewAdmin: 'Шинэ админ нэмэх',
      editAdmin: 'Админ засах',
      adminRole: 'Админ (өөрчлөх боломжгүй)',
      user: 'Хэрэглэгч',
      type: 'Төрөл',
      points: 'Оноо',
      requestedAmount: 'Хүссэн дүн',
      date: 'Огноо',
      deposit: 'Орлого',
      withdrawal: 'Зарлага',
      approved: 'Зөвшөөрөгдсөн',
      declined: 'Татгалзсан',
      pending: 'Хүлээгдэж байна',
      approve: 'Зөвшөөрөх',
      decline: 'Татгалзах',
      editUser: 'Хэрэглэгч засах',
      cannotBeChanged: '(өөрчлөх боломжгүй)',
      name: 'Нэр',
      description: 'Тайлбар',
      pointsRequired: 'Шаардлагатай оноо',
      adminUpdatedMessage: 'Админы мэдээлэл амжилттай шинэчлэгдлээ.',
      adminUpdateErrorMessage: 'Админы мэдээлэл шинэчлэх боломжгүй. Дахин оролдоно уу.',
      cannotDeleteSelfMessage: 'Та өөрийгөө устгах боломжгүй.',
      cannotDeleteLastAdminMessage: 'Сүүлчийн идэвхтэй админыг устгах боломжгүй.',
      adminDeletedMessage: 'Админ амжилттай устгагдлаа.',
      adminDeleteErrorMessage: 'Админ устгах боломжгүй. Дахин оролдоно уу.',
      adminCreatedMessage: 'Шинэ админ амжилттай үүсгэгдлээ.',
      adminCreateErrorMessage: 'Админ үүсгэх боломжгүй. Дахин оролдоно уу.',
      activatedMessage: 'амжилттай идэвхижүүлэгдлээ.',
      deactivatedMessage: 'амжилттай идэвхгүй болгогдлоо.',
      adminStatusChangeErrorMessage: 'Админы төлөв өөрчлөх боломжгүй. Дахин оролдоно уу.',
    },
  },
};

export function useTranslation(language: Language) {
  return {
    t: (key: string, vars?: Record<string, string | number>) => {
      const keys = key.split('.');
      let text: any = translations[language];
      for (const k of keys) {
        if (text && typeof text === 'object' && k in text) {
          text = text[k];
        } else {
          return key; // Fallback to key if not found
        }
      }
      if (typeof text === 'string' && vars) {
        for (const [k, v] of Object.entries(vars)) {
          text = text.replace(`{{${k}}}`, v);
        }
      }
      return text;
    },
  };
}
