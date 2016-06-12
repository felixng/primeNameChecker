require("particles.js")
var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var maxStage = 3;
var maxPrime = 7507;
var primeNumbers = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997,1009,1013,1019,1021,1031,1033,1039,1049,1051,1061,1063,1069,1087,1091,1093,1097,1103,1109,1117,1123,1129,1151,1153,1163,1171,1181,1187,1193,1201,1213,1217,1223,1229,1231,1237,1249,1259,1277,1279,1283,1289,1291,1297,1301,1303,1307,1319,1321,1327,1361,1367,1373,1381,1399,1409,1423,1427,1429,1433,1439,1447,1451,1453,1459,1471,1481,1483,1487,1489,1493,1499,1511,1523,1531,1543,1549,1553,1559,1567,1571,1579,1583,1597,1601,1607,1609,1613,1619,1621,1627,1637,1657,1663,1667,1669,1693,1697,1699,1709,1721,1723,1733,1741,1747,1753,1759,1777,1783,1787,1789,1801,1811,1823,1831,1847,1861,1867,1871,1873,1877,1879,1889,1901,1907,1913,1931,1933,1949,1951,1973,1979,1987,1993,1997,1999,2003,2011,2017,2027,2029,2039,2053,2063,2069,2081,2083,2087,2089,2099,2111,2113,2129,2131,2137,2141,2143,2153,2161,2179,2203,2207,2213,2221,2237,2239,2243,2251,2267,2269,2273,2281,2287,2293,2297,2309,2311,2333,2339,2341,2347,2351,2357,2371,2377,2381,2383,2389,2393,2399,2411,2417,2423,2437,2441,2447,2459,2467,2473,2477,2503,2521,2531,2539,2543,2549,2551,2557,2579,2591,2593,2609,2617,2621,2633,2647,2657,2659,2663,2671,2677,2683,2687,2689,2693,2699,2707,2711,2713,2719,2729,2731,2741,2749,2753,2767,2777,2789,2791,2797,2801,2803,2819,2833,2837,2843,2851,2857,2861,2879,2887,2897,2903,2909,2917,2927,2939,2953,2957,2963,2969,2971,2999,3001,3011,3019,3023,3037,3041,3049,3061,3067,3079,3083,3089,3109,3119,3121,3137,3163,3167,3169,3181,3187,3191,3203,3209,3217,3221,3229,3251,3253,3257,3259,3271,3299,3301,3307,3313,3319,3323,3329,3331,3343,3347,3359,3361,3371,3373,3389,3391,3407,3413,3433,3449,3457,3461,3463,3467,3469,3491,3499,3511,3517,3527,3529,3533,3539,3541,3547,3557,3559,3571,3581,3583,3593,3607,3613,3617,3623,3631,3637,3643,3659,3671,3673,3677,3691,3697,3701,3709,3719,3727,3733,3739,3761,3767,3769,3779,3793,3797,3803,3821,3823,3833,3847,3851,3853,3863,3877,3881,3889,3907,3911,3917,3919,3923,3929,3931,3943,3947,3967,3989,4001,4003,4007,4013,4019,4021,4027,4049,4051,4057,4073,4079,4091,4093,4099,4111,4127,4129,4133,4139,4153,4157,4159,4177,4201,4211,4217,4219,4229,4231,4241,4243,4253,4259,4261,4271,4273,4283,4289,4297,4327,4337,4339,4349,4357,4363,4373,4391,4397,4409,4421,4423,4441,4447,4451,4457,4463,4481,4483,4493,4507,4513,4517,4519,4523,4547,4549,4561,4567,4583,4591,4597,4603,4621,4637,4639,4643,4649,4651,4657,4663,4673,4679,4691,4703,4721,4723,4729,4733,4751,4759,4783,4787,4789,4793,4799,4801,4813,4817,4831,4861,4871,4877,4889,4903,4909,4919,4931,4933,4937,4943,4951,4957,4967,4969,4973,4987,4993,4999,5003,5009,5011,5021,5023,5039,5051,5059,5077,5081,5087,5099,5101,5107,5113,5119,5147,5153,5167,5171,5179,5189,5197,5209,5227,5231,5233,5237,5261,5273,5279,5281,5297,5303,5309,5323,5333,5347,5351,5381,5387,5393,5399,5407,5413,5417,5419,5431,5437,5441,5443,5449,5471,5477,5479,5483,5501,5503,5507,5519,5521,5527,5531,5557,5563,5569,5573,5581,5591,5623,5639,5641,5647,5651,5653,5657,5659,5669,5683,5689,5693,5701,5711,5717,5737,5741,5743,5749,5779,5783,5791,5801,5807,5813,5821,5827,5839,5843,5849,5851,5857,5861,5867,5869,5879,5881,5897,5903,5923,5927,5939,5953,5981,5987,6007,6011,6029,6037,6043,6047,6053,6067,6073,6079,6089,6091,6101,6113,6121,6131,6133,6143,6151,6163,6173,6197,6199,6203,6211,6217,6221,6229,6247,6257,6263,6269,6271,6277,6287,6299,6301,6311,6317,6323,6329,6337,6343,6353,6359,6361,6367,6373,6379,6389,6397,6421,6427,6449,6451,6469,6473,6481,6491,6521,6529,6547,6551,6553,6563,6569,6571,6577,6581,6599,6607,6619,6637,6653,6659,6661,6673,6679,6689,6691,6701,6703,6709,6719,6733,6737,6761,6763,6779,6781,6791,6793,6803,6823,6827,6829,6833,6841,6857,6863,6869,6871,6883,6899,6907,6911,6917,6947,6949,6959,6961,6967,6971,6977,6983,6991,6997,7001,7013,7019,7027,7039,7043,7057,7069,7079,7103,7109,7121,7127,7129,7151,7159,7177,7187,7193,7207,7211,7213,7219,7229,7237,7243,7247,7253,7283,7297,7307,7309,7321,7331,7333,7349,7351,7369,7393,7411,7417,7433,7451,7457,7459,7477,7481,7487,7489,7499,7507]


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

particlesJS.load('container', 'particles.json', function() {
  //console.log('callback - particles.js config loaded');
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
            {this.props.text}
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
                       + "a%20prime%20number:%20"
                       + this.props.number
                       + "!%20Is%20yours?%20";
    var London = Math.ceil(Math.random() * 10) % 2;
    var mentionHandle = '';
    if (London == 1){
      mentionHandle = '%40curiousonstage%20via%20@ensemblrapp';
    }
    else{
      mentionHandle = '%40curiousbroadway%20via%20@ensemblrapp';
    }


    return (
        <div className="result-text">
            <span className="highlight">{this.props.name}</span> equals to: <div className="result-number">{this.props.number}</div> 
            Your name  <span className="highlight">is {this.state.prime}</span>a prime number!
            <div className="startOver">      
              <h6>
                <a className="curious-icon curious-icon-facebook" href={"javascript:fbShare('" + shareText + "')"} target="_blank"><span>Share!</span></a>
                <a className="curious-icon curious-icon-twitter" href={"javascript:tweet('" + tweetText + mentionHandle +"', 520, 350)"} target="_blank"><span>Tweet</span></a>
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
    return { open: false, stage: 0, isPrime: false, number: 0, name: '', errorMessage: '' };
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
      var resultNumber = this.calcNumber(name.split(' ').join(''));
      
      if (resultNumber > maxPrime)
      {
        this.setState({error: true, errorMessage: 'I only know every prime number up to 7,507...'});
      }
      else if (!validateEmail(email)){
        this.setState({error: true, errorMessage: 'That is not an email...'});  
      }
      else{
        this.setState({name: name});
        if (resultNumber != undefined && $.inArray(resultNumber, primeNumbers) > -1){
          this.setState({isPrime: true, number: resultNumber});
        }
        else{
          this.setState({isPrime: false, number: resultNumber});
        }

        this.subscribe({name: name, location:location, email: email, date: Date.now(), readable_date: new Date()});
        this.nextStage();
      }
    }
    else {
      this.setState({error: true, errorMessage: 'I do not talk to strangers'});
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
    // console.log(name);
    if (name.length > 0 ){
        var num = name.trim().toLowerCase().split('')
                    .map(function (char) {
                      // console.log(char + ":");
                      // console.log(char.charCodeAt(0) - 96);
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
                      text="Hello, my name is Christopher John Francis Boone. I know all the countries of the world and their capital cities and every prime number up to 7,507" /> 
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
                    <Error text={this.state.errorMessage} /> 
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
                                                 exampleText='detective@boone.com'/>
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

