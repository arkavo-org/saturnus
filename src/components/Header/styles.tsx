import styled from "styled-components";

export const LogoWrapper = styled.div`
  background: ${props => props.theme.primary};
  color: white;
  font-size: 20px;
  padding: 10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SiteName = styled.div`
  display: flex;
  align-items: center;
`;

export const VersionTag = styled.span`
  margin-top: 2px;
  padding: 3px 4px 2px 3px;
  border: 1px solid;
  margin-left: 1ch;
  font-size: 11px;
  opacity: 0.3;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;
