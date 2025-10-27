# app_streamlit/Home.py
import streamlit as st

st.set_page_config(page_title="AudioPlayground", layout="wide")
st.title("🎧 AudioPlayground")
st.caption("A journey into the world of sound")

# Background style
st.markdown("""
<style>
body {
  background: radial-gradient(circle at top, #1a0033, #000);
  color: #eee;
}
</style>
""", unsafe_allow_html=True)
