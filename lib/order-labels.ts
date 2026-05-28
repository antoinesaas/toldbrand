import type { Language } from '@/lib/i18n/translations'
import type { OrderStatus } from '@/lib/orders'

export const ORDER_STATUS_LABELS: Record<Language, Record<OrderStatus, string>> = {
  fr: {
    pending: 'En attente',
    paid: 'Payée',
    processing: 'En préparation',
    in_production: 'En production',
    shipped: 'Expédiée',
    delivered: 'Livrée',
    cancelled: 'Annulée',
    failed: 'Échec',
  },
  en: {
    pending: 'Pending',
    paid: 'Paid',
    processing: 'Processing',
    in_production: 'In production',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    failed: 'Failed',
  },
  de: {
    pending: 'Ausstehend',
    paid: 'Bezahlt',
    processing: 'In Bearbeitung',
    in_production: 'In Produktion',
    shipped: 'Versendet',
    delivered: 'Zugestellt',
    cancelled: 'Storniert',
    failed: 'Fehlgeschlagen',
  },
  it: {
    pending: 'In attesa',
    paid: 'Pagato',
    processing: 'In preparazione',
    in_production: 'In produzione',
    shipped: 'Spedito',
    delivered: 'Consegnato',
    cancelled: 'Annullato',
    failed: 'Fallito',
  },
  es: {
    pending: 'Pendiente',
    paid: 'Pagado',
    processing: 'En preparación',
    in_production: 'En producción',
    shipped: 'Enviado',
    delivered: 'Entregado',
    cancelled: 'Cancelado',
    failed: 'Fallido',
  },
}

export const ACCOUNT_COPY: Record<
  Language,
  {
    login: string
    register: string
    email: string
    password: string
    signIn: string
    signUp: string
    signOut: string
    google: string
    apple: string
    myOrders: string
    noOrders: string
    orderNumber: string
    tracking: string
    viewOrder: string
    items: string
    createAccount: string
    haveAccount: string
    successViewOrders: string
  }
> = {
  fr: {
    login: 'Connexion',
    register: 'Créer un compte',
    email: 'E-mail',
    password: 'Mot de passe',
    signIn: 'Se connecter',
    signUp: "S'inscrire",
    signOut: 'Déconnexion',
    google: 'Continuer avec Google',
    apple: 'Continuer avec Apple',
    myOrders: 'Mes commandes',
    noOrders: 'Aucune commande pour le moment.',
    orderNumber: 'Commande',
    tracking: 'Suivi',
    viewOrder: 'Voir le détail',
    items: 'Articles',
    createAccount: 'Créer un compte pour suivre vos commandes',
    haveAccount: 'Déjà un compte ?',
    successViewOrders: 'Voir ma commande',
  },
  en: {
    login: 'Sign in',
    register: 'Create account',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign in',
    signUp: 'Sign up',
    signOut: 'Sign out',
    google: 'Continue with Google',
    apple: 'Continue with Apple',
    myOrders: 'My orders',
    noOrders: 'No orders yet.',
    orderNumber: 'Order',
    tracking: 'Tracking',
    viewOrder: 'View details',
    items: 'Items',
    createAccount: 'Create an account to track your orders',
    haveAccount: 'Already have an account?',
    successViewOrders: 'View my order',
  },
  de: {
    login: 'Anmelden',
    register: 'Konto erstellen',
    email: 'E-Mail',
    password: 'Passwort',
    signIn: 'Anmelden',
    signUp: 'Registrieren',
    signOut: 'Abmelden',
    google: 'Mit Google fortfahren',
    apple: 'Mit Apple fortfahren',
    myOrders: 'Meine Bestellungen',
    noOrders: 'Noch keine Bestellungen.',
    orderNumber: 'Bestellung',
    tracking: 'Sendungsverfolgung',
    viewOrder: 'Details ansehen',
    items: 'Artikel',
    createAccount: 'Konto erstellen, um Bestellungen zu verfolgen',
    haveAccount: 'Bereits ein Konto?',
    successViewOrders: 'Bestellung ansehen',
  },
  it: {
    login: 'Accedi',
    register: 'Crea account',
    email: 'Email',
    password: 'Password',
    signIn: 'Accedi',
    signUp: 'Registrati',
    signOut: 'Esci',
    google: 'Continua con Google',
    apple: 'Continua con Apple',
    myOrders: 'I miei ordini',
    noOrders: 'Nessun ordine al momento.',
    orderNumber: 'Ordine',
    tracking: 'Tracking',
    viewOrder: 'Vedi dettagli',
    items: 'Articoli',
    createAccount: 'Crea un account per seguire gli ordini',
    haveAccount: 'Hai già un account?',
    successViewOrders: 'Vedi il mio ordine',
  },
  es: {
    login: 'Iniciar sesión',
    register: 'Crear cuenta',
    email: 'Correo',
    password: 'Contraseña',
    signIn: 'Iniciar sesión',
    signUp: 'Registrarse',
    signOut: 'Cerrar sesión',
    google: 'Continuar con Google',
    apple: 'Continuar con Apple',
    myOrders: 'Mis pedidos',
    noOrders: 'Aún no hay pedidos.',
    orderNumber: 'Pedido',
    tracking: 'Seguimiento',
    viewOrder: 'Ver detalle',
    items: 'Artículos',
    createAccount: 'Crea una cuenta para seguir tus pedidos',
    haveAccount: '¿Ya tienes cuenta?',
    successViewOrders: 'Ver mi pedido',
  },
}
