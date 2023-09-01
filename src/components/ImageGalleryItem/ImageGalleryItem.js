import { Img, Item } from "./ImageGalleryItem.styled"

export const ImageGalleryItem = ({ tags, webformatURL, onClick, id }) => {
    return (
        <Item onClick={() => onClick(id)}>
            <Img src={webformatURL} alt={tags} />
        </Item>
    )
}