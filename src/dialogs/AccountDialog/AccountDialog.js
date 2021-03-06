import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert/Alert';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/data';
import { connect } from 'react-redux';
import EditPhotoDialog from '../EditPhotoDialog/EditPhotoDialog';
import Tooltip from '@material-ui/core/Tooltip';
import { API_PATH } from '../../utils/constants';
import styles from './styles';

/**
 * Maps redux store state to component props.
 *
 * @param state Redux store state.
 *
 * @return object Mapped properties.
 */
const mapStateToProps = (state) => ({
  isFetching: state.data.isFetching,
  data: state.data.data,
  status: state.data.status,
  token: state.auth.token
});

/**
 * Maps redux dispatcher functions to component props.
 *
 * @param dispatch The `dispatch` function available on your Redux store.
 *
 * @return {object} The object mimicking the original object
 */
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

/**
 * Class represents User Account Dialog window.
 */
class AccountDialog extends React.Component {
  /**
   * AccountDialog constructor.
   * @param props
   * @constructor
   */
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      surname: '',
      login: '',
      password: '',
      passwordConfirmation: '',
      updateError: '',
      editPhotoDialogOpen: false,
      img: ''
    };

    this.handleSave = this.handleSave.bind(this);
    this.initData = this.initData.bind(this);
  }

  initData (user) {
    this.setState({
      name: user.name,
      surname: user.surname,
      login: user.login
    });
  }

  componentDidMount () {
    this.props.fetchProtectedData(this.props.token, this.initData);
  }

  loginIsValid () {
    return this.state.login.length >= 6;
  }

  passwordIsValid () {
    return this.state.password.length >= 6;
  }

  formIsValid () {
    return this.state.password === this.state.passwordConfirmation;
  }

  handleClose () {
    this.props.setOpen('account', false);
    this.props.updateUserDataClose();
    this.setState({
      updateError: ''
    });
  };

  handleSave () {
    let newUser = {};

    if (this.state.password.length > 0) {
      if (!this.passwordIsValid()) {
        this.setState({
          updateError: 'Password must be at least 6 characters.',
          password: '',
          passwordConfirmation: ''
        });
        return;
      } else if (!this.formIsValid()) {
        this.setState({
          updateError: 'Passwords do not match',
          password: '',
          passwordConfirmation: ''
        });
        return;
      } else if (!this.loginIsValid()) {
        this.setState({
          updateError: 'Login must be at least 6 characters.'
        });
        return;
      } else {
        newUser = {
          name: this.state.name,
          surname: this.state.surname,
          login: this.state.login,
          password: this.state.password
        };
      }
    } else {
      newUser = {
        name: this.state.name,
        surname: this.state.surname,
        login: this.state.login
      };
    }

    this.setState({ updateError: '' });
    this.props.updateUserData(this.props.token, newUser);
  };

  handleDialogOpen (state) {
    this.setState({
      editPhotoDialogOpen: state
    });
  }

  handleUpdatePhoto (data) {
    this.props.updateUserPhoto(this.props.token, data);
  };

  userTyping (whichInput, event) {
    switch (whichInput) {
      case 'name':
        this.setState({ name: event.target.value });
        break;
      case 'surname':
        this.setState({ surname: event.target.value });
        break;
      case 'login':
        this.setState({ login: event.target.value });
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      case 'passwordConfirmation':
        this.setState({ passwordConfirmation: event.target.value });
        break;
      default:
        break;
    }
  };

  render () {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="account-dialog-title"
        aria-describedby="account-dialog-description"
        maxWidth='sm'
        fullWidth={true}
      >
        <DialogTitle id="account-dialog-title">{'My Account'}</DialogTitle>
        <DialogContent>
          {
            this.props.status && !(this.state.updateError.length > 0)
              ? <Alert
                severity={this.props.status.status === 'OK' ? 'success' : 'error'}
                className={classes.alert}>
                {this.props.status.message}
              </Alert>
              : null
          }
          {
            this.state.updateError
              ? <Alert severity='error' className={classes.alert}>
                {this.state.updateError}
              </Alert>
              : null
          }
          <div className={classes.center}>
            <Tooltip title="Click to add new profile photo">
              {
                this.props.data.profile_image
                  ? <Avatar
                    className={classes.avatar}
                    src={API_PATH + this.props.data.profile_image}
                    onClick={() => this.handleDialogOpen(true)}
                  />
                  : <Avatar className={classes.avatar}
                            onClick={() => this.handleDialogOpen(true)}>
                    {
                      (this.state.name ? this.state.name.charAt(0).toUpperCase() : '') + '' +
                      (this.state.surname ? this.state.surname.charAt(0).toUpperCase() : '')
                    }
                  </Avatar>
              }
            </Tooltip>
          </div>
          <TextField
            margin='dense'
            id='account-name-input'
            label='Name'
            fullWidth
            value={this.state.name}
            onChange={(e) => this.userTyping('name', e)}
            autoComplete="off"
          />
          <TextField
            margin='dense'
            id='account-surname-input'
            label='Surname'
            fullWidth
            value={this.state.surname}
            onChange={(e) => this.userTyping('surname', e)}
            autoComplete="off"
          />
          <TextField
            margin='dense'
            id='account-login-input'
            label='Login'
            fullWidth
            value={this.state.login}
            onChange={(e) => this.userTyping('login', e)}
            autoComplete="off"
            disabled
          />
          <Typography component='h6' variant='h6' className={classes.label}>Change
            Password:</Typography>
          <TextField
            margin='dense'
            id='account-password-input'
            label='New Password'
            fullWidth
            value={this.state.password}
            onChange={(e) => this.userTyping('password', e)}
            type='password'
            className={classes.passwordInput}
          />
          <TextField
            margin='dense'
            id='account-password-confirmation-input'
            label='Confirm Password'
            fullWidth
            value={this.state.passwordConfirmation}
            onChange={(e) => this.userTyping('passwordConfirmation', e)}
            type='password'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSave} color="primary">
            Save
          </Button>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Close
          </Button>

        </DialogActions>
        <EditPhotoDialog
          open={this.state.editPhotoDialogOpen}
          setOpen={this.handleDialogOpen}
          handleUpdatePhoto={this.handleUpdatePhoto}
        />
      </Dialog>
    );
  }
}

AccountDialog.propTypes = {
  classes: PropTypes.object,
  isFetching: PropTypes.bool,
  data: PropTypes.object,
  status: PropTypes.object,
  token: PropTypes.string,
  fetchProtectedData: PropTypes.func,
  updateUserData: PropTypes.func,
  updateUserDataClose: PropTypes.func,
  updateUserPhoto: PropTypes.func,
  setOpen: PropTypes.func,
  open: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountDialog));
