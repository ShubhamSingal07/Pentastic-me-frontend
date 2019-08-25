import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as Actions from '../../../actions';

class DraftItem extends React.Component {
  render() {
    const { draft, deleteDrafts } = this.props;

    const handleClick = () => {
      return <Redirect to={`/draft/${draft.id}`} />;
    };

    const handleRemoveDraft = () => {
      deleteDrafts({ drafatId: draft.id });
    };

    return (
      <div>
        <div onClick={handleClick}>
          <h2>{draft.title}</h2>
        </div>
        <button onClick={handleRemoveDraft}>Remove</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteDrafts: payload => dispatch(Actions.deleteDrafts(payload)),
});

export default connect(
  null,
  mapDispatchToProps,
)(DraftItem);
