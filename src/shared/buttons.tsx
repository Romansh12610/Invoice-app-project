import { styled } from "styled-components";
import rem from "../utilities/PxIntoRem";

export type JustifyType = 'space-between' | 'space-evenly' | 'space-around' | 'flex-start' | 'flex-end'

const ButtonDefault = styled.button<{ justify?: JustifyType }>`
    border-radius: ${rem(24)};
    display: flex;
    justify-content: ${props => props.justify ?? 'center'};
    align-items: center;
    padding: ${rem(17)} ${rem(24)};
    width: fit-content;
    height: auto;
    position: relative;
    cursor: pointer;
`;

export default ButtonDefault;