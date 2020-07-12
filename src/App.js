import React, {useEffect, useState} from 'react';
import {apiKey} from './config'
import api from './utils/api.js'
import Gallery from './components/Gallery'

function App() {
  const [token, setToken] = useState(null)

  function getToken() {
    api.post('auth', {apiKey}).then(res => setToken(res?.data?.token))
  }

  useEffect(() => {
    getToken()
  }, [])

  return (
    <Gallery token={token} getToken={getToken}/>
  );
}

export default App;
