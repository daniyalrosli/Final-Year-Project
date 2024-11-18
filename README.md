CDCS259 FINAL YEAR PROJECT (60% completed)

HeartCare: Predictive Analytics for Early Detection and Prevention

Heart disease is a leading cause of mortality worldwide, and early detection and effective management are critical for improving patient outcomes. This project focuses on developing a machine learning-based prediction model to assist healthcare professionals in identifying and managing heart disease risk in patients.

Project Overview

Despite advancements in medical technology, there remains a need for tools that offer continuous monitoring and early risk detection of heart disease. HeartCare aims to fill this gap by leveraging machine learning models to analyze patient data, including demographic information, medical history, lifestyle factors, and clinical measurements.

The goal is to provide doctors with a tool that predicts heart disease risk early, allowing for timely interventions and improved patient care.

Machine Learning Algorithms

Three machine learning algorithms will be trained, tested, and compared to determine the best model for heart disease prediction:
	- Decision Tree = 0.75
	- Random Forest = 0.84
	- Logistic Regression = 0.87

Model Comparison

Each algorithm’s performance will be evaluated based on key metrics such as accuracy, precision, recall, and F1-score. The model with the best performance will be selected and deployed for real-time predictive analysis.

System Integration

The best-performing model will be integrated into an interactive dashboard designed for healthcare professionals. The dashboard will provide:
	- Visualization of predictive results and patient health metrics.
	- Real-time monitoring of patient data and heart disease risk.
	- Actionable insights for doctors to make data-driven decisions.

This tool will help doctors identify high-risk patients early on and adjust treatment plans proactively to improve heart disease management.

Tech Stack

The following technologies are used to build HeartCare:
	- Frontend: Next.js for the doctor-facing dashboard interface.
	- Backend: Django and Flask will handle data processing, API integration, and model deployment.
	- Model Development: Jupyter Notebook for developing and testing machine learning models.
	- Database: MySQL is used to store patient information and predict results.

Model Performance

The model performance will be assessed based on the following metrics:
	- Accuracy: The overall correctness of predictions.
	- Precision: The ability of the model to identify true positive heart disease cases.
	- Recall: The sensitivity of the model in detecting patients at risk.
	- F1-score: The balance between precision and recall, providing a comprehensive performance measure.



Usage

   1. Doctors access the dashboard to view predictive results and patient data.
   2.	The predictive model analyzes patient data and flags high-risk individuals.
   3.	Doctors can interact with data visualizations and get actionable insights to adjust treatments.
