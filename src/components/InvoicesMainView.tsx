import { MainContainer, HeadingTitle, HeadingSubtitle, HeadingWrapper, TitleWrapper, NewInvoiceButton, NewInvoiceText } from "../styledComponents/InvoicesStyled";
import Filter from "./Filter";
import { useGlobalContext } from "./ContextWrapper";
import InvoiceList from "./InvoiceList";


export default function Main() {

    const { orientation } = useGlobalContext();

    return (
        <MainContainer $flexArgs={{
            direction: 'column',
            alignItems: 'center',
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
                    >{orientation === 'desktop' && 'There are'} X total invoices</HeadingSubtitle>
                </TitleWrapper>
                <Filter />
                <NewInvoiceButton $justify="flex-end">
                    <NewInvoiceText
                        $size="small"
                        $weight="bold"
                        $letterSpacing="medium"
                    >
                        New {orientation === 'desktop' && 'Invoice'}
                    </NewInvoiceText>
                </NewInvoiceButton>
            </HeadingWrapper>
            
            <InvoiceList />

        </MainContainer>
    )
}