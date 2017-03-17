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
      body: null,
      url: '',
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
    this.send = (e) => {
      e.preventDefault();
      const rawData = e.target.elements;
      const data = Object.keys(rawData).filter(item => rawData[item].tagName === 'INPUT').reduce((acc, item) => {
        const id = rawData[item].dataset.id;
        acc[id] = rawData[item].value; //eslint-disable-line
        return acc;
      }, {});
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
        <TemplateModal
          showVariable={this.state.showModal}
          close={this.close}
          Content={this.state.body}
          send={this.send}
        />
      </div>
    );
  }
}