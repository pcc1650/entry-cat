import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import App from './containers/App'
import Login from './components/Login'
import Index from './components/Index'
import EventPage from './components/EventPage'
import Profile from './components/profile'

// const middleware = [ thunk, createLogger() ]
const middleware = [ thunk ]

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)


render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Index} />
                <Route path='login' component={Login} />
                <Route path='event/:id' component={EventPage} />
                <Route path='profile' component={Profile} />
            </Route>
        </Router>
    </Provider>
  ),document.getElementById('root')
)
