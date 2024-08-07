import React, {Component} from "react";
import connect from "react-redux/lib/connect/connect";

class DocumentIcon extends Component {

    render() {
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                <path
                    d="M17,21H7c-1.654,0-3-1.346-3-3V6c0-1.654,1.346-3,3-3h10c1.654,0,3,1.346,3,3v12C20,19.654,18.654,21,17,21z M7,5    C6.449,5,6,5.449,6,6v12c0,0.551,0.449,1,1,1h10c0.551,0,1-0.449,1-1V6c0-0.551-0.449-1-1-1H7z"/>
                <path
                    d="M16,11H8c-0.276,0-0.5-0.224-0.5-0.5S7.724,10,8,10h8c0.276,0,0.5,0.224,0.5,0.5S16.276,11,16,11z"/>
                <path d="M16,8H8C7.724,8,7.5,7.776,7.5,7.5S7.724,7,8,7h8c0.276,0,0.5,0.224,0.5,0.5S16.276,8,16,8z"/>
                <path
                    d="M16,14H8c-0.276,0-0.5-0.224-0.5-0.5S7.724,13,8,13h8c0.276,0,0.5,0.224,0.5,0.5S16.276,14,16,14z"/>
                <path
                    d="M16,17H8c-0.276,0-0.5-0.224-0.5-0.5S7.724,16,8,16h8c0.276,0,0.5,0.224,0.5,0.5S16.276,17,16,17z"/>
            </svg>
        )
    }
}

export default connect()(DocumentIcon);