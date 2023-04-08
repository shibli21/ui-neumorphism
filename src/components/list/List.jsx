import React from "react";

import { DEFAULT_PROPS, DEFAULT_PROPS_TYPE } from "../../assets/index.ts";
// import { callCallback } from '../../util/index.ts'

class List extends React.Component {
  static displayName = "NuList";

  static defaultProps = DEFAULT_PROPS;

  static propTypes = DEFAULT_PROPS_TYPE;

  render() {
    return <div>list</div>;
  }
}

export default List;
