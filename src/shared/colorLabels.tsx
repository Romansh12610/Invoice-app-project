import { styled } from "styled-components";
import rem from "../utilities/pxIntoRem";

type LabelColors = 'green' | 'orange' | 'gray';

export const StyledLabel = styled.div<{ $color: LabelColors, $gridArea: string, $justifySelf?: string }>`
    color: ${({ theme, $color }) => (
        $color === 'green' ? theme.general.greenLight :
        $color === 'orange' ? theme.general.orangeLight :
        theme.general.gray
    )};

    background-color: ${({ theme, $color }) => (
        $color === 'green' ? theme.general.greenBg :
        $color === 'orange' ? theme.general.orangeBg :
        theme.general.gray
    )};

    width: ${rem(105)};
    height: ${rem(30)};
    padding-block: ${rem(5)};
    position: relative;
    display: flex;
    justify-content: center;
    justify-self: ${({$justifySelf}) => $justifySelf ? $justifySelf : ''};
    align-items: center;
    gap: ${rem(5)};
    border-radius: ${rem(8)};
    grid-area: ${({$gridArea}) => $gridArea};
    position: relative;
    font-weight: bold;

    &::before {
        content: '';
        display: inline;
        margin-bottom: ${rem(3)};
        width: ${rem(10)};
        height: ${rem(10)};
        border-radius: 50%;
        background-color: ${({ theme, $color }) => (
            $color === 'green' ? theme.general.greenLight :
            $color === 'orange' ? theme.general.orangeLight :
            theme.general.gray
        )};
    }
`