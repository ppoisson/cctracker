import React, { Component } from 'react';
import './App.css';
import {Modal, Glyphicon, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import $ from 'jquery';
import moment from 'moment';
import Settings from './Settings';
import Main from './Main';

class App extends Component {

  state = {
    open: false,
    ibalance:4290.88,
    balance: 4290.88,
    due: 23,
    email:'t@t.com',
    password:'tp',
    password2:'',
    validlogin:false,
    sharing:[],
    modalInvalid:false,
    modalMsg:'Invalid email and/or password. Please try again.',
    register:false,
    emailValidation:null,
    passwValidation:null,
    passw2Validation:null
  };

  getInitialState = () => {
    return JSON.parse(localStorage.getItem('cctracker') || '{}');
  }
  componentDidMount(){
    this.setState(this.getInitialState);
  }

  onToggleSettingsClick = () => {
    this.setState({open: !this.state.open});
  };

  updateDueDate = (d) => {
    this.setState({
      due: d
    });
  };

  updateBalance = (b) => {
    this.setState({
      balance: b
    });
  };

  signOut = () => {
    this.setState({
      email: '',
      password: '',
      validlogin:false
    });
  }

  handleChange = (e) => {
    e.preventDefault();
    const value = (e.target.value !== '') ? e.target.value : '';
    this.setState({
      [e.target.name] : value
    });
  }

  signIn = (e) => {
    // call DB check to see if user exists
    const calledemail = 't@t.com';  // this will be set from the db after login
    const calledpassw = 'tp'; // temporary until db is wired up
    if(this.state.email === calledemail && this.state.password === calledpassw){
      this.setState({
        emailValidation:null,
        passwValidation:null,
        passw2Validation:null,
        validlogin: true
      });
    } else {
      this.setState({
        emailValidation:'error',
        modalInvalid: true,
        modalMsg:"Invalid email and/or password. Please try again."
      });
    }
  }

  registerAccount = (e) => {
    let msg = [];
    // run validation
    if(this.state.email === ''){
      this.setState({
        emailValidation:'error'
      });
      msg.push("Email cannot be left blank.");
    }

    if(this.state.password === '' || this.state.password2 === ''){
      this.setState({
        password:"",
        password2:"",
        passwValidation:'error',
        passw2Validation:'error'
      });
      msg.push("Password/Password Confirmation cannot be left blank.");
    }

    if(this.state.password !== this.state.password2){
      this.setState({
        password:"",
        password2:"",
        passwValidation:'error',
        passw2Validation:'error'
      });
      msg.push("Passwords must match.");
    }

    if(msg.length === 0){
      this.setState({
        emailValidation:null,
        passwValidation:null,
        passw2Validation:null,
        validlogin: true
      });
    } else {
      this.setState({
        modalInvalid: true,
        modalMsg:msg.join("\n")
      });
    }
  }

  close = () => {
    this.setState({ modalInvalid: false });
  };

  toggleRegister = () => {
    this.setState({ register: !this.state.register });
  }

  renderSignIn = () => {
    return <div className="App-row">
      <h2>CC Tracker</h2>
      <p className="subtitle">Please sign in</p>
      <Form onSubmit={this.signIn}>
      <FormGroup validationState={this.state.emailValidation} >
        <ControlLabel bsClass="pull-left">Email Address</ControlLabel>
        <FormControl type="text" onChange={this.handleChange} bsSize="large" name="email" placeholder="Email Address" value="t@t.com" defaultValue="t@t.com" />
      </FormGroup>
      <FormGroup validationState={this.state.passwValidation}>
        <ControlLabel bsClass="pull-left">Password</ControlLabel>
        <FormControl type="password" onChange={this.handleChange}  bsSize="large" name="password" value="tp" defaultValue="tp" />
      </FormGroup>
      <Button bsSize="large" bsStyle="success" onClick={this.signIn} block>
        Sign In
      </Button>
    </Form>
    <p style={{marginTop:20}}>Need and account? <a href="#" onClick={this.toggleRegister}>Register</a></p>
    </div>
  }


  renderRegister = () => {
    return <div className="App-row">
      <h2>CC Tracker</h2>
      <p className="subtitle">Register account</p>
      <Form onSubmit={this.registerAccount}>
      <FormGroup validationState={this.state.emailValidation}>
        <ControlLabel bsClass="pull-left">Email Address</ControlLabel>
        <FormControl value={this.state.email} type="text" onChange={this.handleChange} bsSize="large" name="email" placeholder="Email Address" />
      </FormGroup>
      <FormGroup validationState={this.state.passwValidation}>
        <ControlLabel bsClass="pull-left">Password</ControlLabel>
        <FormControl value={this.state.password}  type="password" onChange={this.handleChange}  bsSize="large" name="password" />
      </FormGroup>
      <FormGroup validationState={this.state.passw2Validation}>
        <ControlLabel bsClass="pull-left">Confirm Password</ControlLabel>
        <FormControl value={this.state.password2} type="password" onChange={this.handleChange}  bsSize="large" name="password2" />
      </FormGroup>
      <Button bsSize="large" bsStyle="success" onClick={this.registerAccount} block>
        Register
      </Button>
    </Form>
    <p style={{marginTop:20}}>Already signed up? <a href="#" onClick={this.toggleRegister}>Sign In</a></p>
    </div>
  }

  renderMain = () => {
    localStorage.setItem('cctracker', JSON.stringify(this.state));
    const {register, open, due, balance, ibalance} = this.state;
    const now = moment();
    let start = moment().date(due);
    let end = moment().date(due).add(1, 'months');
    let when = start.diff(now, 'days'); // test to see if its upcomming or past
    if(when < 0) {
      when = end.diff(start, 'days'); // 1 day
    } else {
      end = start;
      start = moment().date(due).subtract(1, 'month');
    }
    const className = `page-wrap ${open ? 'panel-open' : 'panel-close'}`;
    const glyph = `${open ? 'chevron-left' : 'cog'}`;
    const headerNavs = `${open ? 'nav-left' : 'nav-right'}`;
    const title = `${open ? 'Settings' : 'Balance'}`;
    return <div><div className="App-header">
      <div className="App-title">{title}</div>
      <a className={headerNavs} onClick={this.onToggleSettingsClick}><Glyphicon glyph={glyph}  /></a>
    </div>
    <div className={className} style={{"width":window.innerWidth*2+"px", "height":window.innerHeight+"px"}}>
      <Main duedate={due} now={now} start={start} end={end} duein={when} balance={balance} ibalance={ibalance} />
      <Settings state={this.state} updateDueDate={this.updateDueDate} updateBalance={this.updateBalance} signOut={this.signOut} />
    </div>
    </div>
  }

  render() {
    const {validlogin, register} = this.state;
    const renderSignInOrRegister = (!register) ? this.renderSignIn() : this.renderRegister();
    return (
      <div className={"App"}>
        { (!validlogin) ? renderSignInOrRegister : this.renderMain() }
        <Modal bsSize="small" show={this.state.modalInvalid} onHide={this.close}>
          <Modal.Body>
            <h4>{this.state.modalMsg}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default App;
