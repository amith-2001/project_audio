# # app_streamlit/Home.py
import streamlit as st
from streamlit_lottie import st_lottie
import json
# Load the Lottie animation


with open("assets/wave.json", "r") as f:
    wave_anim = json.load(f)


# --- Session Setup ---
if "page" not in st.session_state:
    st.session_state.page = "home"

# --- Function to switch page ---
def go_to(page_name):
    st.session_state.page = page_name

st.set_page_config(page_title="AudioPlayground", layout="wide")
st.title("🎧 AudioPlayground")
st.caption("A journey into the world of sound")
#

# use in case you want to narate something
# st.markdown("""
# > “You wake up in a world made of waves.
# > Your mission: learn to hear like a machine.”
# >
# > Each chamber you enter reveals a new layer of how sound is understood —
# > by physics, by math, and by AI.”
# """)


# Background style
st.markdown("""
<style>
.track-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  flex-wrap: wrap;
}
.node {
  background: radial-gradient(circle, #7b2ff7 0%, #1a0033 70%);
  border: 2px solid #f107a3;
  color: white;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  box-shadow: 0 0 20px #f107a3;
  transition: all 0.3s ease;
}
.node:hover {
  transform: scale(1.1);
  box-shadow: 0 0 30px #f107a3;
  cursor: pointer;
}
.line {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #f107a3, #7b2ff7);
  margin: 0 10px;
}
.label {
  color: #fff;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
""", unsafe_allow_html=True)




st_lottie(wave_anim, speed=1, height=250, key="wave")



# Display it


st.markdown("""
<div class="track-container">
  <div class="section">
    <div class="node">🌊</div>
    <div class="label">Wave Room</div>
  </div>
  <div class="line"></div>
  <div class="section">
    <div class="node">🌀</div>
    <div class="label">Frequency Cave</div>
  </div>
  <div class="line"></div>
  <div class="section">
    <div class="node">🕰️</div>
    <div class="label">Time Chamber</div>
  </div>
  <div class="line"></div>
  <div class="section">
    <div class="node">🎨</div>
    <div class="label">Feature Forge</div>
  </div>
  <div class="line"></div>
  <div class="section">
    <div class="node">🌈</div>
    <div class="label">Noise Forest</div>
  </div>
</div>
""", unsafe_allow_html=True)


# --- Page Navigation ---
if st.session_state.page == "home":
    st.markdown('<div class="track-container">', unsafe_allow_html=True)
    cols = st.columns(5)

    with cols[0]:
        if st.button("🌊", key="wave_room"):
            go_to("wave")
        st.markdown('<div class="label">Wave Room</div>', unsafe_allow_html=True)

    with cols[1]:
        if st.button("🌀", key="freq_cave"):
            go_to("frequency")
        st.markdown('<div class="label">Frequency Cave</div>', unsafe_allow_html=True)

    with cols[2]:
        if st.button("🕰️", key="time_chamber"):
            go_to("time")
        st.markdown('<div class="label">Time Chamber</div>', unsafe_allow_html=True)

    with cols[3]:
        if st.button("🎨", key="feature_forge"):
            go_to("feature")
        st.markdown('<div class="label">Feature Forge</div>', unsafe_allow_html=True)

    with cols[4]:
        if st.button("🌈", key="noise_forest"):
            go_to("noise")
        st.markdown('<div class="label">Noise Forest</div>', unsafe_allow_html=True)

    st.markdown("</div>", unsafe_allow_html=True)


# --- Target Pages ---
else:
    st.write(f"### 👋 Hello from the **{st.session_state.page.capitalize()} Page**!")
    if st.button("⬅️ Back"):
        go_to("home")