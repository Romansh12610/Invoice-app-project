import { MainContainer, HeadingTitle, HeadingSubtitle, HeadingWrapper, TitleWrapper, FilterButton, FilterText, NewInvoiceButton, NewInvoiceText } from "../styledComponents/InvoicesStyled";
import Icon from "../Icon/Icon";
import { useTheme } from "styled-components";

export default function Main() {

    const colorTheme = useTheme();

    return (
        <MainContainer $flexArgs={{
            direction: 'column',
        }}>
            <HeadingWrapper
                $flexArgs={{
                    justify: 'space-between',
                    alignItems: 'center'
                }}
            >
                <TitleWrapper
                    $flexArgs={{
                        direction: 'column'
                    }}
                >
                    <HeadingTitle>Invoices</HeadingTitle>
                    <HeadingSubtitle
                        $size="medium"
                        $weight="thin"
                    >There are X total invoices</HeadingSubtitle>
                </TitleWrapper>
                <FilterButton
                    $flexArgs={{
                        direction: "row",

                    }}
                >
                    <FilterText
                        $size="medium"
                        $weight="bold"
                    >Filter by status</FilterText>
                    <Icon 
                        name="arrow-down"
                        size={11}
                        color={colorTheme.general.purple}
                    />
                </FilterButton>
                <NewInvoiceButton $justify="flex-end">
                    <NewInvoiceText
                        $size="small"
                        $weight="medium"
                        $letterSpacing="medium"
                    >
                        New Invoice
                    </NewInvoiceText>
                </NewInvoiceButton>
            </HeadingWrapper>
        </MainContainer>
    )
}