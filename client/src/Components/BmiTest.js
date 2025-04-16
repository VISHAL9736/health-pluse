import React, { useState } from "react";
import "../Styles/BmiTest.css";

function BmiTest() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100; // Convert height to meters
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2); // BMI Formula
      setBmi(bmiValue);
      setMessage(getBmiMessage(bmiValue)); // Display message based on BMI
    }
  };

  const getBmiMessage = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 24.9) return "Normal weight";
    if (bmi >= 25 && bmi < 29.9) return "Overweight";
    return "Obese";
  };

  return (
    <div className="body-outer" style={styles.container}>
      <div className="bmi-container" style={styles.formContainer}>
        <div className="tabs">
          <button className="tab" style={styles.tab}>BMI Test</button>
        </div>
        
        <div className="bmi-form">
          <div className="input-group">
            <label style={styles.label}>Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="2"
              max="120"
              style={styles.input}
              placeholder="Enter your age"
            />
            <span style={styles.ageRange}>ages: 2 - 120</span>
          </div>

          {/* Gender Selection */}
          <div className="gender-group">
            <label className={`gender-option ${gender === "male" ? "selected" : ""}`} style={styles.genderLabel}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
                style={styles.radioInput}
              />
              Male
            </label>
            <label className={`gender-option ${gender === "female" ? "selected" : ""}`} style={styles.genderLabel}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
                style={styles.radioInput}
              />
              Female
            </label>
          </div>
          
          <div className="input-group">
            <label style={styles.label}>Height</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="cm"
              style={styles.input}
            />
            <span style={styles.unit}>cm</span>
          </div>
          
          <div className="input-group">
            <label style={styles.label}>Weight</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="kg"
              style={styles.input}
            />
            <span style={styles.unit}>kg</span>
          </div>
          
          <div className="buttons">
            <button style={styles.calculateButton} onClick={calculateBMI}>
              Calculate <span className="play-icon">▶</span>
            </button>
            <button
              className="clear-btn"
              onClick={() => {
                setAge("");
                setGender("male");
                setHeight("");
                setWeight("");
                setBmi(null);
                setMessage("");
              }}
              style={styles.clearButton}
            >
              Clear
            </button>
          </div>
          
          {bmi && (
            <div className="bmi-result" style={styles.bmiResult}>
              <p style={styles.bmiResultText}>Your BMI: <strong>{bmi}</strong></p>
              <p className={`bmi-message ${message.toLowerCase().replace(" ", "-")}`} style={styles.bmiMessage}>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   marginTop:'50px',
    padding: '0 16px',
  },
  formContainer: {
    backgroundColor: '#1e1e1e', // Even darker form background
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '500px',
    maxHeight: "none"
  },
  tab: {
    fontSize: '1.7rem',
    fontWeight: '900',
    color: '#fff',
    backgroundColor: '#444',
    padding: '12px 25px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  label: {
    fontSize: '22px',
    color: '#fff',
    fontWeight: '500',
    marginBottom: '10px',
    gap:"17px"
  },
  input: {
    width: '100%',
    padding: '16px 20px',
    marginBottom: '15px',
    borderRadius: '15px',
    border: '1px solid #444',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '1.1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  ageRange: {
    fontSize: '12px',
    color: '#888',
  },
  genderLabel: {
    display: 'inline-block',
    marginRight: '15px',
    fontSize: '16px',
    color: '#fff',
  },
  radioInput: {
    marginRight: '5px',
  },
  unit: {
    fontSize: '14px',
    color: '#888',
  },
  calculateButton: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(90deg, #FF4E50 0%, #F9D423 100%)', // Gradient for the button
    color: 'white',
    fontWeight: '600',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
  },
  clearButton: {
    width: '100%',
    padding: '14px',
    background: '#444',
    color: 'white',
    fontWeight: '600',
    borderRadius: '20px',
    border: 'none',
    marginTop: '15px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
  },
  bmiResult: {
    marginTop: '20px',
  },
  bmiResultText: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#fff',
  },
  bmiMessage: {
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#fff',
  },
};

export default BmiTest;
