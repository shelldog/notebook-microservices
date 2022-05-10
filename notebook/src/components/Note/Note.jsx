import React, { useState } from 'react'
import axios from 'axios'
import './note.css'

const behaveState = behave => {
  if (behave === 'off')
    return { content: 'planned', style: 'status-off', next: 'on' }
  if (behave === 'on')
    return { content: 'progress', style: 'status-on', next: 'finished' }
  if (behave === 'finished')
    return { content: 'finished', style: 'status-finished' }
}

export default function Note({ children, note, render }) {
  const [status, setStatus] = useState(behaveState(note.behave))

  const onSubmit = async e => {
    e.preventDefault()

    if (status.content !== 'finished') {
      const { data } = await axios.post(
        `http://${process.env.BEHAVE_SERVICE_ROUTE}:${process.env.BEHAVE_SERVICE_PORT}/api/behave/${note.noteid}/update`,
        {
          behave: status.next,
        },
      )

      setStatus(behaveState(data.data['behave']))
    }

    return
  }

  const onDelete = async e => {
    e.preventDefault()

    await axios.delete(
      `http://${process.env.NOTE_SERVICE_ROUTE}:${process.env.NOTE_SERVICE_PORT}/api/note/${note.noteid}`,
    )

    const { data } = await axios
      .get(
        `http://${process.env.QUERY_SERVICE_ROUTE}:${process.env.QUERY_SERVICE_PORT}/api/queries`,
      )
      .catch(() => {
        return {}
      })

    render(data?.data || [])
  }

  return (
    <div className="m-t">
      <div className="note-wrap flex">
        <div className="note-c m-l">
          <div className="note-h flex jc-sb">
            <p className="note-p">{note.noteid}</p>
            <p className="note-p">{note.createdAt}</p>
          </div>
          <div className="note-b flex jc-sb">
            {children}
            <button
              className={`note-button ${status.style}`}
              onClick={onSubmit}
            >
              {status.content}
            </button>
          </div>
        </div>
        <a onClick={onDelete} className="note-del"></a>
      </div>
    </div>
  )
}
