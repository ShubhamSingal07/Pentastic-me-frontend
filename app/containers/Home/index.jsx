import React from 'react';
import { connect } from 'react-redux';

import Navbar from '../../components/Navbar';
import * as Actions from '../../actions';

class Home extends React.Component {
  async componentWillMount() {
    const { authenticateUser } = this.props;
    const userid = this.props.location.search.substring(4);

    if (userid) {
      console.log('printing',userid)
      this.props.history.push('/')
      await authenticateUser(userid);
    }
    await Actions.fetchHomePage();
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <div>
        <Navbar />
        <h2>Stories</h2>
        <div>
          <h3>Story Title</h3>
          <div>Story content</div>
        </div>
        <h2>Photos</h2>
        <div>
          <div>asd</div>
          <div>asd</div>
          <div>asd</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  loggedIn: auth.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  authenticateUser: id => dispatch(Actions.authenticateUser(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
