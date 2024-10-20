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

st.write("Here is the explanation of the statistics:")
data = {
    "Feature": [
        "Age", "Sex", "Chest Pain Type (cp)", "Resting Blood Pressure (trestbps)",
        "Cholesterol (chol)", "Fasting Blood Sugar (fbs)", "Resting ECG Results (restecg)",
        "Maximum Heart Rate (thalach)", "Exercise-Induced Angina (exang)", "Oldpeak (ST depression)",
        "Slope (ST segment)", "Number of Major Vessels Colored by Fluoroscopy (ca)", "Thalassemia (thal)", "Target"
    ],
    "Description": [
        "The patients range from 35 to 71 years old, with an average age of 54.35 years.",
        "68.3% of the dataset consists of male patients, highlighting that a majority are male.",
        "Varies from 0 to 3, where higher values represent more severe chest pain. The mean value of 0.97 shows that most patients experience some form of chest pain.",
        "The average resting blood pressure is 131.56 mm Hg, with a range between 100 and 180 mm Hg.",
        "The cholesterol levels range from 149 to 406.74 mg/dL, with an average of 245.86 mg/dL.",
        "Around 15% of the patients have elevated fasting blood sugar, indicating potential risks related to diabetes.",
        "Resting ECG results indicate that most patients (53%) have normal heart activity.",
        "The maximum heart rate achieved by patients ranges from 95.02 to 191.96 bpm, with an average of 149.72 bpm.",
        "Around one-third of the patients experience angina induced by exercise, a significant indicator of heart issues.",
        "Reflects heart response to stress during exercise, with values ranging from 0 to 4.2.",
        "Represents different heart health outcomes during exercise. The mean value of 1.40 provides an indicator of the slope's role in heart disease.",
        "The number of major vessels colored ranges from 0 to 4, indicating the severity of coronary artery disease.",
        "Thalassemia levels vary between 0 and 3, indicating different types of blood disorders.",
        "54.5% of the patients have heart disease, as represented by the target variable, with 1 indicating heart disease and 0 indicating no heart disease."
    ]
}

# Create a DataFrame
df_features = pd.DataFrame(data)

# Display the table in Streamlit
st.title("Heart Disease Data Feature Descriptions")
st.table(df_features)

numerical_features = ['age', 'chol', 'trestbps', 'thalach', 'oldpeak']


st.title("Numerical Features Histograms")

st.subheader("Distribution of Key Numerical Features")

# Create the histograms and display them in Streamlit
fig, ax = plt.subplots(3, 2, figsize=(15, 10))  # 3 rows, 2 columns to accommodate 5 plots
ax = ax.flatten()  # Flatten the axes array for easy indexing

# Plot each feature's histogram
for i, feature in enumerate(numerical_features):
    df[feature].hist(bins=15, edgecolor='black', ax=ax[i])
    ax[i].set_title(f'{feature} distribution')

# Remove the empty subplot (the 6th one)
fig.delaxes(ax[-1])

plt.tight_layout()

# Display the plot in Streamlit
st.pyplot(fig)

data = {
    "Feature": ["Age", "Cholesterol (Chol)", "Resting Blood Pressure (Trestbps)", 
                "Maximum Heart Rate (Thalach)", "Oldpeak (ST Depression)"],
    "Description": [
        "Most individuals are between 50 and 60 years old. Heart disease risk is closely related to age.",
        "Cholesterol levels mostly range between 200–300 mg/dL, with a peak around 250. Higher values indicate greater risk.",
        "Resting blood pressure is clustered around 120–140 mmHg, with the most frequent value being 130. High BP correlates with increased heart disease risk.",
        "Most individuals achieve a max heart rate of 140–170 bpm, with a peak around 160 bpm. Lower values can suggest cardiovascular issues.",
        "Oldpeak values mostly cluster near 0, indicating low ST depression during exercise. Higher values may indicate underlying ischemia."
    ]
}

# Convert the data into a DataFrame
df_explanation = pd.DataFrame(data)

# Display the table in Streamlit
st.title("Feature Descriptions of HeartCare Dataset")
st.table(df_explanation)


# Categorical features to plot
categorical_features = ['sex', 'cp', 'thal']

# Create subplots for categorical features
st.title("Bar Plots of Categorical Features")

fig, axes = plt.subplots(1, 3, figsize=(18, 5))

for i, feature in enumerate(categorical_features):
    df[feature].value_counts().plot(kind='bar', ax=axes[i], edgecolor='black')
    axes[i].set_title(f'Distribution of {feature}')
    axes[i].set_xlabel(feature)
    axes[i].set_ylabel('Count')

plt.tight_layout()
st.pyplot(fig)

# Explanation table for categorical features
data_categorical = {
    "Feature": ["Sex", "Chest Pain Type (cp)", "Thalassemia (thal)"],
    "Description": [
        "Sex (1 = male, 0 = female). More males in the dataset, indicating heart disease prevalence may be higher in males.",
        "Chest pain type (0 to 3, where 0 is typical angina and 3 is asymptomatic). This indicates varying severity of chest pain.",
        "Thalassemia categories (3 = normal, 6 = fixed defect, 7 = reversible defect). Affects oxygen levels and heart disease risk."
    ]
}

df_categorical_explanation = pd.DataFrame(data_categorical)

# Display the table in Streamlit
st.title("Explanation of Categorical Features")
st.table(df_categorical_explanation)


st.title('Correlation Matrix Heatmap')

# Calculate the correlation matrix
correlation_matrix = df.corr()

# Set up the matplotlib figure
plt.figure(figsize=(12, 8))

# Draw the heatmap
sns.heatmap(correlation_matrix, annot=True, fmt=".2f", cmap='coolwarm', linewidths=0.5)

# Set the title
plt.title('Correlation Matrix Heatmap')

# Show the plot in Streamlit
st.pyplot(plt)
