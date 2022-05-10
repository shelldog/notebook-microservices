import React, { useEffect, useState, useRef } from 'react'
import Header from './Header'
import Note from './Note'
import './app.css'
import axios from 'axios'

export default function App() {
  const [notes, setNotes] = useState([])

  const input = useRef(null)

  const onSubmit = async e => {
    e.preventDefault()

    const content = input.current.value

    if (content.length < 50) {
      const { data } = await axios.post(
        `http://${process.env.NOTE_SERVICE_ROUTE}:${process.env.NOTE_SERVICE_PORT}/api/note`,
        {
          content: input.current.value,
          status: 'pending',
        },
      )

      fetchNotes()
    }
  }

  const fetchNotes = async () => {
    const { data } = await axios.get(
      `http://${process.env.QUERY_SERVICE_ROUTE}:${process.env.QUERY_SERVICE_PORT}/api/queries`,
    )

    setNotes(data.data)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className="app">
      <Header>Notebook</Header>
      <div className="body">
        <div className="container flex ai-c jc-c">
          <div className="container-p-a content">
            <div className="form flex ai-c jc-c">
              <div className="flex sm-l jc-sb ai-c">
                <input
                  placeholder={"Just taking note, dude! We're all goldfish!"}
                  className="form-input"
                  ref={input}
                />
                <a className="form-button" onClick={onSubmit}>
                  submit
                </a>
              </div>
            </div>
            <div className="note">
              {notes.map(note => (
                <Note key={note._id} note={note} render={setNotes}>
                  {note.content}
                </Note>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
