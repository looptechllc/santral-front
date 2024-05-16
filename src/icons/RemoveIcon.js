import React, {Component} from "react";
import connect from "react-redux/lib/connect/connect";

class RemoveIcon extends Component {

    render() {
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                 viewBox="0 0 510.2 510.2" enableBackground="new 0 0 510.2 510.2">
                <g>
                    <g>
                        <path
                            d="M468.433,85.666h-108.8c-10.667-57.6-68.267-96-125.867-83.2C191.1,11,159.1,43,150.567,85.666h-108.8 c-12.8,0-21.333,8.533-21.333,21.333v64h469.333v-64C489.767,94.2,481.233,85.666,468.433,85.666z M195.367,85.666 C203.9,60.067,227.367,43,255.1,43s51.2,17.067,59.733,42.667H195.367z"/>
                    </g>
                </g>
                <g>
                    <g>
                        <path
                            d="M63.1,190.2v298.667c0,12.8,8.533,21.333,21.333,21.333h341.333c12.8,0,21.333-8.533,21.333-21.333V190.2H63.1z M169.767,446.2H127.1v-192h42.667V446.2z M276.433,446.2h-42.667v-192h42.667V446.2z M383.1,446.2h-42.667v-192H383.1V446.2z"/>
                    </g>
                </g>
            </svg>
        )
    }
}

export default connect()(RemoveIcon);