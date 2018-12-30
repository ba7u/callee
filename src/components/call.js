import React from "react";
import { connect } from "react-redux";

class Caller extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement("div", null, "asdkkdas");
    }
}

export const Call = Caller;
// export const Call = connect(null, {})(Caller);