import { Component } from "react";
import PropTypes from 'prop-types';
import { Div, Overlay } from "./Modal.styled";


export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handlerKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handlerKeyDown);
    };

    handlerKeyDown = (evt) => {
        if (evt.code === "Escape") {
            this.props.onClick();
        };
    };

    handlerClick = (evt) => {
        if (evt.currentTarget === evt.target) {
            this.props.onClick();
        }
    }


    render() {
        const { image, tags } = this.props;
        return (
            <Overlay onClick={this.handlerClick} >
                <Div >
                    <img src={image} alt={tags} />
                </Div>
            </Overlay>
        );
    }
}

Modal.propTypes = {
    image: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}