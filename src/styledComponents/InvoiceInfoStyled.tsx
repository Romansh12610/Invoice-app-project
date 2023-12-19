import { styled } from "styled-components";
import rem from "../utilities/pxIntoRem";
import { Link } from "react-router-dom";
import { createFlexMixin } from "./GlobalStyles";
import FlexMixinInterface from "../interfaces/flexMixin";
import { CustomizableTextItem } from "../shared/typographyStyles";

export const MainSectionWrapper = styled.section`
    margin-top: ${rem(15)};
    min-height: 100vh;
    width: 90svw;
    margin-inline: auto;
`;

export const GoBackLinkWrapper = styled(Link)`
    font-size: ${rem(16)};
    font-weight: bold;
    color: ${({theme}) => theme.textColor};
    display: block;
    width: max-content;
    margin-block: ${rem(20)};
    border: 2px solid transparent;
    border-radius: ${rem(15)};
    padding: 0.5rem;
    transition: border-color 250ms ease-in-out;

    &:hover {
        border: 2px solid ${({theme}) => theme.general.purple};
    }
`;

export const GoBackLinkText = styled.span`
    padding-left: ${rem(10)};
`;

export const StatusBarWrapper = styled.div<{ $flexArgs: FlexMixinInterface }>`
    ${props => createFlexMixin(props.$flexArgs)};
    background-color: ${({theme}) => theme.invoiceBg};
    color: ${({theme}) => theme.textColorSecondary};
    padding: clamp(${rem(24)}, 4svw, ${rem(48)});
    margin-bottom: ${rem(15)};
    border-radius: ${rem(10)};
`;

export const InfoSection = styled.article<{ $flexArgs: FlexMixinInterface }>`
    ${props => createFlexMixin(props.$flexArgs)};
    background-color: ${({theme}) => theme.invoiceBg};
    transition: backround-color 300ms ease-in-out;
    padding: clamp(${rem(24)}, 4svw, ${rem(48)});
    border-radius: ${rem(10)};
`;

export const InfoWrapperPart = styled.div`
    background-color: inherit;
    display: grid;
    // mobile - 2 cols
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, auto);
    grid-template-areas: 
        'uid .'
        'addressFrom .'
        'date addressTo'
        'paymentDue addressTo'
        'sentTo .'
    ;
    gap: ${rem(25)};
    margin-bottom: ${rem(35)};
`;

// uid block 
export const UidDescriptionWrapper = styled.div`
    grid-area: uid;
`;

export const UidHashSpan = styled.span`
    color: ${props => props.theme.general.uidHash}; 
`;

export const UidText = styled(CustomizableTextItem)`
    color: ${({theme}) => theme.textColor};
`;

export const DescriptionText = styled(CustomizableTextItem)`
    color: ${({theme}) => theme.textColorSecondary};
`;

// address block
export const AddressFromWrapper = styled.div`
    grid-area: addressFrom;
`;

export const StreetTextFrom = styled(CustomizableTextItem)`
`;

export const CityTextFrom = styled(CustomizableTextItem)` 
`;

export const PostCodeFrom = styled(CustomizableTextItem)`  
`;

export const CountryTextFrom = styled(CustomizableTextItem)` 
`;

// invoice date block
export const InvoiceDateWrapper = styled.div`
    grid-area: date;
`;

export const InvoiceDateField = styled(CustomizableTextItem)``;

export const InvoiceDateValue = styled(CustomizableTextItem)``;

// payment due block
export const PaymentDueWrapper = styled.div`
    grid-area: paymentDue;
`;

export const PaymentDueField = styled(CustomizableTextItem)``;

export const PaymentDueValue = styled(CustomizableTextItem)``;

// sent to block
export const SentToWrapper = styled.div`
    grid-area: sentTo;
`;

export const SentToField = styled(CustomizableTextItem)``;

export const SentToValue = styled(CustomizableTextItem)``;

// bill to block
export const BillToWrapper = styled.div`
    grid-area: addressTo;
`;

export const BillToField = styled(CustomizableTextItem)``;

export const BillToName = styled(CustomizableTextItem)``;

export const BillToAddress = styled.div``;

export const StreetTextTo = styled(CustomizableTextItem)``;

export const CityTextTo = styled(CustomizableTextItem)``;

export const PostCodeTo = styled(CustomizableTextItem)``;

export const CountryTextTo = styled(CustomizableTextItem)``;

// items: price & count
export const ItemsWrapper = styled.div<{ $flexArgs: FlexMixinInterface }>`
    ${props => createFlexMixin(props.$flexArgs)};
    background-color: ${({theme}) => theme.invoiceBgSecondary};
    width: 95%;
    border-top-left-radius: ${rem(10)};
    border-top-right-radius: ${rem(10)};
    padding: ${rem(15)};
`;

export const ItemSingleWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-auto-flow: row;
    grid-auto-rows: auto;
    grid-template-areas: 
        'description . price'
        'quantity . price'
    ;
    justify-content: start;
    align-items: center;
`;

export const ItemTitleText = styled(CustomizableTextItem)`
    color: ${props => props.theme.textColor};
    grid-area: description;
`;

export const ItemPriceCountText = styled(CustomizableTextItem)`
    color: ${props => props.theme.textColorSecondary};
    grid-area: quantity;
`;

export const ItemTotalPriceText = styled(CustomizableTextItem)`
    color: ${props => props.theme.textColor};
    grid-area: price;
`;

// total block
export const TotalWrapper = styled.div<{ $flexArgs: FlexMixinInterface }>`
    background-color: ${props => props.theme.totalBlockBg};
    width: 95%;
    border-bottom-left-radius: ${rem(10)};
    border-bottom-right-radius: ${rem(10)};
    padding: ${rem(15)};
`;

export const TotalText = styled(CustomizableTextItem)`
    color: ${props => props.theme.general.white};
`;

export const TotalPrice = styled.p`
    font-size: clamp(1.35rem, 4.6svw, 1.7rem);
    font-weight: bold;
    color: ${props => props.theme.general.white};
`;