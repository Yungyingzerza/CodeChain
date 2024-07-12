import { useState, useRef } from "react";

function App() {
  const inputRef = useRef();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const handleSearch = () => {
    const studentID = inputRef.current.value;
    setLoading(true);
    fetch(`https://script.google.com/macros/s/AKfycbyYsQdagBqFXxw3hAC25jdlLz9SgzCUQ1v7BkDda8J9QBl7xjvkC3ulR0iY-bodtU7iSA/exec?action=getUserById&StudentID=${studentID}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-[100svh] relative gap-32">
        <div className="join">
        <label className="input input-bordered flex items-center gap-2">
          <input ref={inputRef} type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
        </label>
        <button onClick={()=>handleSearch()} className="btn btn-primary">Search</button>
        </div>

        {
        loading && 
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
          Loading
        </div>
        }

        {
        data &&
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-lg">Student ID: {data.StudentID}</span>
            <span className="text-lg">Name - Surname: {data.FullName}</span>
            <span className="text-lg">Hint1: {data.Hint1}</span>
            <span className="text-lg">Hint2: {data.Hint2}</span>
            <span className="text-lg">Hint3: {data.Hint3}</span>
            <span className="text-lg">Hint3: {data.Hint4}</span>
          </div>
        </div>
        }
        
      </div>
    </>
  );
}

export default App;
