import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, useRouterHistory } from 'react-router'
import main from './pages/page.main'


import files from './pages/page.files'
import users from './pages/page.users'
import userfiles from './pages/page.userfiles'
import businesstypes from './pages/page.businesstypes'
import admins from './pages/page.admins'
import documentstypes from './pages/page.documentstypes'
import buyerusers from './pages/page.buyerusers'
import buyers from './pages/page.buyers'
import conflictform from './pages/page.conflictform'
import userspayments from './pages/page.userspayments'
import buyerspayments from './pages/page.buyerspayments'
import supermarkets from './pages/page.supermarkets'
import buyersgroups from './pages/page.buyersgroups'

import supermarketusers from './pages/page.supermarketusers'

import vendorapplication from './pages/page.documentvendorapplication'

_GlobalData.apiURL = location.origin+'/smithconnenandgarcia/api/';

import { createHistory } from 'history'

const history = useRouterHistory(createHistory)({
  basename: '/smithconnenandgarcia'
})

render((
  <Router history={history}>
  <Route path="/" component={main}>
  <IndexRoute component={files}/>

  </Route>

  <Route path="/admin/admins" component={admins} />
  <Route path="/admin" component={users} />
  <Route path="/files" component={files} />
  <Route path="/admin/users" component={users} />
  <Route path="/admin/users/payments" component={userspayments} />
  <Route path="/admin/buyers/payments" component={buyerspayments} />
  <Route path="/admin/buyers" component={buyers} />
  <Route path="/admin/userfiles/:id" component={userfiles} /> 
  <Route path="/admin/businesstypes" component={businesstypes} /> 
  <Route path="/admin/documentstypes" component={documentstypes} />
  <Route path="/admin/reports/:reporttype" component={users} />
  
  <Route path="/buyers/supliers" component={buyerusers} />
  <Route path="/buyers" component={buyerusers} />
  <Route path="/buyers/userfiles/:id" component={userfiles} /> 
  <Route path="/buyers/conflictform" component={conflictform} /> 

  <Route path="/admin/supermarkets" component={supermarkets} />
  <Route path="/admin/supermarkets/:workers" component={supermarkets} />
   <Route path="/supermarkets" component={users} />
  <Route path="/supermarkets/supliers" component={users} />
  <Route path="/admin/buyersgroups" component={buyersgroups} />
  
  <Route path="/supermarkets/userfiles/:id" component={userfiles} />
  <Route path="/supermarkets/reports/:reporttype" component={users} />
  
   <Route path="/free/fillonline/:documenttype" component={userfiles} />

  </Router>
  ), document.getElementById('app'))
