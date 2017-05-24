import React, { Component } from 'react';
import {Button, Glyphicon, Form, FormGroup, InputGroup, FormControl} from 'react-bootstrap';

class Settings extends Component {

  state = {
  };

  onTogglePanelClick = name => {
    this.setState({
      [name]: !this.state[name]
    });
  };

  handleUpdateDueDate = () => {
    this.props.updateDueDate(this.input.value);
  }

  handleUpdateBalance = (event) => {
    event.preventDefault();
    this.props.updateBalance(this.input.value);
  }

  signout = () => {
    this.props.signOut();
  }

  render() {
    const {due, ibalance, email} = this.props.state;
    return (
      <div className="page" style={{"textAlign":"left", "padding":"0", "width":window.innerWidth+"px", "height":window.innerHeight+"px"}}>

        <div className="App-row">
          <h4>Payment Day</h4>
          <Form>
              <FormGroup>
                <FormControl type="text" bsSize="large" inputRef={(ref) => {this.input = ref}} name="duedate" value={due} onChange={this.handleUpdateDueDate} placeholder="Day Date (ex. 23)" />
              </FormGroup>
          </Form>
        </div>

        <div className="App-row">
          <h4>Sharing</h4>
          <Form onSubmit={this.commitSharing}>
              <FormGroup>
                <InputGroup>
                  <FormControl type="text" bsSize="large" name="sharing" placeholder="email@domain.com" />
                  <InputGroup.Button>
                    <Button bsSize="large" onClick={this.commitSharing}>
                      <Glyphicon glyph="ok" />
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
          </Form>
        </div>

        <div className="App-row">
          <h4>Reset Balance</h4>
          <Form>
            <FormGroup>
              <InputGroup>
                <FormControl type="text" inputRef={(ref) => {this.input = ref}} bsSize="large" name="balance" placeholder={ibalance} />
                <InputGroup.Button>
                  <Button bsSize="large" onClick={this.handleUpdateBalance}>
                    <Glyphicon glyph="ok" />
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </Form>
        </div>

        <div className="App-row">
          <h4>Account</h4>
            <Button bsSize="large" bsStyle="danger" onClick={this.signout} block>
              Sign Out ({email})
            </Button>
        </div>

      </div>
    );
  }
}

export default Settings;
