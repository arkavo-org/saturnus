import styled from "styled-components";
import { transparentize } from "polished";

export const ListLetter = styled.div`
  background: ${props => props.theme.body};
  padding: 5px 15px;
  position: sticky;
  top: 50px;
`;

export const SubName = styled.div`
  margin-left: 1ch;
`;

export const EmptyMessage = styled.div`
  padding: 10px 15px;
  color: ${props => transparentize(0.5, props.theme.text)};
`;
