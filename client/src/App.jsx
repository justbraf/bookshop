import { useEffect, useState } from "react";

const PATH = "http://localhost:3000"
const OPTIONS = {
      headers: {
        "Accept": "application/json"
      }
}

function App() {
  const [data, setData] = useState()

  useEffect(() => {
    fetch(PATH + "/", OPTIONS)
      .then(response =>response.json())
      .then(response => {
        console.log(response)
        setData(response.response)
      })
    // Correct! Runs once after render with empty array
  }, []);

  return (
    <div>
      <h1>
      {data}
      </h1>
    </div>
  )
}

export default App
