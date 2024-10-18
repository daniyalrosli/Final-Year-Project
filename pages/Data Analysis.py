import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns


# Set up the page configuration
st.set_page_config(page_title="HeartCare - Data Analysis", layout="wide")

# Title of the Data Analysis page
st.title("Data Analysis: Insights into Heart Disease Risk Factors")

# Description of the Data Analysis page
st.write("""
On the **Data Analysis** page of **HeartCare**, we delve into the critical factors contributing to heart disease by leveraging data-driven insights. 
Through comprehensive analysis of health-related datasets, we aim to uncover patterns and correlations that inform users about the prevalence of heart disease across different demographics.
""")

st.subheader("Our Analysis Includes:")
st.markdown("""
- **Exploratory Data Analysis (EDA)**: Visualizing and summarizing key data attributes to understand trends and distributions related to heart disease risk factors.
- **Risk Factor Assessment**: Evaluating the impact of various health indicators, such as blood pressure, cholesterol levels, BMI, and lifestyle choices, on heart disease likelihood.
- **Comparative Analysis**: Examining differences in heart disease prevalence among various age groups, genders, and ethnic backgrounds to highlight vulnerable populations.
- **Predictive Modeling**: Utilizing machine learning techniques to develop models that predict heart disease risk based on user input and historical data, providing personalized health insights.
""")

# Conclusion statement
st.write("""
By providing these analytical insights, **HeartCare** aims to empower users to take charge of their heart health and make informed lifestyle choices for better health outcomes.
""")


st.subheader("Exploratory Data Analysis (EDA)")

st.write("The HeartCare dataset is a comprehensive collection of health-related data specifically designed to facilitate the prediction and analysis of heart disease risk factors. This dataset includes a variety of key health indicators and demographic information that are critical for understanding the factors contributing to heart disease.")

st.write("Lets take a look at the dataset")

# Brief description of the dataset
st.write("""
### Dataset Description:
This dataset includes several medical attributes for patients, which are used to predict whether or not a patient has heart disease. Below is a brief description of the columns:

1. **age**: Age of the patient.
2. **sex**: Gender of the patient (1 = male, 0 = female).
3. **cp (chest pain type)**: Type of chest pain experienced (values range from 0 to 3).
4. **trestbps**: Resting blood pressure (in mm Hg).
5. **chol**: Serum cholesterol in mg/dl.
6. **fbs**: Fasting blood sugar > 120 mg/dl (1 = true; 0 = false).
7. **restecg**: Resting electrocardiographic results (values 0, 1, 2).
8. **thalach**: Maximum heart rate achieved.
9. **exang**: Exercise-induced angina (1 = yes; 0 = no).
10. **oldpeak**: ST depression induced by exercise relative to rest.
11. **slope**: The slope of the peak exercise ST segment.
12. **ca**: Number of major vessels (0-3) colored by fluoroscopy.
13. **thal**: Thalassemia (a blood disorder) (1 = normal; 2 = fixed defect; 3 = reversible defect).
14. **target**: The target variable indicating the presence of heart disease (1 = disease; 0 = no disease).
""")

df = pd.read_csv("/Users/daniyalrosli/fyp/cleaned_heart_disease_data.csv")
st.write(df.sample(50))

st.write("### Basic Statistics:")
st.write("""
Below are some basic statistics for the dataset, including measures like mean, standard deviation, minimum, and maximum values for numerical columns.
""")

# Generate statistics
statistics = df.describe()

# Display the statistics in the app
st.write(statistics)
