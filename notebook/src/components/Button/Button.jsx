import React, { useState } from 'react';
import axios from 'axios';
import './button.css';

export default function Button({ behave, noteid }) {
  const [status, setStatus] = useState(behave);

  const statusStyle=`${status === 'off' ? 'status-off' : status === 'on' ? 'status-on' : 'status-closed'}`;

  const onClick = async () => {
    const { data } = await axios.post(`${process.env.BEHAVE_SERVICE_ENTRY_POINT}/${noteid}/update`, {
      behave: status === 'off' ? 'on' : status === 'on' && 'finished'
    }) 

    setStatus(data['data']['behave']);
  }
 
  return (
    <button onClick={onClick} className={`button ${statusStyle}`} disabled={behave === 'finished' && true}>
      {status} 
    </button>
  );
}
