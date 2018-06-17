import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchPosts, fetchMorePosts } from "actions/posts";

import PostFeed from "components/PostFeed";

class SubredditFeed extends Component {
  static propTypes = {
    subreddit: PropTypes.string,
    sortMode: PropTypes.string,
    /* Below are from redux */
    error: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingMore: PropTypes.bool.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    fetchMorePosts: PropTypes.func.isRequired,
  };

  static defaultProps = {
    subreddit: "",
    sortMode: "hot",
  };

  componentDidMount() {
    this.loadPosts();
  }

  componentDidUpdate(prevProps) {
    const { subreddit, sortMode } = this.props;
    if (subreddit !== prevProps.subreddit || sortMode !== prevProps.sortMode) {
      this.loadPosts();
    }
  }

  loadPosts = () => {
    const { subreddit, sortMode } = this.props;
    this.props.fetchPosts(subreddit, sortMode);
  };

  loadMore = () => {
    const { subreddit } = this.props;
    this.props.fetchMorePosts(subreddit);
  };

  render() {
    const {
      isLoading,
      isLoadingMore,
      posts,
      error,
      sortMode,
      subreddit,
    } = this.props;

    if (error) {
      return <div className="main-content">Something went wrong :(</div>;
    }

    return (
      <PostFeed
        posts={posts}
        loadMore={this.loadMore}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        subreddit={subreddit}
        currentSort={sortMode}
      />
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  const currentPosts = posts[ownProps.subreddit] || {
    error: false,
    isLoading: false,
    isLoadingMore: false,
    items: [],
  };

  const props = {
    error: currentPosts.error,
    isLoading: currentPosts.isLoading,
    isLoadingMore: currentPosts.isLoadingMore,
    posts: currentPosts.items,
  };

  return props;
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: (subreddit, sortMode) => {
      dispatch(fetchPosts(subreddit, sortMode));
    },
    fetchMorePosts: subreddit => {
      dispatch(fetchMorePosts(subreddit));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubredditFeed);
