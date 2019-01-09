import React from "react";
import { connect } from "react-redux";
import { callService, contentDelete } from "../caller/actions";
import { API } from "../initializer";
import { makeRequestState } from "../caller/selector";
import { isvalidobject, executeIfValid } from "../helper";

function mapStateToProps(state) {
    const getRequestState = makeRequestState();
    return (state, { name }) => getRequestState(state, name);
}

export class Caller extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { loading: false, cache: props.cache || true }
    }

    componentDidMount() {
        if (!isvalidobject(this.props.request)) {
            const { name, method = "get", target, params, external, config } = this.props;
            this.props.callService(name, method, { target, params, external, config });
        }
    }

    static getDerivedStateFromProps(props) {
        if (isvalidobject(props.request)) {
            return { loading: !props.request.fetched }
        }
        return null;
    }

    componentDidUpdate() {
        const { request } = this.props;
        if (isvalidobject(request)) {
            if (!request.fetching) {
                executeIfValid(this.props.onLoadEnd);
            }
            if (request.fetching) {
                executeIfValid(this.props.onLoadStart);
            } else {
                if (typeof request.response !== "undefined") {
                    executeIfValid(this.props.onSuccess, request.response);
                } else if (typeof request.error !== "undefined") {
                    executeIfValid(this.props.onFail, request.error);
                }
                !this.state.cache && this.props.contentDelete(this.props.name);
            }
        }
    }

    render() {
        return null;
    }
}

export const ConnectedCall = connect(
    mapStateToProps,
    { callService, contentDelete }
)(Caller);

export const Call = (props) => React.createElement(
    ConnectedCall, {
        ...props,
        context: API.context
    }
);
