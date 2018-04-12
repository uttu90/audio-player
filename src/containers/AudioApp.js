import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { registerComponent, unregisterComponent, enableComponent, disableComponent } from '../reducers/components';
import SamplePlugin from '../plugins/SamplePlugin';
import SimpleControl from '../plugins/SimpleControl';

class AudioApp extends Component {
  componentDidMount() {
    this.props.registerComponent(SamplePlugin, "sample plugin");
    this.props.registerComponent(SimpleControl, "simple control");
  }
  
  render() {
    const { components } = this.props;
    return (
      <div>
        {
          components.map(({ component: Plugin, name}) => (
            <Plugin key={name} />
          ))
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    components: state.components
  }
}

function mapDispatchToProps(dispatch) {
  return {
    registerComponent: compose(dispatch, registerComponent),
    unregisterComponent: compose(dispatch, unregisterComponent),
    enableComponent: compose(dispatch, enableComponent),
    disableComponent: compose(dispatch, disableComponent),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioApp);