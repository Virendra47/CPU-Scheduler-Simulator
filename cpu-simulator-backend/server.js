import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (temporary)
let simulations = [];
let idCounter = 1;

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'CPU Simulator API is running 🚀',
    timestamp: new Date().toISOString()
  });
});

// Get all simulations
app.get('/api/simulations', (req, res) => {
  res.json({ 
    success: true, 
    count: simulations.length,
    data: simulations 
  });
});

// Get single simulation
app.get('/api/simulations/:id', (req, res) => {
  const sim = simulations.find(s => s.id === parseInt(req.params.id));
  if (!sim) {
    return res.status(404).json({ 
      success: false, 
      message: 'Simulation not found' 
    });
  }
  res.json({ success: true, data: sim });
});

// Save simulation
app.post('/api/simulations', (req, res) => {
  const { algorithm, processes, results } = req.body;
  
  const simulation = {
    id: idCounter++,
    algorithm,
    processes: results.processes,
    gantt: results.gantt,
    metrics: results.metrics,
    totalTime: results.totalTime,
    createdAt: new Date().toISOString()
  };
  
  simulations.push(simulation);
  res.status(201).json({ 
    success: true, 
    data: simulation,
    message: 'Simulation saved successfully!' 
  });
});

// Delete simulation
app.delete('/api/simulations/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = simulations.findIndex(s => s.id === id);
  
  if (index === -1) {
    return res.status(404).json({ 
      success: false, 
      message: 'Simulation not found' 
    });
  }
  
  simulations.splice(index, 1);
  res.json({ 
    success: true, 
    message: 'Simulation deleted successfully' 
  });
});

// Delete all simulations
app.delete('/api/simulations', (req, res) => {
  simulations = [];
  res.json({ 
    success: true, 
    message: 'All simulations cleared' 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 ${simulations.length} simulations in memory`);
});