import { useState } from "react"


const AddBook = () => {
    const [formData, setFormData] = useState({
        "title": "",
        "author": "",
        "price": ""
    })
    const handleAddBook = (e) => {
        e.preventDefault()
        console.log("submit " + JSON.stringify(formData))
    }

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.id]: e.target.value 
        })
    }

    return (
        <>
            <form onSubmit={handleAddBook}>
                <input type="text" id="title" placeholder="Book Title" onChange={handleChange} />
                <input type="text" id="author" placeholder="Book Author" onChange={handleChange} />
                <input type="text" ud="price" placeholder="Book Price" onChange={handleChange} />
                <input type="submit" value="Add Book" />
            </form>
        </>
    )
}

export default AddBook