import { connect } from 'react-redux' ;
import Messages from '../views/messages';
import { setUserId } from '../actions';

function mapStateToProps(state) {
  return { userId: state.auth.userId };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserId: () => { dispatch(setUserId()) }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Messages);
