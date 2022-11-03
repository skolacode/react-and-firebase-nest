/**
 * What to do:
 * ===
 * 1. Install the google login using 3rd party library or react most famous library
 * 2. Configure google login
 * 3. and try google login works or not
 * 
 */

import React from 'react'

export const Login = () => {

  return (
    <div>
      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  )
}