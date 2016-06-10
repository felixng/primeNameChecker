require("particles.js")
var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var maxStage = 3;
particlesJS.load('container', 'particles.json', function() {
  console.log('callback - particles.js config loaded');
});

var timer;

// ****
// Natural Language Form
// ****
var Intro = React.createClass({
  getInitialState: function() {
    return {  };
  },
  // next: function(){
  //   console.log('onupdate');
  //   this.props.onUpdate(true);
  // },
  render: function() {
    return (
        <div key="this.props.text">
            {this.props.text}
        </div>
    );
  }
});

var Error = React.createClass({
  getInitialState: function() {
    return {  };
  },
  
  render: function() {
    return (
        <div className="errorMessage">
            I don't talk to strangers...
        </div>
    );
  }
});

var Result = React.createClass({
  getInitialState: function() {
    return { prime: '' };
  },
  componentDidMount: function(){
    if (!this.props.isPrime){
      this.setState({prime: 'not '});
    }
    else{
      this.setState({prime: ''});
    }
  },
  render: function() {
    var shareText = "My%20name%20"
                       + encodeURIComponent(this.props.name)
                       + "%20is%20"
                       + encodeURIComponent(this.state.prime)
                       + "a%20prime%20number:%20"
                       + this.props.number
                       + "!%20Check%20yours%20at%20Project%20Curious%20Name!";
    var tweetText = "My%20name%20"
                       + encodeURIComponent(this.props.name)
                       + "%20is%20"
                       + encodeURIComponent(this.state.prime)
                       + "a%20prime%20number%20"
                       + this.props.number
                       + "!%20Is%20yours?%20";
    return (
        <div className="result-text">
            <span className="highlight">{this.props.name}</span> equals to: <div className="result-number">{this.props.number}</div> 
            Your name  <span className="highlight">is {this.state.prime}</span>a prime number!
            <div className="startOver">      
              <h6>
                <a className="curious-icon curious-icon-facebook" href={"javascript:fbShare('" + shareText + "')"} target="_blank"><span>Share!</span></a>
                <a className="curious-icon curious-icon-twitter" href={"javascript:tweet('" + tweetText + "%40curiousonstage%20%40curiousbroadway', 520, 350)"} target="_blank"><span>Tweet</span></a>
                <a className="curious-icon curious-icon-refresh" href="/"><span>Start Over</span></a>
              </h6>
            </div>
        </div>
    );
  }
});

var FreeTextBox = React.createClass({
  getInitialState: function() {
    return { value: '', toggleClass: 'nl-field nl-ti-text', displayText: this.props.displayText};
  },
  componentWillReceiveProps: function(nextProps){
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
  getInitialState: function() {
    return { open: false, stage: 0, isPrime: false, number: 0, name: '' };
  },
  componentDidMount: function() {
    window.addEventListener('keyup', this.keyDown);
    timer = setTimeout(this.next, 10000);
  },
  nextStage: function() {
    this.setState({error: false});
    this.setState({ stage: this.state.stage + 1 });
    if (this.state.stage == maxStage)
    {
      var slider = $('#slider').slideReveal();
      slider.slideReveal("toggle");
    }
  },
  lastStage: function() {
    this.setState({ stage: this.state.stage - 1 });
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
  subscribe: function(formData){
    if (formData){
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: formData,
        success: function(data) {
          console.log('success!');
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });  
    }
  },
  handleSubmit: function(e){
    e.preventDefault(); e.stopPropagation(); 
    var name = this.refs['name'].getInputValue();
    var location = this.refs['location'].getInputValue();
    var email = this.refs['email'].getInputValue();
    if (name != '' && location != '' && email != '')
    {
      var resultNumber = this.calcNumber(name.replace(' ', ''));
      
      this.setState({name: name});
      if (resultNumber != undefined && resultNumber % 2 !== 0){
        this.setState({isPrime: true, number: resultNumber});
      }
      else{
        this.setState({isPrime: false, number: resultNumber});
      }

      this.subscribe({name: name, location:location, email: email, date: Date.now(), readable_date: new Date()});
      this.nextStage();
    }
    else {
      this.setState({error: true});
    }
  },
  next: function(e){
    if (e){
      e.preventDefault(); e.stopPropagation();   
    }
    
    clearTimeout(timer);
    if (this.state.stage == 0 || this.state.stage == 1){
      timer = setTimeout(this.next, 10000);
    }

    if (this.state.stage != 2 && this.state.stage < maxStage){
      //setTimeout(this.next, 10000);
      this.nextStage();
    }
  },
  back: function(e){
    e.preventDefault(); e.stopPropagation(); 

    clearTimeout(timer);
    if (this.state.stage == 1 || this.state.stage == 2){
      timer = setTimeout(this.next, 10000);
    }

    if (this.state.stage > 0){
      this.lastStage();
    }
  },
  handleChange: function(val){
    this.setState({open: val});
  },
  calcNumber: function(name){
    if (name.length > 0 ){
        var num = name.trim().toLowerCase().split('')
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
      <div className="fs-form-wrap" id="fs-form-wrap">
          <div className="fs-title">
            <h1>
              <a href="/">Project Curious Name</a>
              <div className="sub-title">by <a href="http://ensemblr.co/?utm_source=curious-name&utm_medium=title-link&utm_campaign=landing-page" target="_blank">ensemblr.co</a></div>
            </h1>

            <div className="curious-top">
              { this.state.stage != 0 ? 
                <a className="curious-icon curious-icon-prev" onClick={this.back}><span>Back</span></a>
                : null }
              { this.state.stage == 0 || this.state.stage == 1 ? 
                <a className="curious-icon curious-icon-next" onClick={this.next}><span>Next</span></a>
                : null }
            </div>
          </div>

          <div className="main clearfix" id="main">
            <form id="nl-form" className="nl-form">
              { this.state.stage == 0 ? 
                  <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    <Intro
                      text="Hello, my name is Christopher John Francis Boone. I am a 15-year-old boy from Swindon, England. And I like Prime Numbers." /> 
                  </ReactCSSTransitionGroup>
                  : null }
              { this.state.stage == 1 ? 
                  <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    <Intro
                      text={["I don't talk to strangers... But if you introduce yourself, I will tell you if your name equals a prime number!"]} /> 
                  </ReactCSSTransitionGroup>
                  : null }
              { this.state.error ? 
                <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    <Error /> 
                  </ReactCSSTransitionGroup>
                : null }
              { this.state.stage == 2 ? 
                <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    <div id="details">
                      My name is <FreeTextBox ref="name" 
                                   open={this.state.open} 
                                   onUpdate={this.handleChange}
                                   displayText='Christopher' 
                                   exampleText='Christopher Boone'/>.
                      I live in <FreeTextBox ref="location" 
                                   open={this.state.open} 
                                   onUpdate={this.handleChange}
                                   displayText='somewhere in UK' 
                                   exampleText='London, or New York'/>.
                      And you can reach me at <FreeTextBox ref="email" 
                                                 open={this.state.open} 
                                                 onUpdate={this.handleChange}  
                                                 displayText='detective@boone.com' 
                                                 exampleText='Christopher Boone'/>
                      <div className="nl-submit-wrap">
                        <button className="nl-submit" type="submit" onClick={this.handleSubmit}>Is my name a Prime Number?</button>
                      </div>
                      <div className="disclaimer">*We hate spam. We will use your e-mail address solely to provide information and updates about Curious Name and Ensemblr.co</div>
                      <div className="nl-overlay" onClick={this.closeOverlay}></div>
                    </div>
                  </ReactCSSTransitionGroup>
                
                 : null }
              { this.state.stage == 3 ? 
                <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    <Result name={this.state.name} 
                    isPrime={this.state.isPrime} 
                    number={this.state.number} /> 
                </ReactCSSTransitionGroup>
              : null }
            </form>
          </div>
      </div>
    );
  }
});

ReactDOM.render(
  <NLForm url="/api/subscribe"/>,
  document.getElementById('container')
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

