'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

// Navbar component for navigation
const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-serif text-gray-800">HeartCare</h1>
        <div className="flex items-center space-x-8">
          <a href="/" className="text-gray-700 hover:text-red-500">Home</a>
          <a href="/patient" className="text-gray-700 hover:text-red-500">Patient</a>
          <a href="/predict" className="text-gray-700 hover:text-red-500">Predict</a>
          <a href="/reports" className="text-gray-700 hover:text-red-500">Reports</a>
          <a href="/analytics" className="text-gray-700 hover:text-red-500">Analytics</a>
        </div>
      </div>
    </nav>
  );
};

// Define the structure for form data
interface FormData {
  age: number | '';
  gender: string;
  chestPain: string;
  restingBP: number | '';
  serumCholesterol: number | '';
  fastingBloodSugar: number | '';
  restingECG: string;
  maxHeartRate: number | '';
  exerciseAngina: string;
  oldpeak: number | '';
  slope: string;
  ca: number | '';
  thal: string;
}

// PredictForm component
const PredictForm = () => {
  const router = useRouter(); // Initialize the useRouter hook
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: '',
    chestPain: '',
    restingBP: '',
    serumCholesterol: '',
    fastingBloodSugar: '',
    restingECG: '',
    maxHeartRate: '',
    exerciseAngina: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validation logic
  const validate = () => {
    const newErrors: Record<string, string> = {};
    for (const [key, value] of Object.entries(formData)) {
      if (typeof value === 'string' && !value) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      } else if (typeof value === 'number' && isNaN(value)) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} must be a number.`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    // Prepare the user data for the prediction API
    const userData = {
      age: formData.age,
      gender: formData.gender,
      chestPain: formData.chestPain,
      restingBP: formData.restingBP,
      serumCholesterol: formData.serumCholesterol,
      fastingBloodSugar: formData.fastingBloodSugar,
      restingECG: formData.restingECG,
      maxHeartRate: formData.maxHeartRate,
      exerciseAngina: formData.exerciseAngina,
      oldpeak: formData.oldpeak,
      slope: formData.slope,
      ca: formData.ca,
      thal: formData.thal,
    };

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: userData }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction data');
      }

      const result = await response.json();
      router.push(`/results?risk=${result.risk}`); // Redirect to results page with risk as a query parameter
    } catch (error) {
      console.error('Error during prediction:', error);
      alert('An error occurred while making the prediction. Please try again.');
    }
  };

  const formFields = [
    { id: 'age', label: 'Age', type: 'number', placeholder: 'Enter your age' },
    { id: 'gender', label: 'Gender', type: 'text', placeholder: 'Enter your gender' },
    { id: 'chestPain', label: 'Chest Pain', type: 'text', placeholder: 'Describe chest pain' },
    { id: 'restingBP', label: 'Resting BP', type: 'number', placeholder: 'Enter resting BP' },
    { id: 'serumCholesterol', label: 'Serum Cholesterol', type: 'number', placeholder: 'Enter serum cholesterol level' },
    { id: 'fastingBloodSugar', label: 'Fasting Blood Sugar', type: 'number', placeholder: 'Enter fasting blood sugar level' },
    { id: 'restingECG', label: 'Resting ECG', type: 'text', placeholder: 'Describe resting ECG results' },
    { id: 'maxHeartRate', label: 'Max Heart Rate', type: 'number', placeholder: 'Enter max heart rate' },
    { id: 'exerciseAngina', label: 'Exercise Induced Angina', type: 'text', placeholder: 'Any exercise-induced angina?' },
    { id: 'oldpeak', label: 'Oldpeak', type: 'number', placeholder: 'Enter oldpeak value' },
    { id: 'slope', label: 'Slope', type: 'text', placeholder: 'Enter slope of ST segment' },
    { id: 'ca', label: 'Ca (Major Vessel)', type: 'number', placeholder: 'Number of major vessels' },
    { id: 'thal', label: 'Thal (Thalassemia)', type: 'text', placeholder: 'Enter Thalassemia type' },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Heart Disease Prediction</h1>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow-lg rounded-lg border border-gray-200">
            {formFields.map(field => (
              <div key={field.id} className="flex flex-col space-y-1">
                <Input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  label={field.label}
                  value={formData[field.id as keyof FormData] || ''}
                  onChange={handleInputChange}
                />
                {errors[field.id] && <span className="text-red-500 text-sm">{errors[field.id]}</span>}
              </div>
            ))}
            <Button
              type="submit"
              className="w-full"
            >
              Predict
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PredictForm;