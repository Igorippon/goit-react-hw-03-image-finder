import { Button, Form, Header, Input, Span } from "./Searchbar.styled"

export const Searchbar = () => {
    return (
        <Header >
            <Form >
                <Button type="submit" >
                    <Span >Search</Span>
                </Button>

                <Input
                    type="text"
                    placeholder="Search images and photos"
                />
            </Form>
        </Header>
    )
}