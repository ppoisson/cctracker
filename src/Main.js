import React, { Component } from 'react';
import {Modal, Table, ProgressBar, Glyphicon, Button} from 'react-bootstrap';
import $ from 'jquery';

class Main extends Component {

  state = {
    showModal: false
  };

  resize = () => this.forceUpdate()

  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    let e = $("#input").text();
    if(e !== "0.00"){
      this.setState({ showModal: true });
    }
  };

  formatMoney = (n) => {
    n += '';
    n = n.replace(/,/g, '');
  	var x = n.split('.');
  	var n1 = x[0];
  	var n2 = x.length > 1 ? '.' + x[1].substr(0,2) : '';
  	var r = /(\d+)(\d{3})/;
  	while (r.test(n1)) {
  		n1 = n1.replace(r, '$1,$2');
  	}
    n = n1 + n2;
  	return n;
  };

  onNumberClick = (n) => {
    let e = $("#input").text();
    if(e === "0.00"){
      e = "";
    }
    if(n === "<"){
      e = e.substring(0, e.length - 1);
      n = "";
      if(e === ""){
        e = "0.00"
      }
    }
    e += n;
    e = this.formatMoney(e);
    $("#input").text(e);
  };

  onAddClick = () => {
    let t = $("#total").text();
    let n = $("#input").text();
    t = t.replace(/,/g, '');
    n = n.replace(/,/g, '');
    t = parseFloat(t)+parseFloat(n);
    t = this.formatMoney(t);
    $("#total").text(t);
    $("#input").text("0.00");
    this.close();
  }

  render() {
    const {duein, now, start, end, balance} = this.props;
    const input = $("#input").text();

    var targetDate = end;
    var beginDate = start;
    var totalTime = (targetDate - beginDate);
    var dateProgress = now - beginDate;
    var completionPercentage = (Math.round((dateProgress / totalTime) * 100));
    if(completionPercentage >= 100){
      completionPercentage -= 100;
    }

    return (
      <div className="page App-main" style={{"width":window.innerWidth+"px", "height":window.innerHeight+"px"}}>
        <div className="App-total">
          <span className="App-tally" id="total">{balance}</span>
          <div className="App-progress">
            <ProgressBar now={completionPercentage} />
            <span className="App-cycle">Due in <span className="App-days-left">{duein}</span> Days</span>
          </div>
          <div className="App-add">
            <Table responsive bsClass="App-add">
              <tbody>
                <tr>
                  <td id="input">0.00</td>
                  <td id="add" onClick={this.open}>ADD</td>
                </tr>
              </tbody>
            </Table>
            <Table responsive bsClass="App-numbers">
              <tbody>
                <tr>
                  <td onClick={() => this.onNumberClick("1")}>1</td>
                  <td onClick={() => this.onNumberClick("2")}>2</td>
                  <td onClick={() => this.onNumberClick("3")}>3</td>
                </tr>
                <tr>
                  <td onClick={() => this.onNumberClick("4")}>4</td>
                  <td onClick={() => this.onNumberClick("5")}>5</td>
                  <td onClick={() => this.onNumberClick("6")}>6</td>
                </tr>
                <tr>
                  <td onClick={() => this.onNumberClick("7")}>7</td>
                  <td onClick={() => this.onNumberClick("8")}>8</td>
                  <td onClick={() => this.onNumberClick("9")}>9</td>
                </tr>
                <tr>
                  <td onClick={() => this.onNumberClick(".")}>.</td>
                  <td onClick={() => this.onNumberClick("0")}>0</td>
                  <td onClick={() => this.onNumberClick("<")}><Glyphicon glyph="arrow-left" /></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>

        <Modal bsSize="small" show={this.state.showModal} onHide={this.close}>
          <Modal.Body>
            <h4>Confirm add of <b>${ input }</b> to the total?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>No</Button>
            <Button bsStyle="success" onClick={this.onAddClick}>Yes</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

export default Main;
