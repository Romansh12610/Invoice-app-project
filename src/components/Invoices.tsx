import { MainContainer, Heading } from "../styledComponents/InvoicesStyled";

export default function Main() {
    return (
        <MainContainer flexArgs={{
            direction: 'column',
        }}>
           <Heading>I'm Main</Heading>
        </MainContainer>
    )
}