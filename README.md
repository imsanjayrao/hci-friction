# 🧠 Introducing Friction into Social Media Interfaces  
### A Human-Computer Interaction (HCI) Approach towards Fighting Short-Form Content Addiction


## 📄 Overview

This project investigates how **user interface (UI) friction**—deliberate disruptions in scrolling behavior and content flow—can **reduce addictive patterns** in short-form video platforms such as TikTok, Instagram Reels, and YouTube Shorts. By incorporating intentional interruptions like randomized scroll directions and introspective loading screens, our platform seeks to foster **mindful digital consumption**.

---

## ✨ Key Contributions

- 📱 **React-based prototype** simulating short-form video apps
- 🔀 **Scroll Direction Randomization** to disrupt habitual vertical swiping
- 💬 **Quote + Fake Loading Screen** to prompt introspection
- ⏱️ **Stopwatch & Timely Break Reminders** to improve time awareness
- 📊 **20-participant user study** evaluating behavioral responses

---

## 🧪 Methodology

- **Participants:** 20 university students (ages 19–23) active on short-form content platforms
- **Interaction Logging:** Videos watched, scroll behavior, friction response, time spent
- **Post-Test Survey:** Measured emotional reaction, disruption perception, and content consumption change

### Friction Elements
- **🔄 Random Scroll Direction** (vertical to horizontal, with hints after failed attempts)
- **💡 Introspective Quotes + Placebo Loading Screen**
- **🕐 Persistent Stopwatch + Pop-up Break Suggestions**

---

## 📈 Results Snapshot

- **Scroll randomization** created measurable friction, increasing active cognitive load.
- **Quote screens** effectively disrupted binge behavior in 3+ exposures.
- **Break reminders** were initially effective but showed diminishing returns.
- **Frustration levels** correlated with social media usage habits.
- **Perceived usefulness** of friction predicted reduction in content consumption.

> _“Right now, someone is getting better at a skill you’ve always wanted to learn. Tap if you’re okay missing out on that opportunity.”_

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Hosting:** Remote web deployment (mobile-first design)
- **Content:** JSON-indexed short-form video library
- **Analytics:** Custom interaction logger + user feedback forms

---

## 🔧 Instructions to Run

1. Add video files to: `public/videos` (create the folder if it doesn't exist)
2. After modifying videos, run:
   ```bash
   npm run generateVideos.js
   ```
3. To start the app:
   ```bash
   npm start
   ```

---



---

## 🔮 Future Directions

- 🎯 **Personalized Friction** using user behavior modeling
- 🤖 **ML-based timing optimization** for friction triggers
- 🌐 **Expansion to other addictive digital mediums** (e.g., news feeds, infinite scroll)


---

