var QuestionLabel = React.createClass({
  render: function() {
    return (
      	<label className="fs-field-label fs-anim-upper" htmlFor="q1">
        	What is your name?
    	</label>
    );
  }
});

var QuestionBox = React.createClass({
  render: function() {
    return (
      <input className="fs-anim-lower" id="q1" name="q1" type="text" placeholder="Christopher John Francis Boone" required />

    );
  }
});

var QuestionForm = React.createClass({
	componentDidMount: function() {
        var formWrap = document.getElementById( 'fs-form-wrap' );

        [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {  
          new SelectFx( el, {
            stickyPlaceholder: false,
            onChange: function(val){
              document.querySelector('span.cs-placeholder').style.backgroundColor = val;
            }
          });
        } );

        new FForm( formWrap, {
          onReview : function() {
            classie.add( document.body, 'overview' ); // for demo purposes only
          }
        } );
  	},

	render: function() {
		return (
		  <ol className="fs-fields">
		    <li>
		      <QuestionLabel />
		      <QuestionBox />
		    </li>
		  </ol>
		);
	}
});

ReactDOM.render(
  <QuestionForm />,
  document.getElementById('myform')
);