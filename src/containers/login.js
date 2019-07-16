import { connect } from 'react-redux' ;
import Login from '../views/login';
import { setUserId } from '../actions';

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    setUserId: userId => { dispatch(setUserId(userId)) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
