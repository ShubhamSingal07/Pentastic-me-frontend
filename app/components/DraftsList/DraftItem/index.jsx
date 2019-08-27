import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Actions from '../../../actions';

class DraftItem extends React.Component {
  render() {
    const { draft, deleteDrafts } = this.props;

    const handleRemoveDraft = () => {
      deleteDrafts({ draftId: draft.id });
    };

    return (
      <div>
        <Link to={`/draft/${draft.id}`}>
          <h2>{draft.title}</h2>
        </Link>
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
