import * as React from 'react';
import './style.css';


export default class RightMenu extends React.Component {
     
  render() {
    return (
      <div className="right-menu">
        <div className={`sidebar  ${this.props.className} ${this.props.show ? 'sidebar-open' : 'sidebar-close'}`} >

          <div className="title">
          <a className="closebtn" onClick={this.props.onClose}> x </a>

            {this.props.titleElement}
          </div>
          <div className="body">{this.props.bodyElement}</div>
          <div className="footer">{this.props.footerElement}</div>
        </div>
      </div>
    );
  }
}
