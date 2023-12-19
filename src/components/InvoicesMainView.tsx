import { MainContainer, HeadingTitle, HeadingSubtitle, HeadingWrapper, TitleWrapper, NewInvoiceButton, NewInvoiceText } from "../styledComponents/InvoicesStyled";
import Filter from "./Filter";
import { useGlobalContext } from "./ContextWrapper";
import InvoiceList from "./InvoiceList";
import { headerVariants } from "../utilities/mainContentVariants";
import { AnimatePresence } from "framer-motion";


export default function Main() {

    const { orientation } = useGlobalContext();

    return (
        <AnimatePresence>
            <MainContainer 
                $flexArgs={{
                    direction: 'column',
                    alignItems: 'center',
                }}
                whileInView='animate'
                exit='exit'
            >
                <HeadingWrapper
                    $flexArgs={{
                        justify: 'space-between',
                        alignItems: 'center'
                    }}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    variants={headerVariants}
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
                
                {/* list of invoices */}
                <InvoiceList />
            </MainContainer>
        </AnimatePresence>
    )
}