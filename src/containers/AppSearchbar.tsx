import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { RootState, DispatchType } from "../reducers";
import { setSearchValue } from "../actions/search";
import { connect } from "react-redux";
import Searchbar from "../components/Searchbar";

type StateProps = {
  query: string;
};

type DispatchProps = {
  setValue: (query: string) => void;
};

type Props = StateProps & DispatchProps & RouteComponentProps;

class AppSearchbar extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    const queryString = this.props.location.search;
    const searchParams = new URLSearchParams(queryString);
    const q = searchParams.get("q");

    props.setValue(q || "");
  }

  onSubmit = () => {
    const { history, query } = this.props;
    history.push(`/search?q=${query}`);
  };

  onChange = (query: string) => {
    this.props.setValue(query);
  };

  clearFunc = () => {
    this.props.setValue("");
  };

  componentDidUpdate(prevProps: Props) {
    // if we navigate away from the search page, clear the search bar
    const { location } = this.props;
    const isOnSearchPage = location.pathname.includes("/search");

    if (prevProps.location !== location && !isOnSearchPage) {
      this.clearFunc();
    }
  }

  render() {
    const { query } = this.props;

    return (
      <Searchbar
        value={query}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        clearFunc={this.clearFunc}
      />
    );
  }
}

function mapStateToProps({ search }: RootState): StateProps {
  return {
    query: search.query,
  };
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    setValue: (query: string) => {
      dispatch(setSearchValue(query));
    },
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AppSearchbar),
);
