import React from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { Dropdown } from 'react-bootstrap';
import './Setting.scss';
import preferenceActions from '../../actions/preference';

class Setting extends React.Component {
    constructor(props) {
        super(props);
        let preferenceFromCookie = this.props.cookies.get('avalonPreference');
        if (preferenceFromCookie) {
            this.props.dispatch({type: preferenceActions.initialWithData, data: preferenceFromCookie});
        }
    }

    setPreference = (key, value) => {
        this.props.dispatch({type: preferenceActions.set, key: key, value: value});
        this.props.cookies.set('avalonPreference', this.props.preference);
    }

    render() {
        return (
            <div className="setting-page">
                <div className="title">Setting</div>
                <div className="setting-line">
                    <div className="setting-name">Theme</div>
                    <Dropdown alignRight="true">
                        <Dropdown.Toggle id="setting-theme-dropdown">
                            {this.props.preference.theme}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.setPreference('theme', 'Default')}>Default</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setPreference('theme', 'Politics')}>Politics</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        preference: state.preference
    }
};

export default withCookies(connect(mapStateToProps)(Setting));