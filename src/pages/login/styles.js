const styles = theme => ({
  registerPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      minHeight: '100%',
      alignItems: 'flex-start',
      flexDirection: 'column',
    },
  },
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(500 + theme.spacing(3) * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 0,
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(6),
      borderRadius: 0,
      flexGrow: 1,
      justifyContent: 'center',
    },
  },
  form: {
    width: '100%',
  },
  input: {
    '&:hover:before': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.42) !important'
    }
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  hasAccountHeader: {
    width: '100%'
  },
  logInLink: {
    width: '100%',
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontWeight: 'bolder'
  },
  alert: {
    width: '100%',
    marginTop: '20px',
  },
  avatar: {
    width: '100px',
    height: '100px',
    fontSize: '2.25rem',
    border: '2px solid',
    borderColor: theme.palette.primary.main,
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '15px 0',
  },
  avatarContainer: {
    marginTop: '20px',
  },
  welcomeText: {
    fontWeight: 400
  },
});

export default styles;