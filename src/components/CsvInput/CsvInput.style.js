import styled from "styled-components";

export const FileLabel = styled.label`
  background: ${({theme})=> theme.colors.lightPrimary};
  padding: 5px 10px;
`;
export const FileUploader = styled.div`
  cursor: pointer;
`;

export const FileInput = styled.input`
  visibility: hidden;
`;
