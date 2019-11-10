import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import * as Actions from '../../actions';
import ReactQuillEditor from '../../components/ReactQuillEditor';
import Error500 from '../../components/Error/Error500';

class Draft extends React.Component {
  state = {
    loading: false,
    draftHtml: '',
    title: '',
  };

  abortController = new AbortController();

  async componentDidMount() {
    const { match, fetchDraft, loggedIn } = this.props;
    const draftId = match.params.draftId;
    this.setState({ loading: true });
    const data = await fetchDraft({ draftId, loggedIn, signal: this.abortController.signal });
    if (data === true) return;
    this.setState({ loading: false, draftHtml: data.body, title: data.title });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    const { loading, draftHtml, title } = this.state;
    const { draft, match } = this.props;

    if (loading) return <div />;

    if (draft.error) return <Error500 />;

    return (
      <div className="draft-page page">
        <Helmet>
          <title>{title} - PentasticMe</title>
        </Helmet>
        <ReactQuillEditor value={draftHtml} draftTitle={title} draftPage={true} draftId={match.params.draftId} />
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
