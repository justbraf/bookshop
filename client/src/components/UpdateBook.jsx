import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const UpdateBook = () => {
    const { id } = useParams()
    const [msg, setMsg] = useState(null)
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        price: ""
    })

    useEffect(() => {
        const req = new Request(
            'http://localhost:3000/shop/' + id, {
            headers: {
                "content-type": "application/json"
            }
        }
        )

        fetch(req)
            .then(res => res.json())
            .then(data => {
                // console.log(data.length)
                setFormData(data)
            })
            .catch(err => console.error(err))
    }, [])

    const handleUpdateBook = (e) => {
        e.preventDefault()

        // console.debug(formData)
        const req = new Request(
            'http://localhost:3000/admin/update/' + id, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        )

        fetch(req)
            .then(res => res.json())
            .then(data => {
                // console.warn(data)
                setMsg(data)
            })
            .catch(err => console.error(err))
    }

    const handleChange = (e) => {
        // console.warn(e.target.id, e.target.value)
        if (e.target.id == "price")
            if (isNaN(e.target.value)) {
                alert("Please enter a number")
                return
            }
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    return (
        <>
            {!msg ? (
                <div className="flex justify-center m-2">
                    <div className="bg-violet-50 lg:basis-1/2 sm:p-6 lg:p-2">
                        <p className="text-xl text-center mb-3">Update a book</p>
                        <form method="POST" className="max-w-md mx-auto">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    required
                                    onChange={handleChange}
                                    value={formData.title}
                                />
                                <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="author" id="author" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={formData.author} />
                                <label htmlFor="author" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Author</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="price" id="price" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={formData.price} />
                                <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleUpdateBook}
                            >
                                Update</button>
                        </form>

                    </div>
                </div>
            ) : (
                <>
                    <p className="m-5 text-center text-blue-600 text-4xl">{msg.message}</p>
                    <p className='text-center text-xl '>
                        <Link
                            to="/"
                            replace
                            className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                        >Ok</Link>
                    </p>
                </>
            )}
        </>
    )
}

export default UpdateBook