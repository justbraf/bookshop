import { useState } from "react"
import "./AddBook.css"

const AddBook = () => {
  // const [msg, setMsg] = useState({})
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
  })

  const handleAddBook = (e) => {
    e.preventDefault()
    console.log("submit " + JSON.stringify(formData))

    const request = new Request("http://localhost:3000/admin/savebook", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData)
    })

    fetch(request)
      .then(response => response.json())
      .then(response => {
        console.warn(response)
      })
      .catch(err => console.error(err))
  }

  const handleChange = (e) => {
    if (e.target.id == "price") {
      if (isNaN(e.target.value)) {
        console.warn("Price not a number")
        e.target.className = "inputError"
        return
      }
      else
        e.target.className = ""
    }
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  return (
    <>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          id="title"
          placeholder="Book Title"
          onChange={handleChange}
        />
        <input
          type="text"
          id="author"
          placeholder="Book Author"
          onChange={handleChange}
        />
        <input
          type="text"
          id="price"
          placeholder="Book Price"
          onChange={handleChange}
        />
        <input type="submit" value="Add Book" />
      </form>
    </>
  )
}

export default AddBook
