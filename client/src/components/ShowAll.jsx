import { useEffect, useState } from "react"
import ShowBook from "./ShowBook"

const ShowAll = () => {
    const [allBooks, setAllBooks] = useState([])
    useEffect(() => {
        const req = new Request(
            'http://localhost:3000/shop', {
            headers: {
                "content-type": "application/json"
            }
        }
        )

        fetch(req)
            .then(res => res.json())
            .then(data => {
                // console.log(data.length)
                setAllBooks(data)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <>
            <p>Books found: {allBooks.length}</p>
            <div className="flex flex-row flex-wrap justify-around gap-y-8">
            {allBooks.map(book => {
                return (
                  <ShowBook key={book._id} book={book}/>
                )
            }
            )}
            </div>
        </>
    )
}

export default ShowAll