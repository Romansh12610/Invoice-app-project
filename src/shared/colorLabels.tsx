import { styled } from "styled-components";
import rem from "../utilities/pxIntoRem";


type LabelColors = 'green' | 'orange' | 'gray';

export const StyledLabel = styled.div<{ $color: LabelColors }>`
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

    width: ${rem(500)};
    height: ${rem(135)};
    padding-block: ${rem(13)};
    text-align: center;
    position: relative;

    &::before {
        content: '';
        width: ${rem(10)};
        height: ${rem(10)};
        border-radius: 50%;
        background-color: ${({ theme, $color }) => (
            $color === 'green' ? theme.general.greenLight :
            $color === 'orange' ? theme.general.orangeLight :
            theme.general.gray
        )};
        top: 0;
        left: ${rem(-5)};
    }
`