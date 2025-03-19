export enum MessageText {
  requiredField = 'Campo obbligatorio',
  emailNotValid = 'Formato email non valido',
  lengthNotValid = 'Lunghezza non valida',
  invalidForm = 'Dati non validi',
  sessioneExpired = 'Sessione scaduta',
  onlyEdit = 'Disponibile solo in modifica',
  newPasswordEqualOld = 'La nuova password corrisponde a quella attuale',
  incorrectPassword = 'Password errata',
  invalidCredentials = 'Credenziali non valide',
  serverError = 'Errore del server',
  logoutSuccess = 'Logout effettuato con successo',
  noConnection = 'Problema connessione server',
  passwordMismatch = 'Le password non corrispondono',
  emailAlreadyExists = 'Email già esistente',
  success = 'Operazione effettuata con successo',
  valueNotValid = 'Valore non valido',
  invalidDate = 'La data di inizio deve essere precedente alla data di fine',
  fileType = 'Tipo file non valido',
}

export const MessageTextMinLength = (minLength: number) =>
  `Lunghezza minima ${minLength} caratteri`

export const MessageTextMaxLength = (maxLength: number) =>
  `Lunghezza massima ${maxLength} caratteri`

export const MessageFileMaxSize = (maxSize: string) =>
  `Grandezza massima file ${maxSize}`

export const MessageFileMaxDimensions = (maxDimension: string) =>
  `Dimensione massima file ${maxDimension}`
