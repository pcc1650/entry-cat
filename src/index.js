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

const middleware = [ thunk, createLogger() ]

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)


render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={App} />
                <Route path='login' component={Login} />
                <Route path='index' component={Index} />
            </Route>
        </Router>
    </Provider>
  ),document.getElementById('root')
)
