import PropTypes from 'prop-types';
import { Div, Overlay } from "./Modal.styled";

export const Modal = ({ largeImageURL, tags, onClick }) => {
    return (
        <Overlay onClick={onClick}>
            <Div >
                <img src={largeImageURL} alt={tags} />
            </Div>
        </Overlay>
    );
};

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}