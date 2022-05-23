import * as React from "react";

class IssuesIcon extends React.Component {
  render() {
    const { color, size, className } = this.props;
    return (
      <svg
        aria-hidden="true"
        height={size}
        viewBox="0 0 24 24"
        version="1.1"
        width={size}
        data-view-component="true"
        className={"octicon octicon-issue-opened blankslate-icon " + className}
      >
        <path
          fill={color}
          fill-rule="evenodd"
          d="M2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0zM12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm0 13a2 2 0 100-4 2 2 0 000 4z"
        ></path>
      </svg>
    );
  }
}

IssuesIcon.defaultProps = {
  size: "16",
};

export default IssuesIcon;
