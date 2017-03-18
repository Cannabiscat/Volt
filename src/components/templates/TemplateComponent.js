import React, { PureComponent } from 'react';
import axios from 'axios';
import Template from './TemplateList';
import TemplateCreateEdit from './TemplateCreateEdit';
import TemplateModalDeleteConfirm from './TemplateModalDeleteConfirm';

export default class TemplateClass extends PureComponent {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showConfirmModal: false,
    };
    this.getData = () => {
      axios(this.state.url)
      .then(res => res.data)
      .then((res) => {
        const data = res.reduce((acc, item, index) => {
          return acc.concat(this.state.getDataObject(item, index));
        }, []);
        this.setState({ data });
      });
    };
    this.close = () => {
      this.setState({
        showModal: false,
        initialState: {},
      });
    };
    this.openEditCreate = (e) => {
      e.preventDefault();
      const item = Object.keys(this.state.data)
        .filter(i => this.state.data[i].id === Number(e.target.dataset.id));
      if (e.target.dataset.id) {
        this.setState({
          initialState: this.state.data[item],
          idToEdit: e.target.dataset.id,
        });
      } else {
        this.setState({
          idToEdit: 'none',
        });
      }
      this.setState({ showModal: true });
    };
    this.send = editId => (e) => {
      e.preventDefault();
      const rawData = e.target.elements;
      const data = Object.keys(rawData).filter(item => rawData[item].tagName === 'INPUT').reduce((acc, item) => {
        const id = rawData[item].dataset.id;
        acc[id] = rawData[item].value; //eslint-disable-line
        return acc;
      }, {});
      if (editId === 'none') {
        axios.post(this.state.url, data).then(() => {
          this.setState({ showModal: false });
          this.getData();
        });
      } else {
        axios.put(`${this.state.url}/${editId}`, data).then(() => {
          this.setState({ showModal: false });
          this.getData();
        });
      }
    };
    this.openConfirm = (e) => {
      this.setState({
        showConfirmModal: true,
        idToDelete: e.target.dataset.id,
      });
    };
    this.closeConfirm = () => {
      this.setState({
        showConfirmModal: false,
      });
    };
    this.delete = () => {
      axios.delete(`${this.state.url}/${this.state.idToDelete}`)
        .then(() => {
          this.getData();
          this.setState({
            showConfirmModal: false,
          });
        });
    };
    this.createButton = <button className='btn btn-default create' onClick={this.openEditCreate}>Create</button>;
  }

  render() {
    return (
      <div className='row'>
        <Template
          name={this.state.name}
          columns={this.state.columns}
          data={this.state.data}
          editOnClick={this.openEditCreate}
          // createOnClick={this.openEditCreate}
          createButton={this.createButton}
          deleteOnClick={this.openConfirm}
        />
        <TemplateCreateEdit
          showVariable={this.state.showModal}
          idToEdit={this.state.idToEdit}
          close={this.close}
          Content={this.state.body}
          send={this.send}
          initialData={this.state.initialState}
        />
        <TemplateModalDeleteConfirm
          showVariable={this.state.showConfirmModal}
          close={this.closeConfirm}
          del={this.delete}
          idToDelete={this.state.idToDelete}
        />
      </div>
    );
  }
}