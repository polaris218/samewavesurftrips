import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { Routes } from 'config';
import { Fab } from './styles';

class FabComponent extends PureComponent {

  static propTypes = {
    action: PropTypes.func,
  }

  static defaultProps = {
      action: () => {},
  }

  showFab = null

  componentDidMount() {
    this.showFab = setTimeout( () => this.ref.classList.add('show'), 500);
  }

  componentWillUnmount = () => {
      if(this.showFab) clearTimeout(this.showFab);
  }

  onPress = () => {
    this.props.history.push(`/${Routes.CREATE}`)
  }

  render() {
    return (
      <Fab
        ref={(ref) => { this.ref = ref }}
        onClick={this.onPress}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z"/>
          </svg>
      </Fab>
    );
  }
}

export default withRouter(FabComponent);
