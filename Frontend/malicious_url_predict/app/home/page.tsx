import React, { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";

const HomeComponent = () => {
  const [url, setUrl] = useState("");
  const [predictionResult, setPredictionResult] = useState(null);


useEffect(() => {
  if(url === ""){
    setPredictionResult(null);
  }
},[url])

  const data = [
    {
      label: "Benign",
      value:
        (predictionResult as any)?.random_forest?.probabilities?.benign ?? 0,
      color:
        (predictionResult as any)?.random_forest?.probabilities?.benign > 0
          ? "#22c55e"
          : "rgba(255, 255, 255,0)",
      defaultColor: "#22c55e",
      radius: 70,
    },
    {
      label: "Defacement",
      value:
        (predictionResult as any)?.random_forest?.probabilities?.defacement ??
        0,
      color:
        (predictionResult as any)?.random_forest?.probabilities?.defacement > 0
          ? "#fcfc03"
          : "rgba(255, 255, 255,0)",
      defaultColor: "#fcfc03",
      radius: 60,
    },
    {
      label: "Phishing",
      value:
        (predictionResult as any)?.random_forest?.probabilities?.phishing ?? 0,
      color:
        (predictionResult as any)?.random_forest?.probabilities?.phishing > 0
          ? "#fca103"
          : "rgba(255, 255, 255,0)",
      defaultColor: "#fca103",
      radius: 50,
    },
    {
      label: "Malicious",
      value:
        (predictionResult as any)?.random_forest?.probabilities?.malware ?? 0,
      color:
        (predictionResult as any)?.random_forest?.probabilities?.malware > 0
          ? "#fc0303"
          : "rgba(255, 255, 255,0)",
      defaultColor: "#fc0303",
      radius: 40,
    },
  ];

  const strokeWidth = 8;

  const handleSubmit = async () => {
    if (!url) {
      alert("Please enter a URL");
      return;
    }
   

    try {
      

      const response = await fetch("http://localhost:5555/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
      });

      if (response.ok) {
        const result = await response.json();
        setPredictionResult(result);
        console.log("Prediction result: ", result);
      } else {
        console.log("Error with the request:", response.status);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 mt-15">
      <div className="w-full md:w-[80vw] lg:w-[60vw] flex flex-col md:flex-row items-center justify-center gap-4 mt-10">
        <input
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="Enter URL"
          className="p-2 border border-white/60 w-full md:w-[60%] rounded-lg h-[6vh] text-white"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white w-full md:w-[30%] rounded-lg h-[6vh] cursor-pointer"
        >
          Submit
        </button>
      </div>
      {predictionResult && url ? (
        <div className="w-full min-h-[45vh] md:w-[70vw] flex flex-col lg:flex-row justify-center gap-5 mt-10">
          <div
            className={`w-full lg:w-[50%] p-5 bg-gray-800 text-white rounded-xl shadow-xl border-1 ${
              (predictionResult as any)?.random_forest?.predicted_class ===
              "benign"
                ? "border-[#22c55e]"
                : (predictionResult as any)?.random_forest?.predicted_class ===
                  "defacement"
                ? "border-[#fcfc03]"
                : (predictionResult as any)?.random_forest?.predicted_class ===
                  "phishing"
                ? "border-[#fca103]"
                : (predictionResult as any)?.random_forest?.predicted_class ===
                  "malware"
                ? "border-[#fc0303]"
                : "border-gray-500"
            }`}
          >
            <h1
              className={`text-lg font-bold mb-3 p-2 rounded-lg ${
                (predictionResult as any)?.random_forest?.predicted_class ===
                "benign"
                  ? "text-[#22c55e]"
                  : (predictionResult as any)?.random_forest
                      ?.predicted_class === "defacement"
                  ? "text-[#fcfc03]"
                  : (predictionResult as any)?.random_forest
                      ?.predicted_class === "phishing"
                  ? "text-[#fca103]"
                  : (predictionResult as any)?.random_forest
                      ?.predicted_class === "malware"
                  ? "text-[#fc0303]"
                  : "text-gray-300 "
              }`}
            >
              {(predictionResult as any)?.random_forest?.predicted_class ===
              "benign"
                ? "Safe"
                : (predictionResult as any)?.random_forest?.predicted_class ===
                  "defacement"
                ? "Warning"
                : (predictionResult as any)?.random_forest?.predicted_class ===
                  "phishing"
                ? "Danger"
                : (predictionResult as any)?.random_forest?.predicted_class ===
                  "malware"
                ? "Danger"
                : "Unknown type"}
            </h1>

            <p className="mt-5 ml-6 max-w-[30vw] overflow-hidden">
              URL: <span className="text-cyan-300">{url}</span>
            </p>
            <p className="mt-5 ml-6">
              Predicted to be a{" "}
              {(predictionResult as any)?.random_forest?.predicted_class} URL
            </p>
          </div>

          <div className="w-full lg:w-[40%] p-5 bg-gray-800 text-white rounded-xl shadow-2xl flex items-center">
            <svg width="200" height="200" viewBox="-20 0 170 130">
              {data.map((item, index) => {
                const circumference = 2 * Math.PI * item.radius;
                const segmentLength = (item.value / 100) * circumference;

                return (
                  <React.Fragment key={`circle-${index}`}>
                    <circle
                      cx="60"
                      cy="60"
                      r={item.radius}
                      fill="transparent"
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth={strokeWidth}
                      strokeOpacity="0.5"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r={item.radius}
                      fill="transparent"
                      stroke={item.color}
                      strokeWidth={strokeWidth}
                      strokeDasharray={`${segmentLength} ${circumference}`}
                      strokeDashoffset={0}
                      strokeLinecap="round"
                      transform="rotate(90 60 60)"
                    />
                  </React.Fragment>
                );
              })}
            </svg>

            <div className="mt-5 flex flex-col gap-2 text-center">
              {data.map((item) => (
                <div key={item.label} className="flex items-center gap-2 ">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.defaultColor }}
                  ></span>
                  <p className="text-lg font-semibold">
                    {item.label}: {item.value}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-[45vh] md:w-[70vw] flex flex-col md:flex-row justify-center mt-10 bg-gray-800 text-white rounded-xl shadow-2xl items-center p-5">
          <div className="text-left">
            <h1 className="mb-5 text-2xl">What is a malicious URL?</h1>
            <p className="mb-3">
              A <strong>malicious URL</strong> is a web address that leads to
              harmful websites designed to steal personal information, infect
              your device with malware, or perform other malicious activities.
              These URLs can appear legitimate but are crafted to deceive users.
            </p>
            <p className="mb-3">
              It’s crucial to protect yourself from malicious URLs to avoid:
            </p>
            <ul className="list-disc list-inside mb-3 ml-8">
              <li>
                Phishing attacks that steal sensitive data such as passwords and
                credit card information.
              </li>
              <li>
                Malware infections that can damage your device or steal personal
                information.
              </li>
              <li>
                Defacement of your website, which can harm your online
                reputation.
              </li>
            </ul>
            <p>
              Always be cautious when clicking on unfamiliar links. Use security
              tools to detect and block malicious websites, ensuring a safe
              browsing experience.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeComponent;
