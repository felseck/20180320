import React from 'react'

export default React.createClass({
  render() {
  
    return(
    
<div className="modal fade" id={this.props.id} tabIndex={this.props.tabIndex} role="dialog"> 
    <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
               <h4 className="modal-title" id="myModalLabel">{this.props.title}</h4> 
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                </button>
            </div>
            <div className="modal-body">
                {this.props.children}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary-outline" data-dismiss="modal">OK</button>
            </div>
        </div>
    </div>
</div>

);
  }
})
