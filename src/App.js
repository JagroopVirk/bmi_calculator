import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [bmi, setBmi] = useState("");
  const [bmiText, setBmiText] = useState("");
  const [height, setHeight] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [system, setSystem] = useState("imperial");
  const [borderClass, setBorderClass] = useState("border-outer bg-orange-600");

  useEffect(() => {
    let BMI =
      system === "imperial"
        ? (703 * weight) / (height * 12 + heightIn * 1) ** 2
        : weight / (height / 100) ** 2;
    const updateValues = () => {
      setBmi(BMI.toFixed(2));
      if (BMI < 18.5) {
        setBorderClass("border-outer bg-blue-600");
        setBmiText(<span className="text-blue-600">Underweight</span>);
      } else if (BMI >= 18.5 && BMI <= 24.9) {
        setBorderClass("border-outer bg-green-600");
        setBmiText(<span className="text-green-600">Normal Weight</span>);
      } else if (BMI >= 25 && BMI <= 29.9) {
        setBorderClass("border-outer bg-yellow-600");
        setBmiText(<span className="text-yellow-600">Overweight</span>);
      } else if (BMI >= 31) {
        setBorderClass("border-outer bg-red-600");
        setBmiText(<span className="text-red-600">Obese</span>);
      }
    };
    BMI > 0 && updateValues();
  }, [height, heightIn, weight, system]);

  const resetFields = () => {
    setBmi("");
    setBmiText("");
    setHeight("");
    setHeightIn("");
    setWeight("");
    setBorderClass("border-outer bg-orange-600");
  };

  return (
    <div className="App min-h-screen bg-black flex justify-center items-center">
      <section className={borderClass}>
        <h6 className="m-1 text-xl">BODY MASS INDEX CALCULATOR</h6>
        <div className="bg-custom-gray flex-1 rounded">
          <div className="mt-2">
            <h2>
              Body Mass Index (BMI) = <span>{bmi}</span>
            </h2>
            {bmiText}
          </div>
          <div className="px-8 text-right mt-8">
            <div className="input-cards border-none">
              <h4>Unit</h4>
              <select
                className="input-fields rounded max-w-max justify-self-center"
                name="unit"
                id="unit"
                value={system}
                onChange={(e) => setSystem(e.target.value)}
              >
                <option value="imperial">Imperial</option>
                <option value="metric">Metric</option>
              </select>
            </div>
            <div className="input-cards">
              <h4>Height({system === "imperial" ? "ft" : "cm"})</h4>
              <input
                className="input-fields"
                type="number"
                min="0"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            {system === "imperial" && (
              <div className="input-cards">
                <h4>Inch</h4>
                <input
                  className="input-fields"
                  type="number"
                  min="0"
                  max="12"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                />
              </div>
            )}
            <div className="input-cards">
              <h4>Weight({system === "imperial" ? "lb" : "kg"})</h4>
              <input
                className="input-fields"
                type="number"
                min="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>
          <button
            className="bg-light-blue-700 px-8 py-1 mb-4 rounded"
            onClick={resetFields}
          >
            RESET
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
