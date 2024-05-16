import React, {Component} from "react";
import connect from "react-redux/lib/connect/connect";

class DeleteIcon extends Component {

    render() {
        return (
            <svg version="1.1" x="0px" y="0px" width="512px" height="512px"
                 viewBox="0 0 459 459" enableBackground="new 0 0 459 459">
                <path d="M76.5,408c0,28.05,22.95,51,51,51h204c28.05,0,51-22.95,51-51V102h-306V408z M408,25.5h-89.25L293.25,0h-127.5l-25.5,25.5    H51v51h357V25.5z" />
            </svg>
        )
    }
}

export default connect()(DeleteIcon);