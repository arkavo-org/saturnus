import {
  RECEIVED_USER,
  SET_USER_STATUS,
  REQUEST_USER,
  USER_SIGN_OUT,
  REQUEST_MY_SUBS,
  RECEIVE_MY_SUBS,
  MY_SUBS_ERROR,
} from "../actions/user";
import { RedditUser } from "snoowrap";
import { SimpleSubreddit } from "../components/SubredditList";
import * as LocalCache from "../LocalCache";

export type UserState = {
  loggedIn: boolean;
  isLoading: boolean;
  data: RedditUser | null;
  subsLoading: boolean;
  subscriptions: SimpleSubreddit[];
  subsError: string | null;
};

const defaultUser: UserState = {
  loggedIn: !!LocalCache.getLastActiveUser(),
  isLoading: false,
  data: null,
  subsLoading: false,
  subscriptions: [],
  subsError: null,
};

export default function user(state = defaultUser, action: any): UserState {
  switch (action.type) {
    case REQUEST_USER:
      return { ...state, isLoading: true };
    case SET_USER_STATUS:
      return { ...state, loggedIn: action.status };
    case RECEIVED_USER:
      return { ...state, loggedIn: true, isLoading: false, data: action.user };
    case USER_SIGN_OUT:
      return { ...state, loggedIn: false, isLoading: false, data: null };
    case REQUEST_MY_SUBS:
      return { ...state, subsLoading: true, subsError: null };
    case RECEIVE_MY_SUBS:
      return {
        ...state,
        subsLoading: false,
        subscriptions: action.subscriptions,
      };
    case MY_SUBS_ERROR:
      return {
        ...state,
        subsLoading: false,
        subsError: "Something went wrong",
      };
    default:
      return state;
  }
}
