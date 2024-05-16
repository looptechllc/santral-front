import React, {Component} from "react";
import connect from "react-redux/lib/connect/connect";

class ResetIcon extends Component {

    render() {
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" >
                <path
                    d="M260.6,18.1c131.2-3.1,240.5,101.1,243.6,232.3S403.1,490.8,271.9,493.9c-83.7,2-160.7-38.9-206-109.4    l64.3-41.3c30.8,47.9,83.1,75.7,139.9,74.3c89.1-2.1,159.8-76.3,157.7-165.4c-2.1-89.1-76.3-159.8-165.4-157.7    c-65.1,1.5-122.6,41.7-146.5,102.2l-71.1-28.1C80,79.4,164.7,20.3,260.6,18.1z"/>
                <path
                    d="M186.9,294.5l-144-44.2c-4.9-1.5-10,1.7-10.8,6.7L7.9,405.7c-1.2,7.1,6.6,12.3,12.8,8.5l168.3-104.5   C195.1,305.9,193.9,296.6,186.9,294.5z"/>
            </svg>
        )
    }
}

export default connect()(ResetIcon);