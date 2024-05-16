import React, {Component} from "react";
import connect from "react-redux/lib/connect/connect";

class ViewIcon extends Component {

    render() {
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16px" height="16px">
                <path
                    d="M8,6c0,1.104-0.896,2-2,2c0,1.104,0.896,2,2,2s2-0.896,2-2S9.104,6,8,6z M8,2C3.898,2,0,6.648,0,8s3.898,6,8,6s8-4.648,8-6  S12.102,2,8,2z M8,12c-2.209,0-4-1.791-4-4s1.791-4,4-4s4,1.791,4,4S10.209,12,8,12z"/>
            </svg>
        )
    }
}

export default connect()(ViewIcon);