export type Language = 'en' | 'mn';

export interface Translations {
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    edit: string;
    delete: string;
    submit: string;
    back: string;
    next: string;
    previous: string;
    confirm: string;
    yes: string;
    no: string;
  };
  
  // Auth
  auth: {
    login: string;
    register: string;
    logout: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    signIn: string;
    createAccount: string;
    pleaseWait: string;
    adminLogin: string;
    signInToAdmin: string;
    signingIn: string;
  };
  
  // Dashboard
  dashboard: {
    loading: string;
    errorLoading: string;
    userDataNotFound: string;
    dashboardDataNotLoaded: string;
    goToLogin: string;
    welcomeBack: string;
    managePoints: string;
    pointsAvailable: string;
    earned: string;
    spent: string;
    requestTransaction: string;
    requestDeposit: string;
    requestWithdrawal: string;
    type: string;
    points: string;
    requestedAmount: string;
    submitRequest: string;
    submitting: string;
    cancel: string;
    availableRewards: string;
    noRewards: string;
    redeemNow: string;
    redeeming: string;
    insufficientPoints: string;
    recentActivity: string;
    noRecentTransactions: string;
    depositRequest: string;
    withdrawalRequest: string;
    status: string;
    statusApproved: string;
    statusDeclined: string;
    statusPending: string;
    rewardRedeemed: string;
    rewardRedeemedMessage: string;
    rewardRedeemError: string;
    rewardRedeemErrorMessage: string;
    transactionSubmitted: string;
    transactionSubmittedMessage: string;
    transactionError: string;
    transactionErrorMessage: string;
  };
  
  // Transactions
  transactions: {
    requestTransaction: string;
    requestDeposit: string;
    requestWithdrawal: string;
    type: string;
    points: string;
    requestedAmount: string;
    submitRequest: string;
    submitting: string;
    depositRequest: string;
    withdrawalRequest: string;
    status: string;
    approved: string;
    declined: string;
    pending: string;
  };
  
  // Rewards
  rewards: {
    availableRewards: string;
    noRewardsAvailable: string;
    redeemNow: string;
    insufficientPoints: string;
    redeeming: string;
  };
  
  // Profile
  profile: {
    profile: string;
    editProfile: string;
    updateProfile: string;
    updating: string;
    profileUpdated: string;
    profileUpdatedMessage: string;
    profileUpdateError: string;
    profileUpdateErrorMessage: string;
    enterNewPassword: string;
  };
  
  // System
  system: {
    pointSystem: string;
    pointSystemAdmin: string;
    earnPointsAndRewards: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      submit: 'Submit',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
    },
    auth: {
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      username: 'Username',
      signIn: 'Sign In',
      createAccount: 'Create Account',
      pleaseWait: 'Please wait...',
      adminLogin: 'Admin Login',
      signInToAdmin: 'Sign in to your admin account',
      signingIn: 'Signing in...',
    },
    dashboard: {
      loading: 'Loading...',
      errorLoading: 'Error loading dashboard',
      userDataNotFound: 'User data not found. Please log in again.',
      dashboardDataNotLoaded: 'Dashboard data could not be loaded.',
      goToLogin: 'Go to Login',
      welcomeBack: 'Welcome back, {{name}}! 👋',
      managePoints: 'Manage your points and discover amazing rewards',
      pointsAvailable: 'Points Available',
      earned: 'Earned',
      spent: 'Spent',
      requestTransaction: 'Request Transaction',
      requestDeposit: 'Request Deposit',
      requestWithdrawal: 'Request Withdrawal',
      type: 'Type',
      points: 'Points',
      requestedAmount: 'Requested Amount',
      submitRequest: 'Submit Request',
      submitting: 'Submitting...',
      cancel: 'Cancel',
      availableRewards: 'Available Rewards',
      noRewards: 'No rewards available',
      redeemNow: 'Redeem Now',
      redeeming: 'Redeeming...',
      insufficientPoints: 'Insufficient Points',
      recentActivity: 'Recent Activity',
      noRecentTransactions: 'No recent transactions',
      depositRequest: 'Deposit Request',
      withdrawalRequest: 'Withdrawal Request',
      status: 'Status',
      statusApproved: 'Approved',
      statusDeclined: 'Declined',
      statusPending: 'Pending',
      rewardRedeemed: 'Reward Redeemed!',
      rewardRedeemedMessage: 'Your reward redemption request has been submitted successfully.',
      rewardRedeemError: 'Redemption Failed',
      rewardRedeemErrorMessage: 'Failed to redeem reward. Please try again.',
      transactionSubmitted: 'Transaction Submitted!',
      transactionSubmittedMessage: 'Your transaction request has been submitted successfully.',
      transactionError: 'Transaction Failed',
      transactionErrorMessage: 'Failed to submit transaction request. Please try again.',
    },
    transactions: {
      requestTransaction: 'Request Transaction',
      requestDeposit: 'Request Deposit',
      requestWithdrawal: 'Request Withdrawal',
      type: 'Type',
      points: 'Points',
      requestedAmount: 'Requested Amount',
      submitRequest: 'Submit Request',
      submitting: 'Submitting...',
      depositRequest: 'Deposit Request',
      withdrawalRequest: 'Withdrawal Request',
      status: 'Status',
      approved: 'Approved',
      declined: 'Declined',
      pending: 'Pending',
    },
    rewards: {
      availableRewards: 'Available Rewards',
      noRewardsAvailable: 'No rewards available',
      redeemNow: 'Redeem Now',
      insufficientPoints: 'Insufficient Points',
      redeeming: 'Redeeming...',
    },
    profile: {
      profile: 'Profile',
      editProfile: 'Edit Profile',
      updateProfile: 'Update Profile',
      updating: 'Updating...',
      profileUpdated: 'Profile updated successfully!',
      profileUpdatedMessage: 'Your profile information has been updated successfully.',
      profileUpdateError: 'Failed to update profile',
      profileUpdateErrorMessage: 'Failed to update profile. Please try again.',
      enterNewPassword: 'Enter new password',
    },
    system: {
      pointSystem: 'Point System',
      pointSystemAdmin: 'Point System Admin',
      earnPointsAndRewards: 'Earn points and redeem amazing rewards!',
    },
  },
  mn: {
    common: {
      loading: 'Ачааллаж байна...',
      error: 'Алдаа',
      success: 'Амжилттай',
      cancel: 'Цуцлах',
      save: 'Хадгалах',
      edit: 'Засах',
      delete: 'Устгах',
      submit: 'Илгээх',
      back: 'Буцах',
      next: 'Дараах',
      previous: 'Өмнөх',
      confirm: 'Баталгаажуулах',
      yes: 'Тийм',
      no: 'Үгүй',
    },
    auth: {
      login: 'Нэвтрэх',
      register: 'Бүртгүүлэх',
      logout: 'Гарах',
      email: 'Имэйл',
      password: 'Нууц үг',
      firstName: 'Нэр',
      lastName: 'Овог',
      username: 'Хэрэглэгчийн нэр',
      signIn: 'Нэвтрэх',
      createAccount: 'Бүртгэл үүсгэх',
      pleaseWait: 'Хүлээнэ үү...',
      adminLogin: 'Админ нэвтрэх',
      signInToAdmin: 'Админ эрхээр нэвтэрнэ үү',
      signingIn: 'Нэвтэрч байна...',
    },
    dashboard: {
      loading: 'Ачааллаж байна...',
      errorLoading: 'Хяналтын самбар ачаалахад алдаа',
      userDataNotFound: 'Хэрэглэгчийн мэдээлэл олдсонгүй. Дахин нэвтэрнэ үү.',
      dashboardDataNotLoaded: 'Хяналтын самбарын мэдээлэл ачаалах боломжгүй.',
      goToLogin: 'Нэвтрэх хуудас руу очих',
      welcomeBack: 'Сайн байна уу, {{name}}! 👋',
      managePoints: 'Оноогоо удирдаж гайхалтай урамшуулал олоорой',
      pointsAvailable: 'Боломжтой оноо',
      earned: 'Олсон',
      spent: 'Зарцуулсан',
      requestTransaction: 'Гүйлгээний хүсэлт',
      requestDeposit: 'Орлого нэмэх',
      requestWithdrawal: 'Зарлага хийх',
      type: 'Төрөл',
      points: 'Оноо',
      requestedAmount: 'Хүссэн дүн',
      submitRequest: 'Хүсэлт илгээх',
      submitting: 'Илгээж байна...',
      cancel: 'Цуцлах',
      availableRewards: 'Боломжтой урамшуулал',
      noRewards: 'Урамшуулал байхгүй',
      redeemNow: 'Одоо авах',
      redeeming: 'Урамшуулал аваж байна...',
      insufficientPoints: 'Оноо хүрэлцэхгүй',
      recentActivity: 'Сүүлийн үйл ажиллагаа',
      noRecentTransactions: 'Сүүлийн гүйлгээ байхгүй',
      depositRequest: 'Орлого нэмэх хүсэлт',
      withdrawalRequest: 'Зарлага хийх хүсэлт',
      status: 'Төлөв',
      statusApproved: 'Зөвшөөрөгдсөн',
      statusDeclined: 'Татгалзсан',
      statusPending: 'Хүлээгдэж байна',
      rewardRedeemed: 'Урамшуулал амжилттай!',
      rewardRedeemedMessage: 'Таны урамшуулал авах хүсэлт амжилттай илгээгдлээ.',
      rewardRedeemError: 'Урамшуулал авах боломжгүй',
      rewardRedeemErrorMessage: 'Урамшуулал авах боломжгүй. Дахин оролдоно уу.',
      transactionSubmitted: 'Гүйлгээ амжилттай!',
      transactionSubmittedMessage: 'Таны гүйлгээний хүсэлт амжилттай илгээгдлээ.',
      transactionError: 'Гүйлгээ амжилтгүй',
      transactionErrorMessage: 'Гүйлгээний хүсэлт илгээх боломжгүй. Дахин оролдоно уу.',
    },
    transactions: {
      requestTransaction: 'Гүйлгээний хүсэлт',
      requestDeposit: 'Орлого нэмэх',
      requestWithdrawal: 'Зарлага хийх',
      type: 'Төрөл',
      points: 'Оноо',
      requestedAmount: 'Хүссэн дүн',
      submitRequest: 'Хүсэлт илгээх',
      submitting: 'Илгээж байна...',
      depositRequest: 'Орлого нэмэх хүсэлт',
      withdrawalRequest: 'Зарлага хийх хүсэлт',
      status: 'Төлөв',
      approved: 'Зөвшөөрөгдсөн',
      declined: 'Татгалзсан',
      pending: 'Хүлээгдэж байна',
    },
    rewards: {
      availableRewards: 'Боломжтой урамшуулал',
      noRewardsAvailable: 'Урамшуулал байхгүй',
      redeemNow: 'Одоо авах',
      insufficientPoints: 'Оноо хүрэлцэхгүй',
      redeeming: 'Урамшуулал аваж байна...',
    },
    profile: {
      profile: 'Профайл',
      editProfile: 'Профайл засах',
      updateProfile: 'Профайл шинэчлэх',
      updating: 'Шинэчлэж байна...',
      profileUpdated: 'Профайл амжилттай шинэчлэгдлээ!',
      profileUpdatedMessage: 'Таны профайлын мэдээлэл амжилттай шинэчлэгдлээ.',
      profileUpdateError: 'Профайл шинэчлэхэд алдаа гарлаа',
      profileUpdateErrorMessage: 'Профайл шинэчлэх боломжгүй. Дахин оролдоно уу.',
      enterNewPassword: 'Шинэ нууц үг оруулах',
    },
    system: {
      pointSystem: 'Онооны Систем',
      pointSystemAdmin: 'Онооны Систем Админ',
      earnPointsAndRewards: 'Оноо цуглуулж гайхалтай урамшуулал аваарай!',
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
