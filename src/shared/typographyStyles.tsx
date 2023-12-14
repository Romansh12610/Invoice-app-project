import { createFontMixin } from "../styledComponents/GlobalStyles";
import { styled } from "styled-components";
import FontPropsInterface from "../interfaces/fontProps";

type WeightsType = '500' | '600' | '700';

const fontMapping = {
    size: {
        small: 16,
        medium: 18,
        large: 22,
    },
    weight: {
        thin: '200',
        medium: '400',
        bold: '700'
    },
    letterSpacing: {
        thin: '-0.8',
        medium: '1.2',
        wide: '1.5',
    },
    lineHeight: {
        low: '0.8',
        medium: '1,2',
        high: '1.4',
    }
}

export const CustomizableTextItem = styled.p<FontPropsInterface>`
    ${props => createFontMixin({
        $size: fontMapping.size[props.$size],
        $weight: fontMapping.weight[props.$weight] as WeightsType,
        $letterSpacing: props.$letterSpacing ? fontMapping.letterSpacing[props.$letterSpacing] : '',
        $lineHeight: props.$lineHeight ? fontMapping.lineHeight[props.$lineHeight] : '',
    })};
`;