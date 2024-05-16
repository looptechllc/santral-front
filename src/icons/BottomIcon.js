import React, {Component} from "react";
import connect from "react-redux/lib/connect/connect";

class BottomIcon extends Component {

    render() {
        return (
            <svg viewBox="0 0 314.5 314.5">
                <path
                    d="M314.5,90.5c0,6-2,13-7,18l-133,133c-5,5-10,7-17,7s-12-2-17-7l-133-133c-10-10-10-25,0-35 s24-10,34,0l116,116l116-116c10-10,24-10,34,0C312.5,78.5,314.5,84.5,314.5,90.5z"/>
            </svg>
        )
    }
}

export default connect()(BottomIcon);