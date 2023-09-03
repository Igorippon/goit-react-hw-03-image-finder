import PropTypes from 'prop-types';
import { Img, Item } from "./ImageGalleryItem.styled"

export const ImageGalleryItem = ({ tags, webformatURL, onClick, id }) => {
    return (
        <Item onClick={() => onClick(id)}>
            <Img src={webformatURL} alt={tags} />
        </Item>
    );
};

ImageGalleryItem.propTypes = {
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};