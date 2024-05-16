import React, {Component} from "react";
import connect from "react-redux/lib/connect/connect";

class SuccessIcon extends Component {

    render() {
        return (
            <svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <circle id="circle" r="80" cy="120" cx="120" strokeWidth="5" stroke="#fff" fill="none"/>
                    <g id="popGroup">
                        <line stroke="#fff" strokeLinecap="butt" strokeLinejoin="null" id="svg_2" y2="10"
                              x2="120" y1="30" x1="120" fillOpacity="null" strokeOpacity="null" strokeWidth="5"
                              fill="none"/>
                        <line transform="rotate(45 120,120) " stroke="#fff"
                              strokeLinecap="butt" strokeLinejoin="null" id="svg_3" y2="10" x2="120" y1="30"
                              x1="120" fillOpacity="null" strokeOpacity="null" strokeWidth="5" fill="none"/>

                        <line transform="rotate(90 120,120) " stroke="#fff"
                              strokeLinecap="butt" strokeLinejoin="null" id="svg_4" y2="10" x2="120" y1="30"
                              x1="120" fillOpacity="null" strokeOpacity="null" strokeWidth="5" fill="none"/>

                        <line transform="rotate(135 120,120) " stroke="#fff" strokeLinecap="butt"
                              strokeLinejoin="null" id="svg_5" y2="10" x2="120" y1="30" x1="120"
                              fillOpacity="null" strokeOpacity="null" strokeWidth="5" fill="none"/>

                        <line transform="rotate(-180 120,120) " stroke="#fff" strokeLinecap="butt"
                              strokeLinejoin="null" id="svg_6" y2="10" x2="120" y1="30" x1="120"
                              fillOpacity="null" strokeOpacity="null" strokeWidth="5" fill="none"/>

                        <line transform="rotate(-135 120,120) " stroke="#fff"
                              strokeLinecap="butt" strokeLinejoin="null" id="svg_7" y2="10" x2="120" y1="30" x1="120"
                              fillOpacity="null" strokeOpacity="null" strokeWidth="5" fill="none"/>

                        <line transform="rotate(-90 120,120) " stroke="#fff"
                              strokeLinecap="butt" strokeLinejoin="null" id="svg_8" y2="10" x2="120" y1="30" x1="120"
                              fillOpacity="null" strokeOpacity="null" strokeWidth="5" fill="none"/>

                        <line stroke="#fff" transform="rotate(-45 120,120) "
                              strokeLinecap="butt" strokeLinejoin="null" id="svg_9" y2="10" x2="120" y1="30" x1="120"
                              fillOpacity="null" strokeOpacity="null" strokeWidth="5" fill="none"/>
                    </g>
                    <g id="tick">
                        <line id="tick1" stroke="#fff" strokeLinecap="null" strokeLinejoin="null" y2="150"
                              x2="110" y1="130" x1="90" fillOpacity="null" strokeOpacity="null"
                              strokeWidth="5" fill="none"/>
                        <line id="tick2"
                              stroke="#fff" strokeLinecap="null" strokeLinejoin="null" y2="80" x2="170"
                              y1="147.5" x1="109" fillOpacity="null" strokeOpacity="null" strokeWidth="5" fill="none"/>
                    </g>
                </g>
            </svg>
        )
        /*return (
            <svg width="580" height="400" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <circle id="circle" r="80" cy="191.5" cx="294" strokeWidth="10" stroke="#fff" fill="none"/>
                    <g id="popGroup">
                        <line stroke="#fff" strokeLinecap="butt" strokeLinejoin="null" id="svg_2" y2="77.981489"
                              x2="291.5" y1="98" x1="291.5" fillOpacity="null" strokeOpacity="null" strokeWidth="5"
                              fill="none"/>
                        <line transform="rotate(45 375.49999999999994,123.99074554443358) " stroke="#fff"
                              strokeLinecap="butt" strokeLinejoin="null" id="svg_3" y2="113.981489" x2="375.5" y1="134"
                              x1="375.5" fillOpacity="null" strokeOpacity="null" strokeWidth="5" fill="none"/>
                        <line transform="rotate(90 398.50000000000006,198.99075317382815) " stroke="#fff"
                              strokeLinecap="butt" strokeLinejoin="null" id="svg_4" y2="188.981489" x2="398.5" y1="209"
                              x1="398.5" fillOpacity="null" strokeOpacity="null" strokeWidth="5" fill="none"/>
                        <line transform="rotate(135 363.5,274.99075317382807) " stroke="#fff" strokeLinecap="butt"
                              strokeLinejoin="null" id="svg_5" y2="264.981489" x2="363.5" y1="285" x1="363.5"
                              fillOpacity="null" strokeOpacity="null" strokeWidth="5" fill="none"/>
                        <line transform="rotate(-180 285.5,299.99072265625) " stroke="#fff" strokeLinecap="butt"
                              strokeLinejoin="null" id="svg_6" y2="289.981489" x2="285.5" y1="310" x1="285.5"
                              fillOpacity="null" strokeOpacity="null" strokeWidth="5" fill="none"/>
                        <line transform="rotate(-135 201.49999999999997,268.99072265625) " stroke="#fff"
                              strokeLinecap="butt" strokeLinejoin="null" id="svg_7" y2="258.981489" x2="201.5" y1="279"
                              x1="201.5" fillOpacity="null" strokeOpacity="null" strokeWidth="5" fill="none"/>
                        <line transform="rotate(-90 183.50000000000003,197.99075317382812) " stroke="#fff"
                              strokeLinecap="butt" strokeLinejoin="null" id="svg_8" y2="187.981489" x2="183.5" y1="208"
                              x1="183.5" fillOpacity="null" strokeOpacity="null" strokeWidth="5" fill="none"/>
                        <line stroke="#fff" transform="rotate(-45 207.49999999999997,127.99075317382812) "
                              strokeLinecap="butt" strokeLinejoin="null" id="svg_9" y2="117.981489" x2="207.5" y1="138"
                              x1="207.5" fillOpacity="null" strokeOpacity="null" strokeWidth="5" fill="none"/>
                    </g>
                    <g id="tick">
                        <line id="tick1" stroke="#fff" strokeLinecap="null" strokeLinejoin="null" y2="218.000001"
                              x2="291.500001" y1="200" x1="263.5" fillOpacity="null" strokeOpacity="null"
                              strokeWidth="10" fill="none"/>
                        <line id="tick2" transform="rotate(10.907037734985352 306.99999999999994,186.49999999999983) "
                              stroke="#fff" strokeLinecap="null" strokeLinejoin="null" y2="156.999997" x2="319.500001"
                              y1="216" x1="294.5" fillOpacity="null" strokeOpacity="null" strokeWidth="10" fill="none"/>
                    </g>
                </g>
            </svg>
        )*/
    }
}

export default connect()(SuccessIcon);