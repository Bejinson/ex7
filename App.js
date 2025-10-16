import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [existingEMI, setExistingEMI] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const handleCheckEligibility = () => {
    if (!name || !age || !salary || !existingEMI || !loanAmount) {
      setMessage("⚠️ Please fill all fields!");
      setResult("invalid");
      return;
    }

    const ageNum = parseInt(age);
    const salaryNum = parseFloat(salary);
    const existingNum = parseFloat(existingEMI);
    const loanNum = parseFloat(loanAmount);

    if (isNaN(ageNum) || isNaN(salaryNum) || isNaN(existingNum) || isNaN(loanNum)) {
      setMessage("⚠️ Enter valid numeric values!");
      setResult("invalid");
      return;
    }

    const proposedEMI = loanNum * 0.1;
    const DTI = ((existingNum + proposedEMI) / salaryNum) * 100;

    if (ageNum < 21 || ageNum > 60) {
      setMessage("❌ Age should be between 21 and 60.");
      setResult("notEligible");
      return;
    }

    if (DTI > 60) {
      setMessage(`❌ High Debt-to-Income Ratio (${DTI.toFixed(2)}%). Must be ≤ 60%.`);
      setResult("notEligible");
      return;
    }

    if (loanNum > 10 * salaryNum) {
      setMessage("❌ Requested loan exceeds 10× Monthly Salary.");
      setResult("notEligible");
      return;
    }

    setMessage("✅ Congratulations! You are eligible for the loan.");
    setResult("eligible");
  };

  return (
    <div className="container mt-5 p-4 border rounded-4 shadow">
      <h2 className="text-center mb-4">🏦 Loan Eligibility Checker</h2>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="text" className="form-control" value={name}
          onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Age</label>
        <input type="number" className="form-control" value={age}
          onChange={(e) => setAge(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Monthly Salary (₹)</label>
        <input type="number" className="form-control" value={salary}
          onChange={(e) => setSalary(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Existing EMI / Debts (₹)</label>
        <input type="number" className="form-control" value={existingEMI}
          onChange={(e) => setExistingEMI(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Loan Amount Requested (₹)</label>
        <input type="number" className="form-control" value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)} />
      </div>

      <button className="btn btn-primary w-100" onClick={handleCheckEligibility}>
        Check Loan Eligibility
      </button>

      {result && (
        <div className="mt-4 text-center">
          {result === "eligible" && <p className="text-success fw-bold">{message}</p>}
          {result === "notEligible" && <p className="text-danger fw-bold">{message}</p>}
          {result === "invalid" && <p className="text-warning fw-bold">{message}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
