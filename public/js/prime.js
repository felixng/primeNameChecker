var QuestionForm = React.createClass({
	componentDidMount: function() {
        
  },
  getInitialState: function() {
    return {name: ''};
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var name = this.state.name.trim();
    var num = name.toLowerCase().split('')
            .map(function (char) {
              return char.charCodeAt(0) - 96;
            })
            .reduce(function (current, previous) {
              return previous + current;
            });

    console.log(num);
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
        <span className="fs-message-error"></span>
      </form>
		);
	}
});

ReactDOM.render(
  <QuestionForm />,
  document.getElementById('main')
);