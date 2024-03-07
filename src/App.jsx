import { useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import { CircleLoader } from "react-spinners";

function App() {
  const [query, setQuery] = useState("funny");
  const [data, error, loading] = useFetch(`/api/jokes/search?query=${query}`, query)

  console.log(error)
  const handleSearch = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setQuery(e.target.value)
  }

  return (
    <>
      <h1>Custom Hook : useFetch</h1>
      <input type="text" value={query} onChange={handleSearch} />
      <div className="jokes">
        {
          loading ? (
            <CircleLoader
              color="green"
              loading={loading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            error ? <h1>{error}</h1> : (
              data.result && data.result.map((joke) => {
                return (
                  <div className="joke" key={joke.id}>
                    <div>{joke.updated_at}</div>
                    <div>{joke.value}</div>
                  </div>
                )
              }
              )
            )
          )
        }

      </div>
    </>
  )
}

export default App
