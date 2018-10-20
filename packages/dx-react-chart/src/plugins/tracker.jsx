import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin,
  Template,
  Getter,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import { buildEventHandlers } from '@devexpress/dx-chart-core';

const wrapToList = arg => (arg ? [arg] : []);

const EVENT_NAME_MAP = {
  click: 'onClick',
  pointermove: 'onPointerMove',
  pointerleave: 'onPointerLeave',
};

const translateEventNames = (handlers) => {
  const result = {};
  Object.entries(handlers).forEach(([name, handler]) => {
    result[EVENT_NAME_MAP[name]] = handler;
  });
  return result;
};

// eslint-disable-next-line react/no-multi-comp
export class Tracker extends React.PureComponent {
  render() {
    const { onClick, onPointerMove } = this.props;
    return (
      <Plugin name="Tracker">
        <Getter name="clickHandlers" value={wrapToList(onClick)} />
        <Getter name="pointerMoveHandlers" value={wrapToList(onPointerMove)} />
        <Template name="canvas">
          <TemplateConnector>
            {(getters) => {
              const { clickHandlers, pointerMoveHandlers } = getters;
              const handlers = buildEventHandlers(getters, { clickHandlers, pointerMoveHandlers });
              return <TemplatePlaceholder params={translateEventNames(handlers)} />;
            }}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

Tracker.propTypes = {
  onClick: PropTypes.func,
  onPointerMove: PropTypes.func,
};

Tracker.defaultProps = {
  onClick: undefined,
  onPointerMove: undefined,
};