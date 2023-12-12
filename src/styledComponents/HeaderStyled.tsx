import { styled } from "styled-components";
import rem from "../utilities/PxIntoRem";
import logo from '../assets/logo.svg';
import { Link } from "react-router-dom";

export const StyledHeader = styled.header`
    background-color: var(--header-bg);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: clamp(${rem(70)}, 10.5vw, ${rem(80)});
`;

export const LogoWrapper = styled(Link)`
    background-color: var(--logo-violet-dark);
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
        background: var(--logo-violet-light);
        border-radius: ${rem(38)} 0 ${rem(20)} 0;
    }

    &::after {
        position: absolute;
        top: calc(50% - (35% / 2));
        left: calc(50% - (35% / 2));
        content: '';
        width: 35%;
        height: 35%;
        background: url('${logo}');
        background-repeat: no-repeat;
        background-size: contain;
    }
`;

export const ThemeButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 15%;
    margin-left: auto;
    background-color: inherit;
    border: none;
    cursor: pointer;

    &:hover svg {
        color: var(--white);
        transition: color 300ms ease-in;
    }
`;

export const AvatarWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: ${rem(2)} solid var(--gray);
    height: 100%;
    width: 15%;
`;