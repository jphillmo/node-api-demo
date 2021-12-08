import React, { useState } from 'react'

const HideComponent = (component, visibility) => {
  
  const [visible, setVisibility] = useState(() => visibility)

  return [
    visible ? component : null, () => setVisibility( v => v )
  ]
}

export default HideComponent