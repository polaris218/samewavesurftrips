import React, { PureComponent } from 'react';
import CircularProgress from './styles';

class PreloaderComponent extends PureComponent {

  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <CircularProgress />
    );
  }
}

export default PreloaderComponent;
