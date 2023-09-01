import { Img, Item } from "./ImageGalleryItem.styled"

export const ImageGalleryItem = ({ tags, webformatURL }) => {
    return (
        <Item >
            <Img src={webformatURL} alt={tags} />
        </Item>
    )
}