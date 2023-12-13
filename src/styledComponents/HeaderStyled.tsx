import { styled, css } from "styled-components";
import rem from "../utilities/PxIntoRem";
import logo from '../assets/logo.svg';
import avatar from '../assets/image-avatar.jpg';
import { Link } from "react-router-dom";

export const StyledHeader = styled.header`
    background-color: ${ ({ theme }) => theme.general.headerBg};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: clamp(${rem(70)}, 10.5vw, ${rem(80)});
`;

export const svgCenterMixin = (svgUrl: string, rounded?: boolean) => css`
    position: absolute;
    top: calc(50% - (35% / 2));
    left: calc(50% - (35% / 2));
    content: '';
    width: ${svgUrl === logo ? '35%' : '32px'};
    height: ${svgUrl === logo ? '35%' : '32px'};
    background: url(${svgUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: ${rounded ? '50%' : ''};
`;

export const LogoLink = styled(Link)`
    background-color: ${ ({ theme }) => theme.general.logoPurple};
    height: 100%;
    width: clamp(${rem(72)}, 10.5vw, ${rem(80)});
    position: relative;
    border-radius: 0 ${rem(20)} ${rem(20)} 0;
    cursor: pointer;

    &::before {
        position: absolute;
        content: '';
        top: 50%;
        left: 0;
        width: 100%;
        height: 50%;
        background: ${ ({ theme }) => theme.general.logoPurpleLight};
        border-radius: ${rem(38)} 0 ${rem(20)} 0;
    }

    &::after {
        ${svgCenterMixin(logo)};
    }
`;

export const ThemeButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: clamp(${rem(70)}, 12vw, ${rem(150)});
    margin-left: auto;
    background-color: inherit;
    border: none;
    cursor: pointer;

    &:hover svg {
        color: ${ ({theme}) => theme.general.white};
        transition: color 300ms ease-in;
    }
`;

export const AvatarWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid ${ ({ theme }) => theme.general.gray};
    height: 100%;
    width: clamp(${rem(85)}, 10.5vw, ${rem(150)});
    position: relative;

    &::before {
        ${svgCenterMixin(avatar, true)};
    }
`;