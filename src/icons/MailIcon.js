import React, {Component} from "react";
import connect from "react-redux/lib/connect/connect";

class MailIcon extends Component {

    render() {
        return (
            <svg height="32px" version="1.1" viewBox="0 0 32 32"
                 width="32px" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(288 240)">
                    <path
                        d="M-288-236v24h32v-24H-288z M-272-223.316l-12.464-10.685h24.929L-272-223.316z M-272-220.684l3.899-3.342l8.771,10.023   h-25.343l8.771-10.023l3.897,3.342H-272z M-258-215.518l-8.582-9.811l8.582-7.355V-215.518z M-277.418-225.328l-8.582,9.81v-17.164   L-277.418-225.328z"/>
                </g>
            </svg>
        )
    }
}

export default connect()(MailIcon);