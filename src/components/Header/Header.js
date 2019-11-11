import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import './Header.scss';
import { pageMap } from '../../service/page-service';
import pageActions from '../../actions/page';
import gameActions from '../../actions/gameStatus';

class Header extends React.Component {
    backToHome = async () => {
        await this.props.dispatch({type: gameActions.reset});
        this.props.dispatch({type: pageActions.change, page: pageMap.playerSetup});

    }

    goToSetting = () => {
        this.props.dispatch({type: pageActions.change, page: pageMap.setting});
    }

    render() {
        return (
            <div className="title-section">
                <div className="title app-title">Avalon</div>
                {   this.props.currentPage === pageMap.playerSetup &&
                    this.props.location.pathname !== '/setting' &&
                    <RouterIcon css="fas fa-cog" click={this.goToSetting} url={'/setting'}/>
                }
                {   (this.props.currentPage !== pageMap.playerSetup ||
                    this.props.location.pathname === '/setting') &&
                    <RouterIcon css="fas fa-home" click={this.backToHome} url={'/'}/>
                }
            </div>
        );
    }
}

const RouterIcon = (props) => (
    <Route render={({history}) => (
        <i className={props.css} onClick={() => {
            props.click();
            history.push(props.url);
        }}></i>
    )} />
);

const mapStateToProps = (state) => {
    return {
        currentPage: state.page.current
    }
};

export default withRouter(connect(mapStateToProps)(Header));