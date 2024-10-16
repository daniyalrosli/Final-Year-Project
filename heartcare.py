import streamlit as st

# Set the title of the web app
st.title("Heart Care Web App")

# Add a header
st.header("Welcome to the Heart Care Web App")

# Add some text
st.write("This is a simple web application to monitor and care for your heart health.")

# Add an input field for user to enter their name
name = st.text_input("Enter your name:")

# Add a slider for user to input their age
age = st.slider("Select your age:", 0, 100, 25)

# Add a button
if st.button("Submit"):
    st.write(f"Hello {name}, you are {age} years old.")

# Add a sidebar
st.sidebar.title("Heart Care Sidebar")
st.sidebar.write("This is the sidebar content.")

# Add a selectbox in the sidebar
option = st.sidebar.selectbox("Select an option:", ["Option 1", "Option 2", "Option 3"])

# Display the selected option
st.sidebar.write(f"You selected: {option}")