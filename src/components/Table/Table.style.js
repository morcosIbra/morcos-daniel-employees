import styled, { css } from "styled-components";

export const TableWrapper = styled.table`
  border-collapse: collapse;
`;

const cellStyle = css`
  text-align: left;
  padding: 8px;
  border: 1px solid #ddd;
`;
export const HeaderCol = styled.th`
  ${cellStyle}
`;

export const RowCol = styled.td`
  ${cellStyle}
`;

export const Row = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.lightGrey};
  }
`;

export const HeaderRow = styled.tr`
  background-color: black;
  color: white;
`;
