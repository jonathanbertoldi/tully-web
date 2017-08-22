export default {
  apiRequestsInProgress: 0,
  identity: {
    isAuthenticated: localStorage.getItem('jwt') ? true : false,
    jwt: localStorage.getItem('jwt'),
    usuario: {},
  },
  snackbar: {
    open: false,
    message: '',
  },
  admins: [],
}