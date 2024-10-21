import React, { useState } from "react";
import "./App.css";

function App() {
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbolsSet1, setIncludeSymbolsSet1] = useState(true);  // !"#$%&'()*+,-./
  const [includeSymbolsSet2, setIncludeSymbolsSet2] = useState(true);  // []^_`
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);

  // convert ASCII to characters
  const generateCharactersFromAsciiRange = (start, end) => {
    let chars = "";
    for (let i = start; i <= end; i++) {
      chars += String.fromCharCode(i);
    }
    return chars;
  };

  const generatePassword = () => {
    let characterPool = "";

    if (includeUppercase) characterPool += generateCharactersFromAsciiRange(65, 90);  // A-Z
    if (includeLowercase) characterPool += generateCharactersFromAsciiRange(97, 122); // a-z
    if (includeNumbers) characterPool += generateCharactersFromAsciiRange(48, 57);   // 0-9
    if (includeSymbolsSet1) characterPool += generateCharactersFromAsciiRange(33, 47);   // !"#$%&'()*+,-./
    if (includeSymbolsSet2) characterPool += generateCharactersFromAsciiRange(91, 96);   // []^_`

    if (characterPool === "") {
      setPassword("Please select at least one option.");
      return;
    }

    let generatedPassword = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        alert("Password copied to clipboard!");
      }).catch(err => {
        console.error("Could not copy password: ", err);
      });
    }
  };

  return (
    <div className="App">
      <div className="app-group">
        <h1>Password Generator</h1>
        
        <div className="checkbox-group">
          <input 
            type="checkbox" 
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          <label>Include Uppercase Letters</label>
        </div>

        <div className="checkbox-group">
          <input 
            type="checkbox" 
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          <label>Include Lowercase Letters</label>
        </div>

        <div className="checkbox-group">
          <input 
            type="checkbox" 
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          <label>Include Numbers</label>
        </div>

        <div className="checkbox-group">
          <input 
            type="checkbox" 
            checked={includeSymbolsSet1}
            onChange={() => setIncludeSymbolsSet1(!includeSymbolsSet1)}
          />
          <label>Include Special Characters (!"#$%&'()*+,-./)</label>
        </div>

        <div className="checkbox-group">
          <input 
            type="checkbox" 
            checked={includeSymbolsSet2}
            onChange={() => setIncludeSymbolsSet2(!includeSymbolsSet2)}
          />
          <label>Include Special Characters ([]^_`)</label>
        </div>

        <div className="number">
          <label>Password Length:</label>
          <input 
            type="number" 
            value={passwordLength} 
            onChange={(e) => setPasswordLength(e.target.value)} 
            min="10" 
            max="25"
          />
        </div>

        <button onClick={generatePassword}>Generate Password</button>
        <p>{password}</p>
        <div className="copy-button">
          {(
            <button onClick={copyToClipboard}>Copy</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
