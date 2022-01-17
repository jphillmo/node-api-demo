// Got this code from this video: https://www.youtube.com/watch?v=iRPGE_AfGTQ
import React, { useState } from 'react'

const VisibilityToggler = (component, visibility) => {
  
  const [visible, setVisibility] = useState(() => visibility)

  return [
    visible ? component : null, () => setVisibility( v => !v )
  ]
}

export default VisibilityToggler
