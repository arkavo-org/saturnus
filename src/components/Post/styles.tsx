import styled from "styled-components";
import Color from "color";
import { Link } from "react-router-dom";
import ContentBox from "../ContentBox";
import { ThemeColors } from "../../reducers/theme";

type ContainerProps = {
  saved: boolean;
  theme: ThemeColors;
};

export const Container = styled(ContentBox)`
  border-bottom: 5px solid;
  border-color: ${(p: ContainerProps) =>
    p.saved ? p.theme.mod : p.theme.contentBg};
`;

// This component is used to make the entire post covered
// by a Link component, so that the entire post can be
// clicked, including empty areas
// https://www.sarasoueidan.com/blog/nested-links/
export const NavClickTarget = styled(Link)`
  position: absolute !important;
  z-index: 0 !important;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
`;

type SubredditLinkProps = {
  bgColor: Color;
};

const getTextColor = (p: SubredditLinkProps) =>
  p.bgColor.luminosity() < 0.6 ? "white" : "black";

export const SubredditLink = styled(Link)`
  background: ${(p: SubredditLinkProps) => p.bgColor.toString()};
  color: ${getTextColor};
  padding: 5px 10px;
  display: inline-block;
  border-radius: 20px;
  text-decoration: none;
  transition: 100ms background;

  &:hover {
    background: ${(p: SubredditLinkProps) => p.bgColor.lighten(0.2).toString()};
  }

  &:active {
    background: ${(p: SubredditLinkProps) => p.bgColor.darken(0.2).toString()};
  }
`;

export const DropDownBtnWrapper = styled.div`
  button {
    width: 44px;
  }
`;

export const VoteButton = styled.button`
  display: block;
  padding: 3px 6px;
`;

export const getVoteColor = (vote: boolean | null) => {
  switch (vote) {
    case true:
      return "orange";
    case false:
      return "rgb(124, 108, 255)";
    default:
      return "inherit";
  }
};

type VoteBtnProps = {
  active: boolean;
};

export const UpvoteBtn = styled(VoteButton)`
  color: ${(props: VoteBtnProps) => (props.active ? "orange" : "inherit")};
`;

export const DownvoteBtn = styled(VoteButton)`
  color: ${(props: VoteBtnProps) =>
    props.active ? "rgb(124, 108, 255)" : "inherit"};

  @media (max-width: 576px) {
    margin-right: 15px;
    margin-top: 0;
  }
`;

type ScoreProps = {
  vote: boolean | null;
};

export const Score = styled.div`
  color: ${(props: ScoreProps) => getVoteColor(props.vote)};
  margin: 5px 0;
`;

export const TitleAndMoreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
