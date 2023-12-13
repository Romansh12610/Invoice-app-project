import { MainContainer, HeadingTitle, HeadingSubtitle } from "../styledComponents/InvoicesStyled";

export default function Main() {
    return (
        <MainContainer $flexArgs={{
            direction: 'column',
        }}>
            <HeadingTitle>I'm Main</HeadingTitle>
            <HeadingSubtitle
                size='small'
                weight='thin'
                letterSpacing='thin'
                lineHeight='low'
            >There are X total invoices</HeadingSubtitle>
        </MainContainer>
    )
}