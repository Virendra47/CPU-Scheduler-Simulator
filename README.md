# 🖥️ CPU Scheduler Simulator

A full-stack web application for visualizing and comparing CPU scheduling algorithms.
<img width="1736" height="852" alt="image" src="https://github.com/user-attachments/assets/b6870282-6734-4d37-bc71-a770f27b33d0" />
<img width="1635" height="842" alt="image" src="https://github.com/user-attachments/assets/12278873-6433-4360-9229-743b6fbd6f2f" />

## ✨ Features

- **7 Scheduling Algorithms**: FCFS, SJF, SRTF, Round Robin, Priority, Multilevel Queue, MLFQ
- **Interactive UI**: Beautiful dark/light mode with animations
- **Algorithm Comparison**: Compare all algorithms side-by-side
- **Gantt Chart Visualization**: Color-coded with hover details
- **Process Management**: Add, delete, random generate processes
- **History**: Save and view past simulations
- **Export Reports**: Download simulation results
- **Step Mode**: Step through execution logs

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons
- React Hot Toast

### Backend
- Node.js
- Express
- MongoDB (optional)
- CORS

## 📁 Project Structure
CPU Scheduler Simulator/
├── cpu-simulator/ # Frontend
│ ├── src/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── services/
│ └── package.json
├── cpu-simulator-backend/ # Backend
│ ├── server.js
│ └── package.json
└── README.md
## 🚀 Local Setup

### Prerequisites
- Node.js (v16+)
- npm (v8+)

### Backend Setup
```bash
cd cpu-simulator-backend
npm install
npm run dev

Frontend Setup
cd cpu-simulator
npm install
npm run dev
Access the App
Frontend: http://localhost:5173

Backend: http://localhost:5000

🌐 Deployment
Frontend (Vercel)
bash
cd cpu-simulator
vercel --prod
Backend (Render)
Push to GitHub and deploy via Render dashboard

📊 Algorithms
Algorithm	
FCFS	Non-preemptive✅
SJF	Non-preemptive	✅
SRTF	Preemptive	✅
Round Robin	Preemptive	✅
Priority	Non-preemptive	
Priority (Preemptive)	Preemptive	✅
Multilevel Queue	Non-preemptive✅
MLFQ	Preemptive	✅
👨‍💻 Author
Virendra

GitHub:virendra47

Made with ❤️ Virendra Pandule

📄 License
MIT License

🙏 Acknowledgments
Lucide Icons for beautiful icons
Framer Motion for animations
Tailwind CSS for styling
