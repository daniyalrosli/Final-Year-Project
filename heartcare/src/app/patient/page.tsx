// pages/patient.js
'use client';





const PatientSection = () => {
  // Placeholder patient data (this could come from a database or API)
  const patient = {
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    bmi: 27.5,
    smoker: 'No',
    region: 'Northwest',
  };

  const healthMetrics = {
    cholesterol: '200 mg/dL',
    bloodPressure: '120/80 mmHg',
    heartRate: '72 bpm',
    glucoseLevel: '90 mg/dL',
  };

  const prediction = {
    riskLevel: 'Moderate',
    predictionDate: 'Nov 15, 2024',
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Patient Information */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Patient Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-lg"><strong>Name:</strong> {patient.name}</p>
              <p className="text-lg"><strong>Age:</strong> {patient.age}</p>
              <p className="text-lg"><strong>Gender:</strong> {patient.gender}</p>
            </div>
            <div>
              <p className="text-lg"><strong>BMI:</strong> {patient.bmi}</p>
              <p className="text-lg"><strong>Smoker:</strong> {patient.smoker}</p>
              <p className="text-lg"><strong>Region:</strong> {patient.region}</p>
            </div>
          </div>
        </section>

        {/* Health Metrics */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Health Metrics</h2>
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(healthMetrics).map(([key, value]) => (
              <div key={key} className="p-4 bg-gray-50 rounded shadow-md">
                <h3 className="text-xl font-semibold text-gray-700">{key}</h3>
                <p className="text-lg text-gray-600">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prediction Results */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Prediction Results</h2>
          <div className="p-4 bg-blue-50 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-700">Risk Level: {prediction.riskLevel}</h3>
            <p className="text-lg text-gray-700 mt-2">
              Prediction Date: {prediction.predictionDate}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PatientSection;