import React from 'react'

import AboutModal from '../modals/modal.about'
import RegisterModal from '../modals/modal.register'
import PostJobModal from '../modals/modal.postjob'

import Ajax from '../mixins/mixin.ajax'
import PropTypes from 'prop-types'
import Alert from '../alerts/alert.bottom.right'



export default React.createClass({
 mixins:[Ajax],
 getInitialState(){
  return {
    render:true
  }
},

propTypes:{

},

componentDidMount(){

},

onChange(){
  this.setState({render:true});
},

updateState:function(newState){
  this.setState({render:true});
},

render() {

  var childrenwithProps = React.Children.map(this.props.children, function (child){
   return React.cloneElement(child, {
    updateParentState: this.updateState
  })
 }.bind(this))

  return (
    <div>
 



<div className="">
    <div className="container shadow pt-3 bg-blue">
    <div className="row">

    

   
    {childrenwithProps}

   

    </div>
    </div>
 </div>


    <PostJobModal />
    <AboutModal />

    <RegisterModal />

    {/*<Alert /> */}

    </div>
    )
  }
})
