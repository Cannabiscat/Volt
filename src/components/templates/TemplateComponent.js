import React, { PureComponent } from 'react';
import Template from './TemplateList';
import TemplateModal from './TemplateModal';

export default class TemplateClass extends PureComponent {
  constructor() {
    super();
    this.state = {
      showModal: false,
      name: '',
      columns: {},
    };
    this.editFunction = () => null;
    this.createFunction = () => null;
    this.close = () => {
      this.setState({ showModal: false });
    };
    this.open = (e) => {
      e.preventDefault();
      this.setState({ showModal: true });
    };
  }

  render() {
    return (
      <div className='row'>
        <Template
          name={this.state.name}
          columns={this.state.columns}
          data={this.state.data}
          editOnClick={this.open}
          createOnClick={this.open}
        />
        <TemplateModal showVariable={this.state.showModal} close={this.close} />
        <TemplateModal showVariable={this.state.showModal} close={this.close} />
      </div>
    );
  }
}