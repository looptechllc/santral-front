import React, {Component} from "react";
import connect from "react-redux/lib/connect/connect";

class PhoneIcon extends Component {

    render() {
        return (
            <svg height="32px" version="1.1" viewBox="0 0 32 32"
                 width="32px" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(96 384)">
                    <path
                        d="M-65.224-359.142l-0.147-0.445c-0.353-1.045-1.504-2.135-2.563-2.422l-3.918-1.07c-1.063-0.289-2.578,0.1-3.354,0.877   l-1.418,1.418c-5.153-1.393-9.194-5.434-10.586-10.586l1.418-1.418c0.777-0.777,1.166-2.291,0.878-3.354l-1.068-3.92   c-0.289-1.063-1.381-2.214-2.424-2.563l-0.447-0.15c-1.045-0.348-2.535,0.004-3.313,0.781l-2.12,2.123   c-0.38,0.377-0.621,1.455-0.621,1.459c-0.074,6.734,2.565,13.225,7.33,17.986c4.752,4.752,11.216,7.389,17.931,7.332   c0.035,0,1.145-0.238,1.523-0.615l2.12-2.121C-65.228-356.604-64.875-358.097-65.224-359.142L-65.224-359.142z"/>
                </g>
            </svg>
        )
    }
}

export default connect()(PhoneIcon);