import React, {Component} from "react";
import connect from "react-redux/lib/connect/connect";

class AcceptIcon extends Component {

    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 enableBackground="new 0 0 24 24">

                <path
                    d="M10,18c-0.5,0-1-0.2-1.4-0.6l-4-4c-0.8-0.8-0.8-2,0-2.8c0.8-0.8,2.1-0.8,2.8,0l2.6,2.6l6.6-6.6   c0.8-0.8,2-0.8,2.8,0c0.8,0.8,0.8,2,0,2.8l-8,8C11,17.8,10.5,18,10,18z"/>
            </svg>
        )
    }
}

export default connect()(AcceptIcon);