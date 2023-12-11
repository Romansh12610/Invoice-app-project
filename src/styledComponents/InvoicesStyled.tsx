import { styled } from "styled-components";

export const MainBody = styled.main`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

export const Heading = styled.h1`
    color: ${({ theme }) => theme.textColor};
    font-size: clamp(1.25rem, 5vw, 2rem);
`;

//continue here