import React, {Component} from "react";
import connect from "react-redux/lib/connect/connect";

class UploadIcon extends Component {

    render() {
        return (
            <svg version="1.1" viewBox="0 0 14 19" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <g>
                        <g>
                            <path d="M4,13 L10,13 L10,7 L14,7 L7,0 L0,7 L4,7 L4,13 Z" id="Shape"/>
                            <rect height="2" id="Rectangle-path" width="14" x="0" y="15"/>
                        </g>
                    </g>
                </g>
            </svg>
        )
    }
}

export default connect()(UploadIcon);