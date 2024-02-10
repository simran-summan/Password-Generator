/* eslint-disable no-unused-vars */
import { useRef, useCallback, useEffect, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllo, setNumberAllo] = useState(false);
  const [characterAllo, setCharacterAllo] = useState(false);
  const [password, setPassword] = useState("");

// useRef hook
const passwordRef = useRef(null)

const copyPasswordToClip = useCallback(()=> {
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,30)
  window.navigator.clipboard.writeText(password)
}, [password])

  const passwordGenerate = useCallback(() => {
    let str = "abcdefghijklmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";

    if (numberAllo) {
      str += "1234567890";
    }
    if (characterAllo) {
      str += "!@#$%^&*?~-_";
    }

    for (let i = 0; i < length; i++) {
      let randomChar = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomChar);
    }
    setPassword(pass);
  }, [length, numberAllo, characterAllo, setPassword]);

  useEffect(()=>{
    passwordGenerate()
  },[length, numberAllo , characterAllo , passwordGenerate])

  return (
    <>
     <div className="w-full h-screen font-sans text-orange-500">
      <div className="w-1/2 mx-auto my-10 bg-gray-700 rounded-lg py-8 text-center px-8">
        <h1 className=" text-4xl mb-2 text-white">Password Generator</h1>
        <input 
        className="outline-none w-[80%] rounded-l-md my-2 px-2 h-8"
        type="text"
        value={password}
        placeholder="Password"
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToClip}
        className="outline-none bg-blue-600 hover:bg-blue-700 duration-150 text-white shrink-0 py-0.5 px-2 rounded-r-md h-8"
        >copy</button>
        
        <div className="flex text-lg gap-x-4 justify-center my-3">
          <div className="flex item-center gap-x-1">
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e)=> {setLength(e.target.value)}}
            />
            <label >Length: {length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input 
            type="checkbox" 
            defaultChecked={numberAllo}
            id="numberInput"
            className="cursor-pointer"
            onChange={()=>{
              setNumberAllo((prev)=> !prev);
            }}
            />
          <label >Numbers</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input 
            type="checkbox" 
            defaultChecked={characterAllo}
            id="characterInput"
            className="cursor-pointer"
            onChange={()=>{
              setCharacterAllo((prev)=> !prev);
            }}
            />
          <label >Charater</label>
          </div>

          </div>
      </div>
</div>
    </>
  );
}

export default App;
