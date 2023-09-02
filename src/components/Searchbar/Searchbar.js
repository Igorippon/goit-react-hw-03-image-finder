import { Button, Form, Header, Input } from "./Searchbar.styled"
import { FcSearch } from 'react-icons/fc'

export const Searchbar = ({ onSubmit, onChange }) => {
    return (
        <Header>
            <Form onSubmit={onSubmit}>
                <Button type="submit" >
                    <FcSearch />
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