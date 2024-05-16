import React, {Component} from "react";
import connect from "react-redux/lib/connect/connect";

class CloseIcon extends Component {

    render() {
        return (
            <svg enableBackground="new 0 0 32 32" height="32px" id="Слой_1" version="1.1" viewBox="0 0 32 32"
                 width="32px" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z"
                    id="Close"/>
            </svg>
        )
    }
}

export default connect()(CloseIcon);