import React from 'react'
import Link from '../navs/nav.link'
import Ajax from '../mixins/mixin.ajax'
import AjaxMessagesModal from '../modals/modal.ajaxmessages'

export default React.createClass({
    mixins:[Ajax],


    render() {

     var jobs = this.props.Jobs;



     return (

        <div id="accordion_"  >

        {jobs.map(function(job,index){ 

            var headerCardColor = '';

            if (index % 2 == 0) headerCardColor = 'bg-yellow'; 

            return(

                <div className="card" key={index} style={{marginTop:'10px'}}>        
                <div className={"card-header "+headerCardColor} role="tab" id={"headingOne_"+index}  data-toggle="collapse_" data-parent="#accordion_" href={"#collapseOne_"+index} aria-expanded="true_" aria-controls={"collapseOne_"+index}>
                <div className="row">

                <div className="col-md-2 col-lg-2">
                <i className="fa fa-building-o fa-5x text-info" aria-hidden="true"></i>
                {/*<img style={{width:'100%'}} className="center-block img-fluid rounded-circle_" src={"//placehold.it/200/d6d6d6/000?text="+parseInt(index+1)} alt=""  />
               */}
                </div>

                <div className="col-md-10 col-lg-10">
                <h4><Link to={'/job/'+job._id} >{job.title}</Link>  </h4> {/*onClick={e => e.preventDefault()}*/}



                <p><small>
                <i className="fa fa-building-o text-success" aria-hidden="true"></i> {job.company?job.company.name:''}  
                |  <i className="fa fa-map-marker text-info" aria-hidden="true"></i> {job.city?job.city.name+', '+job.city.state.name+', '+job.city.country.name:''}
                |  <i className="fa fa-calendar text-warning" aria-hidden="true"></i> {job.CreatedAt}</small>
                </p>
                <p>{job.description.substring(0,100)}...  <Link className="pull-right" to={'/job/'+job._id} ><i className="fa fa-arrows-v" aria-hidden="true"></i> Leer más</Link></p>

                </div>

                </div>
                </div>

            {/*    <div id={"collapseOne"+index} className={"bg-faded card-block collapse in "+headerCardColor} role="tabpanel" aria-labelledby={"headingOne"+index}>


                <div className="pull-right">

                <button type="button" className="btn btn-labeled btn-success">
                <span className="btn-label"><i className="fa fa-heart-o "></i></span>Agregar a mis favoritos</button>
                
                <button type="button" className="btn btn-labeled btn-danger" onClick={this.sendResume.bind(this,job)}>
                <span className="btn-label"><i className="fa fa-paper-plane" aria-hidden="true"></i></span>Enviar mi CV</button>

                </div>

                <p className="card-text"><b>Salario:</b><br/><span className="pull-right_"><i className="fa fa-usd text-success" aria-hidden="true"></i>{job.float_salary}</span>
                </p>     
                <p className="card-text"><b>Habilidades:</b><br/>
                {job.skills.map(function(skill,index){
                    var badgeColor = 'badge-warning';

                    if (index % 2 == 0) badgeColor = 'badge-info' 
                    return(
                        <span key={index} className={"badge "+badgeColor}>{skill.name} </span>
                        )
                    })}</p>

                    <p className="card-text"><b>Tipo:</b><br/>{job.timetype?job.timetype.name:''}</p>
                    <p style={{whiteSpace: 'pre-line'}}><b>Descripciòn:</b><br/>{job.description}</p>


                    </div> */} 
                    </div>
                    )

                }.bind(this))}

                <AjaxMessagesModal />

                </div>
                );
                }
            });
