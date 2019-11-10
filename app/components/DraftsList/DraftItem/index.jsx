import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './style.scss';

import * as Actions from '../../../actions';

class DraftItem extends React.Component {
  render() {
    const { draft, deleteDrafts } = this.props;

    const handleRemoveDraft = () => {
      deleteDrafts({ draftId: draft._id });
    };

    return (
      <div className="draft-link">
        <Link to={`/drafts/${draft._id}`}>
          <div className="cool-link-hover">
            <h2 className="cool-link">{draft.title}</h2>
          </div>
        </Link>
        <button className="remove" onClick={handleRemoveDraft}>
          Remove
        </button>
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
