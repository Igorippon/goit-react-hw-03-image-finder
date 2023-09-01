import { Button, Form, Header, Input, Span } from "./Searchbar.styled"

export const Searchbar = ({ onSubmit, onChange }) => {
    return (
        <Header>
            <Form onSubmit={onSubmit}>
                <Button type="submit" >
                    <Span>Search</Span>
                </Button>

                <Input
                    type="text"
                    name="search"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={onChange}
                />
            </Form>
        </Header>
    )
} 