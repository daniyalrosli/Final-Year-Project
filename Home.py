import streamlit as st

# Set up the page configuration
st.set_page_config(page_title="HeartCare", layout="wide")

# Title of the app
st.title("HeartCare: Heart Disease Prediction System Using Machine Learning Algorithms")

# Simple explanation
st.write("""
Welcome to HeartCare, a platform dedicated to providing insights into heart disease risk factors through advanced machine learning algorithms. Our mission is to empower individuals with the knowledge they need to understand their heart health risks, take preventive actions, and make informed decisions to maintain a healthy heart. By analyzing key health indicators, HeartCare aims to support early detection and promote proactive care for better heart health outcomes.
""")

st.image("/Users/daniyalrosli/fyp/img/hd.jpeg", caption="Heart Health Awareness", use_column_width=True)


# Key Risk Factors Section
st.subheader("Key Risk Factors for Heart Disease")

st.write("""
- **High Blood Pressure**: Can damage arteries and increase the risk of heart disease.
- **High Cholesterol**: Contributes to plaque buildup in arteries, restricting blood flow.
- **Smoking**: Damages blood vessels, increasing the risk of cardiovascular diseases.
- **Diabetes**: High blood sugar can harm blood vessels, making heart disease more likely.
- **Obesity**: Extra body weight raises the risk due to higher blood pressure and cholesterol.
""")

# Health Recommendations Section
st.subheader("Health Recommendations")

st.write("""
To lower your heart disease risk:
- **Eat a balanced diet**: Include more fruits, vegetables, and whole grains.
- **Exercise regularly**: Aim for at least 30 minutes of physical activity most days.
- **Quit smoking**: Smoking significantly raises heart disease risk.
- **Monitor your blood pressure**: Keep it in check with regular check-ups.
- **Stay informed**: Know your family history and get regular health screenings.
""")