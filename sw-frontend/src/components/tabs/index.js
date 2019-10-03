import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { TabsContainer } from './styles'
import { Colors } from 'config'

class TabsComponent extends PureComponent {
  static propTypes = {
    onTabPress: PropTypes.func,
    tabs: PropTypes.array,
    align: PropTypes.string,
    backgroundColor: PropTypes.string
  }

  static defaultProps = {
    backgroundColor: Colors.WHITE,
    tabs: [ 'Tab 1', 'Tab 2' ],
    onTabPress: () => {},
    align: 'center'
  }

  handleChange = (event, value) => {
    this.props.onTabPress(value)
  }

  render () {
    return (
      <TabsContainer
        align={this.props.align}
        backgroundColor={this.props.backgroundColor}>
        <Tabs
          value={this.props.activeTab}
          onChange={this.handleChange}
          indicatorColor='secondary'
          classes={{ indicator: 'tab-indicator' }}
          centered>
          {this.props.tabs.map(tab => <Tab key={tab} label={tab} />)}
        </Tabs>
      </TabsContainer>
    )
  }
}

export default TabsComponent
