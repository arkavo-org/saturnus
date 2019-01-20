import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import SaturnusLogo from "./SaturnusLogo";

type IconProps = {
  theme: any;
  color?: string;
};

const commonCSS = css`
  display: inline-block;
  border-radius: 50%;
  border: 2px solid white;
  width: 50px;
  height: 50px;
  margin-right: 1ch;
  background-color: ${(props: IconProps) => props.color || props.theme.primary};

  @media (max-width: 399px) {
    margin-bottom: 8px;
  }
`;

const IconImg = styled.img`
  ${commonCSS};
`;

const Fallback = styled.div`
  ${commonCSS};
  display: flex;
  align-items: center;
  justify-content: center;

  .saturnus-logo {
    font-size: 0.85em;
  }
`;

type Props = {
  subreddit: {
    key_color?: string;
    primary_color?: string;
    icon_img?: string;
  };
};

function SubredditIcon({ subreddit }: Props) {
  const color = subreddit.key_color || subreddit.primary_color;

  if (subreddit.icon_img) {
    return <IconImg src={subreddit.icon_img} color={color} />;
  }

  return (
    <Fallback color={color}>
      <SaturnusLogo />
    </Fallback>
  );
}

export default SubredditIcon;
