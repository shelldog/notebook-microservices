import React, { useEffect, useState, useRef } from 'react'
import Header from './Header';
import Body from './Body';
import Item from './Item';
import Button from './Button';
import axios from 'axios';

export default function App() {
  const [notes, setNotes] = useState([]);

  const input = useRef(null);

  const onSubmit = async () => {
    const res = await axios.post(process.env.NOTE_SERVICE_ENTRY_POINT, {
      content: input.current.value,
      status: 'pending'
    });

    if (!res) {
      return;
    }

    const { data } = await axios.get(process.env.QUERY_SERVICE_ENTRY_POINT);

    setNotes(data['data']);
  }

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await axios.get(process.env.QUERY_SERVICE_ENTRY_POINT);

      setNotes(res['data']['data'])
    }

    fetchNotes() 
  }, []);


  return (
    <div className='app'>
      <Header>Notebook</Header>
      <Body>
        <div className='flex jc-c ai-c'>
          <div className='form'>
            <div className='form-i flex jc-sb ai-c'>
              <input className='form-input' ref={input} placeholder={"We're all a goldfish, just taking note!"}/>
              <a className='form-a' onClick={onSubmit}>Submit</a>
            </div>
          </div>
        </div>
        <div className='content flex ai-c jc-c'>
          <div>
            {notes.map((note) => (
              <Item key={note._id}>
                <div className='item-w'>
                  <div className='flex jc-sb'>
                    <p className='item-t'>{note.noteid}</p> 
                    <p className='item-t'>Created at: {note.createdAt}</p>
                  </div>
                  <div className='item-c flex jc-sb ai-c'>
                      <p className='item-p'>
                        {note.content}
                      </p>
                      <Button behave={note.behave} noteid={note.noteid} />
                  </div>
                </div>
              </Item>
            ))}
          </div>
        </div>
      </Body>
    </div>
  )
}
