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