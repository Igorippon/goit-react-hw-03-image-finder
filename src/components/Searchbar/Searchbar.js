import PropTypes from 'prop-types';
import { Button, Form, Header, Input } from "./Searchbar.styled"
import { FcSearch } from 'react-icons/fc';

export const Searchbar = ({ onSubmit }) => {
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
                />
            </Form>
        </Header>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};