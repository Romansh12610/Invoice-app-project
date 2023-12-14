import { MainContainer, HeadingTitle, HeadingSubtitle } from "../styledComponents/InvoicesStyled";

export default function Main() {
    return (
        <MainContainer $flexArgs={{
            direction: 'column',
        }}>
            <HeadingTitle>I'm Main</HeadingTitle>
            <HeadingSubtitle
                $size='large'
                $weight='thin'
                $letterSpacing='wide'
            >There are X total invoices</HeadingSubtitle>
        </MainContainer>
    )
}