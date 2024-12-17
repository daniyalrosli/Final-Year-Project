// pages/patients.js
'use client';

const PatientsPage = () => {
  // Placeholder data for multiple patients
  const patients = [
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      bmi: 27.5,
      smoker: 'No',
      region: 'Northwest',
      healthMetrics: {
        cholesterol: '200 mg/dL',
        bloodPressure: '120/80 mmHg',
        heartRate: '72 bpm',
        glucoseLevel: '90 mg/dL',
      },
      prediction: {
        riskLevel: 'Moderate',
        predictionDate: 'Nov 15, 2024',
      },
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 37,
      gender: 'Female',
      bmi: 22.8,
      smoker: 'Yes',
      region: 'Southeast',
      healthMetrics: {
        cholesterol: '180 mg/dL',
        bloodPressure: '110/70 mmHg',
        heartRate: '80 bpm',
        glucoseLevel: '95 mg/dL',
      },
      prediction: {
        riskLevel: 'Low',
        predictionDate: 'Nov 16, 2024',
      },
    },
    // Add more patients as needed
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center">Patient List</h1>
        
        {patients.map((patient) => (
          <div key={patient.id} className="bg-white shadow-lg rounded-lg p-6">
            {/* Patient Information */}
            <section className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{patient.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
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
            <section className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Health Metrics</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(patient.healthMetrics).map(([key, value]) => (
                  <div key={key} className="p-4 bg-gray-50 rounded shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700">{key}</h3>
                    <p className="text-gray-600">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Prediction Results */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Prediction Results</h2>
              <div className="p-4 bg-blue-50 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-blue-700">
                  Risk Level: {patient.prediction.riskLevel}
                </h3>
                <p className="text-lg text-gray-700 mt-2">
                  Prediction Date: {patient.prediction.predictionDate}
                </p>
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsPage;