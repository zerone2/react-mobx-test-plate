import React from 'react'
import { create } from 'mobx-persist'
import { Provider, observer, useLocalStore } from 'mobx-react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { stores } from 'stores'

import HomePage from './pages/HomePage'
import TestPage from './pages/TestPage'
import LoginPage from './pages/LoginPage'

const browserHistory = createBrowserHistory()
const hydrate = create()

const App = observer(() => {
  const store = useLocalStore(() => ({
    storeLoaded: true,
    setStoreLoaded: (load) => (store.storeLoaded = load),
  }))

  // React.useEffect(() => {
  //   const load = async () => {
  //     await hydrate('appStore', stores.appStore).then(() => {
  //       store.setStoreLoaded(true)
  //     })
  //   }
  //   load()
  // }, [])

  return (
    <Provider {...stores}>
      <Router history={browserHistory}>
        {store.storeLoaded ? (
          <Switch>
            <Route exact path={'/'} component={HomePage} />
            <Route path={'/test'} component={TestPage} />
            <Route path={'/login'} component={LoginPage} />
          </Switch>
        ) : null}
      </Router>
    </Provider>
  )
})

export default App
