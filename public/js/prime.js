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

ReactDOM.render(
  <QuestionForm />,
  document.getElementById('main')
);