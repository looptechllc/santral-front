import React, {Component} from "react";
import connect from "react-redux/lib/connect/connect";

class RejectIcon extends Component {

    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"
                 enableBackground="new 0 0 128 128">

                <path
                    d="M81.646,64l22.248-22.249c3.48-3.48,3.474-9.131-0.019-12.623l-5.006-5.005  c-3.489-3.49-9.142-3.499-12.622-0.019L64,46.354L41.753,24.106c-3.484-3.483-9.133-3.472-12.624,0.018l-5.005,5.005  c-3.491,3.492-3.501,9.14-0.018,12.623L46.354,64L24.108,86.246c-3.483,3.484-3.472,9.133,0.018,12.623l5.005,5.006  c3.492,3.492,9.14,3.502,12.623,0.018L64,81.647l22.247,22.246c3.48,3.481,9.131,3.475,12.622-0.019l5.006-5.006  c3.489-3.489,3.498-9.142,0.019-12.622L81.646,64z"/>
            </svg>
        )
    }
}

export default connect()(RejectIcon);