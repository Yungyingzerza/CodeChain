import { useState, useRef } from "react";

function App() {
  const inputRef = useRef();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const handleSearch = () => {
    const studentID = inputRef.current.value;
    setData(null);
    setLoading(true);
    fetch(`https://script.google.com/macros/s/AKfycbyYsQdagBqFXxw3hAC25jdlLz9SgzCUQ1v7BkDda8J9QBl7xjvkC3ulR0iY-bodtU7iSA/exec?action=getUserById&StudentID=${studentID}`)
      .then(response => response.json())
      .then(data => {
        if(data){
          setData(data);
          setLoading(false);
        }else{
          document.getElementById('my_modal_1').showModal()
          setLoading(false);
        }
        
      });
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-[100svh] relative gap-16 p-5">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold sm:text-3xl">Enter your Student ID to see hints</span>
          <div className="flex flex-col gap-2">
            <input type="number" placeholder="Enter your Student ID" ref={inputRef} className="textarea textarea-xs sm:textarea-md  textarea-bordered" >
            </input>
            <button onClick={()=>handleSearch()} className="btn btn-primary">Search</button>
          </div>
        </div>
        {
        loading && 
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 justify-center items-center flex flex-row gap-2">
            <span className="loading loading-infinity loading-lg bg-gradient-to-r from-blue-300 to-blue-900"></span>
          </div>
          <div className="flex flex-col p-2">
            <div className="flex flex-col gap-4 w-full">
              <span className="skeleton h-7 w-40 sm:w-96"></span>
              <span className="skeleton h-7 w-32 sm:w-80"></span>
              <span className="skeleton h-7 w-24 sm:w-64"></span>
              <span className="skeleton h-7 w-24 sm:w-64"></span>
              <span className="skeleton h-7 w-24 sm:w-64"></span>
              <span className="skeleton h-7 w-24 sm:w-64"></span>
            </div>
        </div>
        </>
        
        
        }

        {
        data &&
        <div className="flex flex-col p-5">
          <div className="flex flex-col gap-4 w-full">
            <span className="sm:text-xl ">Student ID: {data.StudentID}</span>
            <span className="sm:text-xl ">Name - Surname: {data.FullName}</span>
            <span className="sm:text-xl break-all text-primary">Hint1: {data.Hint1}</span>
            <span className="sm:text-xl break-all text-secondary">Hint2: {data.Hint2}</span>
            <span className="sm:text-xl break-all text-warning">Hint3: {data.Hint3}</span>
            <span className="sm:text-xl break-all text-success">Hint4: {data.Hint4}</span>
          </div>
        </div>
        }

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Something went wrong!</h3>
            <p className="py-4">Please check your Student ID</p>
            <p className="py-3">Student ID: <span className="text-lg font-bold text-error break-all">{inputRef.current?.value ? inputRef.current.value : ""}</span></p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        
      </div>
    </>
  );
}

export default App;
