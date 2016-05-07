// ****
// Natural Language Form
// ****
var Intro = React.createClass({
  getInitialState: function() {
    return { };
  },
  render: function() {
    return (
        <div>
            Hello, my name is Christopher John Francis Boone.  I am fifteen-year-old.  I am from Swindon, England.
        </div>
    );
  }
});

var FreeTextBox = React.createClass({
  getInitialState: function() {
    return { value: '', toggleClass: 'nl-field nl-ti-text', displayText: this.props.displayText};
  },
  componentWillReceiveProps: function(nextProps){
    console.log('componentWillReceiveProps');
    if (!nextProps.open){
      this.setState({ toggleClass: 'nl-field nl-ti-text'});
      this.updateValue();
    }
  },
  handleChange: function(e) {
    this.setState({value: e.target.value});
  },
  handleSubmit: function(e){
    e.preventDefault(); e.stopPropagation(); 
    this.setState({ toggleClass: 'nl-field nl-ti-text'});
    this.updateValue();    
    this.props.onUpdate(false);
  },
  handleToggle: function(e){
    e.preventDefault(); e.stopPropagation(); 
    this.setState({ toggleClass: 'nl-field nl-ti-text nl-field-open'});
    this.props.onUpdate(true);
  },
  updateValue: function(e){
    if (this.state.value.trim() != ''){
        this.setState({displayText: this.state.value});
    }
    else {
        this.setState({displayText: this.props.displayText});  
    }
  },
  getInputValue: function(){
    return this.state.value;
  },
  render: function() {
    return (
      <div className="nl-field nl-ti-text" className={this.state.toggleClass}>
        <a className="nl-field-toggle " onClick={this.handleToggle}>{this.state.displayText}</a>
        <ul>
          <li className="nl-ti-input">
            <input type="text" 
                    placeholder={this.props.displayText} 
                    value={this.state.value} 
                    onChange={this.handleChange} />
            <button className="nl-field-go noselect" onClick={this.handleSubmit}>Go</button>
          </li>
          <li className="nl-ti-example">For example: <em>{this.props.exampleText}</em> 
          </li>
        </ul>
      </div>
    );
  }
});

var NLForm = React.createClass({
  componentDidMount: function() {
    window.addEventListener('keyup', this.keyDown);
  },
  getInitialState: function() {
    return { open: false };
  },
  closeOverlay: function(e) {
    this.setState({open: false});
  },
  keyDown: function(e) {
    if (this.state.open){
      //Esc Key
      if(e.keyCode == 27) {
          this.setState({open: false});
      }
      // if(e.keyCode == 13) {
      //   this.setState({open: false});
      // }
    }
    else {
      // if(e.keyCode == 13){
      //   this.handleSubmit(e);
      // }
    }
  },
  handleSubmit: function(e){
    e.preventDefault(); e.stopPropagation(); 
    var name = this.refs['name'].getInputValue();
    var resultNumber = this.calcNumber(name);
    console.log(resultNumber);
    if (resultNumber != undefined && resultNumber % 2 !== 0){
      console.log('Prime');
    }
    else{
      console.log('Not Prime');
    }

  },
  handleChange: function(val){
    this.setState({open: val});
  },
  calcNumber: function(name){
    if (name.length > 0 ){
        var num = name.toLowerCase().split('')
                    .map(function (char) {
                      return char.charCodeAt(0) - 96;
                    })
                    .reduce(function (current, previous) {
                      return previous + current;
                    });
        return num;
    }
  },
  render: function() {
    return (
      <form id="nl-form" className="nl-form">
        <div >
        My name is <FreeTextBox ref="name" 
                     open={this.state.open} 
                     onUpdate={this.handleChange}
                     displayText='Christopher' 
                     exampleText='Christopher Boone'/>.
        I live in <FreeTextBox open={this.state.open} 
                     onUpdate={this.handleChange}
                     displayText='somewhere in UK' 
                     exampleText='London, or New York'/>.
        And you can reach me at <FreeTextBox open={this.state.open} 
                     onUpdate={this.handleChange}  
                     displayText='detective@boone.com' 
                     exampleText='Christopher Boone'/>.
        
        <div className="nl-submit-wrap">
          <button className="nl-submit" type="submit" onClick={this.handleSubmit}>Is my name a Prime Number?</button>
        </div>
        <div className="nl-overlay" onClick={this.closeOverlay}></div>
        </div>
      </form>
    );
  }
});

ReactDOM.render(
  <NLForm/>,
  document.getElementById('main')
);


// ****
// Single Question
// ****
// var QuestionForm = React.createClass({
//   getInitialState: function() {
//     return {name: '', error: ''};
//   },
//   handleSubmit: function(e) {
//     e.preventDefault();

//     var name = this.state.name.trim();

//     if (name.length > 0 ){
//         this.clearError();
//         var num = name.toLowerCase().split('')
//                     .map(function (char) {
//                       return char.charCodeAt(0) - 96;
//                     })
//                     .reduce(function (current, previous) {
//                       return previous + current;
//                     });
//         console.log(num);
//     }
//     else {
//       this.showError('NOVAL');
//     }
//   },
//   clearError: function(err){
//     this.setState({errorMessage: ''});
//     this.setState({errorClass: ''});
//   },
//   showError: function(err){
//     var message = '';
//     switch( err ) {
//       case 'NOVAL' : 
//         message = 'Please fill the field before continuing';
//         break;
//       case 'INVALIDEMAIL' : 
//         message = 'Please fill a valid email address';
//         break;
//     };
    
//     this.setState({errorMessage: message});
//     this.setState({errorClass: 'fs-show fs-message-error'});
//   },
//   handleTextChange: function(e) {
//     this.setState({name: e.target.value});
//   },
// 	render: function() {
// 		return (
//       <form id="myform" className="" autoComplete="off" >
//   		  <ol className="fs-fields">
//   		    <li className="fs-current">
  		      
//             <label className="fs-field-label fs-anim-upper" htmlFor="q1">
//                 What is your name?
//             </label>

//   		      <input 
//                 className="fs-anim-lower" 
//                 id="q1" 
//                 name="q1" 
//                 type="text" 
//                 placeholder="Christopher Boone" 
//                 value={this.state.name}
//                 onChange={this.handleTextChange} 
//             required />

//   		    </li>
//   		  </ol>
        
//         <button className="fs-continue fs-show" onClick={this.handleSubmit}>Continue</button>
//         <span className="fs-message-error" className={this.state.errorClass}>{this.state.errorMessage}</span>
//       </form>
// 		);
// 	}
// });

// ReactDOM.render(
//   <QuestionForm />,
//   document.getElementById('main')
// );