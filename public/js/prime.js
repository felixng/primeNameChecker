// ****
// Natural Language Form
// ****
var FreeTextBox = React.createClass({
  componentDidMount: function() {
    // this.inputsubmit.addEventListener( 'click', function( ev ) { ev.preventDefault(); self.close(); } );
    // this.inputsubmit.addEventListener( 'touchstart', function( ev ) { ev.preventDefault(); self.close(); } );    
  },
  getInitialState: function() {
    return { value: '', toggleClass: 'nl-field-toggle',  open: false};
  },
  handleChange: function(e) {
    this.setState({value: e.target.value});
  },
  handleSubmit: function(e){
    e.preventDefault(); e.stopPropagation(); 
  },
  handleToggle: function(e){
    e.preventDefault(); e.stopPropagation(); 
    if( this.state.open ) {
      return false;
    };
    //this.setState{ open: true };
    //this.form.fldOpen = this.pos;
    //var self = this;
    
  },
  render: function() {
    return (
      <div className="nl-field nl-ti-text">
        <a className="nl-field-toggle " className={this.state.toggleClass} onClick={this.handleToggle}>{this.props.displayText}</a>
        <ul>
          <li className="nl-ti-input">
            <input type="text" 
                    placeholder={this.props.displayText} 
                    value={this.state.name} 
                    onCLick={this.handleSubmit}
                    onChange={this.handleChange} />
            <button className="nl-field-go">Go</button>
          </li>
          <li className="nl-ti-example">For example: <em>{this.props.exampleText}</em> //<em>Los Angeles</em> or <em>New York</em>
          </li>
        </ul>
      </div>
    );
  }
});

var NLForm = React.createClass({
  render: function() {
    return (
      <form id="nl-form" className="nl-form">
        My name is <FreeTextBox displayText='Christopher' exampleText='Christopher Boone'/>.
        I live in <FreeTextBox displayText='somewhere in UK' exampleText='London, or New York'/>.
        And you can reach me at <FreeTextBox displayText='detective@boone.com' exampleText='Christopher Boone'/>.
        
        <div className="nl-submit-wrap">
          <button className="nl-submit" type="submit">Is my name a Prime Number?</button>
        </div>
        <div className="nl-overlay"></div>
      </form>
    );
  }
});

ReactDOM.render(
  <NLForm displayText='any city' exampleText='LA!'/>,
  document.getElementById('main')
);


// ****
// Single Question
// ****
var QuestionForm = React.createClass({
	componentDidMount: function() {
        
  },
  getInitialState: function() {
    return {name: '', error: ''};
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var name = this.state.name.trim();

    if (name.length > 0 ){
        this.clearError();
        var num = name.toLowerCase().split('')
                    .map(function (char) {
                      return char.charCodeAt(0) - 96;
                    })
                    .reduce(function (current, previous) {
                      return previous + current;
                    });
        console.log(num);
    }
    else {
      this.showError('NOVAL');
    }
  },
  clearError: function(err){
    this.setState({errorMessage: ''});
    this.setState({errorClass: ''});
  },
  showError: function(err){
    var message = '';
    switch( err ) {
      case 'NOVAL' : 
        message = 'Please fill the field before continuing';
        break;
      case 'INVALIDEMAIL' : 
        message = 'Please fill a valid email address';
        break;
    };
    
    this.setState({errorMessage: message});
    this.setState({errorClass: 'fs-show fs-message-error'});
  },
  handleTextChange: function(e) {
    this.setState({name: e.target.value});
  },
	render: function() {
		return (
      <form id="myform" className="" autoComplete="off" >
  		  <ol className="fs-fields">
  		    <li className="fs-current">
  		      
            <label className="fs-field-label fs-anim-upper" htmlFor="q1">
                What is your name?
            </label>

  		      <input 
                className="fs-anim-lower" 
                id="q1" 
                name="q1" 
                type="text" 
                placeholder="Christopher Boone" 
                value={this.state.name}
                onChange={this.handleTextChange} 
            required />

  		    </li>
  		  </ol>
        
        <button className="fs-continue fs-show" onClick={this.handleSubmit}>Continue</button>
        <span className="fs-message-error" className={this.state.errorClass}>{this.state.errorMessage}</span>
      </form>
		);
	}
});

// ReactDOM.render(
//   <QuestionForm />,
//   document.getElementById('main')
// );