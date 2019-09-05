import React from 'react';
import { connect } from 'react-redux';

import './style.scss';
import * as Actions from '../../actions';
import ReactQuillEditor from '../../components/ReactQuillEditor';

class Draft extends React.Component {
  state = {
    loading: false,
    draftHtml: '',
  };

  async componentDidMount() {
    const { match, fetchDraft, loggedIn } = this.props;
    const draftId = match.params.draftId;
    this.setState({ loading: true });
    const data = await fetchDraft({ draftId, loggedIn });
    this.setState({ loading: false, draftHtml: data.body });
  }

  render() {
    const { loading, draftHtml } = this.state;
    const { draft, match } = this.props;

    if (loading) return <div className="draft-page">Loading</div>;

    if (draft.error) return <div className="draft-page">{draft.error}</div>;

    return (
      <div className="draft-page">
        <ReactQuillEditor value={draftHtml} draftPage={true} draftId={match.params.draftId} />
      </div>
    );
  }
}

const mapStateToProps = ({ draft, auth }) => ({
  draft,
  loggedIn: auth.loggedIn,
});

const mapDispatchToProps = dispatch => ({
  fetchDraft: payload => dispatch(Actions.fetchDraft(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Draft);
