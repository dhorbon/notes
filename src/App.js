import { useEffect, useState } from "react"
import "./styles.css"

export default function App() {
  const [input, setInput] = useState("")
  const [notes, setNotes] = useState(() => {
    const local = localStorage.getItem("ITEMS")
    if(local == null) return []
    return JSON.parse(local)
  })
  const [id, setId] = useState(0);

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(notes))
  }, [notes])

  function handleSubmit(e) {
    e.preventDefault()

    setNotes(howDoesThisWork => {
      return [...howDoesThisWork, {id: id, note: input, checked: false}]
    })
    setId(id+1)

    setInput("")
  }

  function clickCheck(id, checked){
    setNotes(whyDoesThisWork => {
      return whyDoesThisWork.map(note => {
        if(note.id === id){
          return {...note, checked} 
        }

        return note
      })
    })
  }

  function deleteNote(id) {
    setNotes(iDontWantToDoItLikeThat => {
      return iDontWantToDoItLikeThat.filter(note => note.id !== id)
    })
  } 

  return <>
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input value={input} onChange={e => setInput(e.target.value)} type="text" id="item" />
      </div>
      <button className="btn">Add a note</button>
    </form>
    <h1 className="header">Todo List</h1>
    <ul className="list">
      {notes.map(note =>{
        return(
          <li key={note.id}>
            <label>
              <input type="checkbox" checked={note.checked} onChange={e=>clickCheck(note.id, e.target.checked)} />
              {note.note}
            </label>
            <button onClick={() => deleteNote(note.id)} className="btn btn-danger">Delete</button>
          </li>
        )
      })}
    </ul>
  </>
};