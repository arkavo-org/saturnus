import moment from "moment-mini";
import reddit from "api/reddit";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const REQUEST_MORE_POSTS = "REQUEST_MORE_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const FETCH_POST_ERROR = "FETCH_POST_ERROR";

function requestPosts(subreddit, sortMode, time) {
  return {
    type: REQUEST_POSTS,
    subreddit,
    sortMode,
    time,
  };
}

function requestMorePosts(subreddit) {
  return {
    type: REQUEST_MORE_POSTS,
    subreddit,
  };
}

function receivePosts(subreddit, posts) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts,
    receivedAt: Date.now(),
  };
}

function fetchPostError(subreddit) {
  return {
    type: FETCH_POST_ERROR,
    subreddit,
  };
}

function shouldFetch(state, subreddit, sortMode, time) {
  const { posts } = state;

  const currentSub = posts[subreddit];

  // if nothing has been fetched for the current sub, we need to fetch
  if (!currentSub || !currentSub.receivedAt) {
    console.log("nothing fetched");
    return true;
  }

  // if the user changes sort mode, we should fetch new and skip the cache
  if (sortMode !== currentSub.sortMode) {
    console.log(sortMode);
    console.log(currentSub.sortMode);
    console.log(currentSub);
    console.log("different sort");
    return true;
  }

  if (time !== currentSub.time) {
    console.log("different time");
    return true;
  }

  // if we have already fetched, only fetch again if it was 10 minutes ago
  console.log("comparing time");
  const then = moment(currentSub.receivedAt);
  const diff = moment().diff(then, "minutes");
  return diff > 10;
}

export function fetchPosts(subreddit, sortMode = "hot", time = "month") {
  return async (dispatch, getState) => {
    const state = getState();
    if (!shouldFetch(state, subreddit, sortMode, time)) return;

    console.log("doing it");
    const r = reddit.getSnoowrap();
    dispatch(requestPosts(subreddit, sortMode, time));

    try {
      let posts;
      const sub = subreddit ? `/${subreddit}` : "";

      switch (sortMode) {
        case "hot":
          posts = await r.getHot(subreddit);
          break;
        case "top":
          posts = await r.getTop(subreddit, { time });
          break;
        case "new":
          posts = await r.getNew(subreddit);
          break;
        case "controversial":
          posts = await r.getControversial(subreddit, { time });
          break;
        case "rising":
          posts = await r.getRising(subreddit);
          break;
        default:
          posts = await r.oauthRequest({
            uri: `${sub}/best`,
            method: "get",
          });
      }

      console.log(posts);
      dispatch(receivePosts(subreddit, posts));
    } catch (error) {
      console.error(error);
      dispatch(fetchPostError(subreddit));
    }
  };
}

export function fetchMorePosts(subreddit) {
  return async (dispatch, getState) => {
    const { items } = getState().posts[subreddit];
    dispatch(requestMorePosts(subreddit));

    // fetchMore will return a Listing with _both_ previous and new posts
    const itemsWithNew = await items.fetchMore({ amount: 25 });

    dispatch(receivePosts(subreddit, itemsWithNew));
  };
}
