import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Play, 
  Plus, 
  Trash2, 
  Sparkles, 
  Clock, 
  BarChart3,
  ListChecks,
  GanttChartSquare,
  History,
  Download,
  Sun,
  Moon,
  Repeat,
  GitBranch,
  Code,
  Zap,
  Layers,
  RefreshCw,
  HelpCircle,
  Hash,
  Briefcase,
  Timer,
  Trophy,
  Award,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { saveSimulation, getSimulations } from './services/api';

// ============= LOADING SCREEN =============
const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing CPU...');
  const [phase, setPhase] = useState(0);

  const loadingPhases = [
    { text: 'Initializing CPU...', icon: '⚡' },
    { text: 'Loading Memory Modules...', icon: '🧠' },
    { text: 'Starting Scheduler...', icon: '📋' },
    { text: 'Preparing Algorithms...', icon: '🔬' },
    { text: 'Booting System...', icon: '🚀' },
    { text: 'Almost Ready...', icon: '✨' },
    { text: 'Welcome to CPU Simulator!', icon: '🎉' },
  ];

  useEffect(() => {
    let phaseIndex = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1.2;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        const phaseStep = 100 / (loadingPhases.length - 1);
        const newPhase = Math.floor(newProgress / phaseStep);
        if (newPhase !== phaseIndex && newPhase < loadingPhases.length) {
          phaseIndex = newPhase;
          setLoadingText(loadingPhases[phaseIndex].text);
          setPhase(phaseIndex);
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center overflow-hidden relative">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}

      <div className="text-center relative z-10">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="mx-auto mb-8 relative"
        >
          <div className="absolute inset-0 blur-3xl bg-blue-500/30 rounded-full animate-pulse"></div>
          <Cpu className="w-28 h-28 text-blue-400 relative" />
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.8, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full"
            animate={{ scale: [1, 1.8, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-1/2 -right-4 w-3 h-3 bg-red-400 rounded-full"
            animate={{ scale: [1, 2, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
          />
          <motion.div
            className="absolute top-1/2 -left-4 w-3 h-3 bg-purple-400 rounded-full"
            animate={{ scale: [1, 2, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: 0.7 }}
          />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-bold text-white mb-2"
        >
          CPU Simulator
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-blue-300 mb-8 text-lg"
        >
          Visualizing Scheduling Algorithms
        </motion.p>

        <div className="w-80 mx-auto mb-4">
          <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <motion.div 
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center justify-center gap-2 text-gray-400 font-mono text-sm"
        >
          <span className="text-xl">{loadingPhases[phase]?.icon || '⚡'}</span>
          <span>{loadingText}</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ...
          </motion.span>
        </motion.div>

        <p className="text-gray-500 mt-2 text-xs font-mono">
          {Math.round(progress)}%
        </p>

        <div className="flex justify-center gap-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ============= PROCESS CLASS =============
class Process {
  constructor(pid, arrival, burst, priority = 0, queue = 0) {
    this.pid = pid;
    this.arrival = arrival;
    this.burst = burst;
    this.priority = priority;
    this.queue = queue;
    this.remaining = burst;
    this.completion = 0;
    this.turnaround = 0;
    this.waiting = 0;
    this.response = -1;
    this.start = -1;
    this.executedSteps = [];
  }
}

// ============= ALL ALGORITHMS =============

// 1. FCFS
function simulateFCFS(processes) {
  const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
  const result = sorted.map(p => ({ ...p }));
  let currentTime = 0;
  const gantt = [];
  const executionLog = [];

  result.forEach(p => {
    if (currentTime < p.arrival) currentTime = p.arrival;
    p.start = currentTime;
    p.completion = currentTime + p.burst;
    p.turnaround = p.completion - p.arrival;
    p.waiting = p.turnaround - p.burst;
    p.response = p.start - p.arrival;
    gantt.push({ pid: p.pid, start: currentTime, end: p.completion });
    executionLog.push(`Time ${currentTime}-${p.completion}: ${p.pid} executed`);
    currentTime = p.completion;
  });

  return { processes: result, gantt, executionLog };
}

// 2. SJF (Non-preemptive)
function simulateSJF(processes) {
  const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
  const result = sorted.map(p => ({ ...p }));
  let currentTime = 0;
  const gantt = [];
  const executionLog = [];
  const completed = [];
  const ready = [];

  while (completed.length < result.length) {
    result.forEach(p => {
      if (p.arrival <= currentTime && !ready.includes(p) && !completed.includes(p)) {
        ready.push(p);
      }
    });

    if (ready.length === 0) {
      currentTime++;
      continue;
    }

    ready.sort((a, b) => a.burst - b.burst);
    const p = ready.shift();

    if (currentTime < p.arrival) currentTime = p.arrival;
    p.start = currentTime;
    p.completion = currentTime + p.burst;
    p.turnaround = p.completion - p.arrival;
    p.waiting = p.turnaround - p.burst;
    p.response = p.start - p.arrival;
    gantt.push({ pid: p.pid, start: currentTime, end: p.completion });
    executionLog.push(`Time ${currentTime}-${p.completion}: ${p.pid} executed (Shortest Job)`);
    currentTime = p.completion;
    completed.push(p);
  }

  return { processes: result, gantt, executionLog };
}

// 3. Round Robin
function simulateRR(processes, quantum = 2) {
  const result = processes.map(p => ({ ...p, remaining: p.burst }));
  let currentTime = 0;
  const gantt = [];
  const executionLog = [];
  const queue = [];
  const completed = [];
  let index = 0;

  result.sort((a, b) => a.arrival - b.arrival);

  while (completed.length < result.length) {
    while (index < result.length && result[index].arrival <= currentTime) {
      queue.push(result[index]);
      index++;
    }

    if (queue.length === 0) {
      currentTime++;
      continue;
    }

    const p = queue.shift();
    const execTime = Math.min(quantum, p.remaining);

    if (p.start === -1) p.start = currentTime;
    
    gantt.push({ pid: p.pid, start: currentTime, end: currentTime + execTime });
    executionLog.push(`Time ${currentTime}-${currentTime + execTime}: ${p.pid} executed (Quantum: ${quantum})`);
    p.remaining -= execTime;
    currentTime += execTime;

    while (index < result.length && result[index].arrival <= currentTime) {
      queue.push(result[index]);
      index++;
    }

    if (p.remaining > 0) {
      queue.push(p);
    } else {
      p.completion = currentTime;
      p.turnaround = p.completion - p.arrival;
      p.waiting = p.turnaround - p.burst;
      p.response = p.start - p.arrival;
      completed.push(p);
    }
  }

  return { processes: result, gantt, executionLog };
}

// 4. Priority (Non-preemptive)
function simulatePriority(processes) {
  const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
  const result = sorted.map(p => ({ ...p }));
  let currentTime = 0;
  const gantt = [];
  const executionLog = [];
  const completed = [];
  const ready = [];

  while (completed.length < result.length) {
    result.forEach(p => {
      if (p.arrival <= currentTime && !ready.includes(p) && !completed.includes(p)) {
        ready.push(p);
      }
    });

    if (ready.length === 0) {
      currentTime++;
      continue;
    }

    ready.sort((a, b) => b.priority - a.priority);
    const p = ready.shift();

    if (currentTime < p.arrival) currentTime = p.arrival;
    p.start = currentTime;
    p.completion = currentTime + p.burst;
    p.turnaround = p.completion - p.arrival;
    p.waiting = p.turnaround - p.burst;
    p.response = p.start - p.arrival;
    gantt.push({ pid: p.pid, start: currentTime, end: p.completion });
    executionLog.push(`Time ${currentTime}-${p.completion}: ${p.pid} executed (Priority: ${p.priority})`);
    currentTime = p.completion;
    completed.push(p);
  }

  return { processes: result, gantt, executionLog };
}

// 5. SRTF (Preemptive)
function simulateSRTF(processes) {
  const result = processes.map(p => ({ ...p, remaining: p.burst }));
  let currentTime = 0;
  const gantt = [];
  const executionLog = [];
  const completed = [];
  let lastPid = null;

  while (completed.length < result.length) {
    const available = result.filter(p => 
      p.arrival <= currentTime && 
      p.remaining > 0 && 
      !completed.includes(p)
    );

    if (available.length === 0) {
      currentTime++;
      continue;
    }

    available.sort((a, b) => a.remaining - b.remaining);
    const p = available[0];

    if (p.pid !== lastPid) {
      gantt.push({ pid: p.pid, start: currentTime, end: currentTime + 1 });
    } else {
      const last = gantt[gantt.length - 1];
      last.end = currentTime + 1;
    }

    if (p.start === -1) p.start = currentTime;
    p.remaining--;
    
    if (p.pid !== lastPid || p.remaining === 0) {
      executionLog.push(`Time ${currentTime}-${currentTime + 1}: ${p.pid} executed (Remaining: ${p.remaining})`);
    }
    
    currentTime++;
    lastPid = p.pid;

    if (p.remaining === 0) {
      p.completion = currentTime;
      p.turnaround = p.completion - p.arrival;
      p.waiting = p.turnaround - p.burst;
      p.response = p.start - p.arrival;
      completed.push(p);
    }
  }

  return { processes: result, gantt, executionLog };
}

// 6. Multilevel Queue
function simulateMLQ(processes) {
  const systemQueue = processes.filter(p => p.queue === 0).sort((a, b) => a.arrival - b.arrival);
  const userQueue = processes.filter(p => p.queue === 1).sort((a, b) => a.arrival - b.arrival);
  
  const result = processes.map(p => ({ ...p }));
  let currentTime = 0;
  const gantt = [];
  const executionLog = [];
  const completed = [];

  while (completed.length < result.length) {
    let queue = systemQueue.filter(p => p.arrival <= currentTime && !completed.includes(p));
    let isSystem = true;
    
    if (queue.length === 0) {
      queue = userQueue.filter(p => p.arrival <= currentTime && !completed.includes(p));
      isSystem = false;
    }

    if (queue.length === 0) {
      currentTime++;
      continue;
    }

    const p = queue[0];
    if (currentTime < p.arrival) currentTime = p.arrival;
    p.start = currentTime;
    p.completion = currentTime + p.burst;
    p.turnaround = p.completion - p.arrival;
    p.waiting = p.turnaround - p.burst;
    p.response = p.start - p.arrival;
    gantt.push({ pid: p.pid, start: currentTime, end: p.completion });
    executionLog.push(`Time ${currentTime}-${p.completion}: ${p.pid} executed (${isSystem ? 'System' : 'User'} Queue)`);
    currentTime = p.completion;
    completed.push(p);
  }

  return { processes: result, gantt, executionLog };
}

// 7. Multilevel Feedback Queue
function simulateMLFQ(processes) {
  const result = processes.map(p => ({ ...p, remaining: p.burst, queue: 0, quantum: 2 }));
  let currentTime = 0;
  const gantt = [];
  const executionLog = [];
  const completed = [];
  const queues = [[], [], []];

  while (completed.length < result.length) {
    result.forEach(p => {
      if (p.arrival <= currentTime && p.remaining > 0 && !completed.includes(p) && !queues.some(q => q.includes(p))) {
        queues[0].push(p);
      }
    });

    let found = false;
    for (let q = 0; q < queues.length; q++) {
      if (queues[q].length > 0) {
        const p = queues[q].shift();
        const quantum = [2, 4, 8][q];
        const execTime = Math.min(quantum, p.remaining);

        if (p.start === -1) p.start = currentTime;
        gantt.push({ pid: p.pid, start: currentTime, end: currentTime + execTime });
        executionLog.push(`Time ${currentTime}-${currentTime + execTime}: ${p.pid} executed (Queue ${q}, Quantum: ${quantum})`);
        
        p.remaining -= execTime;
        currentTime += execTime;

        if (p.remaining > 0) {
          const nextQueue = Math.min(q + 1, queues.length - 1);
          queues[nextQueue].push(p);
        } else {
          p.completion = currentTime;
          p.turnaround = p.completion - p.arrival;
          p.waiting = p.turnaround - p.burst;
          p.response = p.start - p.arrival;
          completed.push(p);
        }
        found = true;
        break;
      }
    }

    if (!found) {
      currentTime++;
    }
  }

  return { processes: result, gantt, executionLog };
}

// ============= MAIN APP COMPONENT =============
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [algorithm, setAlgorithm] = useState('fcfs');
  const [quantum, setQuantum] = useState(2);
  const [processes, setProcesses] = useState([
    { id: 1, pid: 'P1', arrival: 0, burst: 5, priority: 0, queue: 0 },
    { id: 2, pid: 'P2', arrival: 1, burst: 3, priority: 0, queue: 0 },
    { id: 3, pid: 'P3', arrival: 2, burst: 8, priority: 0, queue: 1 },
    { id: 4, pid: 'P4', arrival: 3, burst: 6, priority: 0, queue: 1 },
  ]);
  const [newProcess, setNewProcess] = useState({ arrival: '', burst: '', priority: '', queue: '' });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [compareResults, setCompareResults] = useState([]);
  const [stepMode, setStepMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // ============= PROCESS MANAGEMENT =============
  const addProcess = () => {
    const { arrival, burst, priority, queue } = newProcess;
    if (arrival === '' || burst === '' || parseInt(arrival) < 0 || parseInt(burst) <= 0) {
      toast.error('Please enter valid values (Arrival ≥ 0, Burst > 0)');
      return;
    }
    
    const nextPid = processes.length + 1;
    
    setProcesses([...processes, {
      id: nextPid,
      pid: `P${nextPid}`,
      arrival: parseInt(arrival),
      burst: parseInt(burst),
      priority: parseInt(priority) || 0,
      queue: parseInt(queue) || 0
    }]);
    
    setNewProcess({ arrival: '', burst: '', priority: '', queue: '' });
    toast.success(`Process P${nextPid} added! ✅`);
  };

  const deleteProcess = (id) => {
    setProcesses(processes.filter(p => p.id !== id));
    toast.success('Process deleted');
  };

  const addRandomProcess = () => {
    const arrival = Math.floor(Math.random() * 10);
    const burst = Math.floor(Math.random() * 8) + 2;
    const priority = Math.floor(Math.random() * 5);
    const queue = Math.floor(Math.random() * 2);
    const nextPid = processes.length + 1;
    
    setProcesses([...processes, {
      id: nextPid,
      pid: `P${nextPid}`,
      arrival,
      burst,
      priority,
      queue
    }]);
    toast.success(`Random process P${nextPid} added! 🎲`);
  };

  const clearAll = () => {
    if (processes.length === 0) return;
    if (confirm('Delete all processes?')) {
      setProcesses([]);
      setResults(null);
      toast.success('All cleared');
    }
  };

  // ============= EXPORT TO PDF =============
  const exportToPDF = () => {
    if (!results) {
      toast.error('Run a simulation first!');
      return;
    }
    
    const content = `
╔══════════════════════════════════════╗
║         CPU SIMULATOR REPORT         ║
╚══════════════════════════════════════╝

📊 Algorithm: ${algorithm.toUpperCase()}
📅 Date: ${new Date().toLocaleString()}

📈 METRICS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Total Time:        ${results.totalTime}
  Avg Turnaround:    ${results.avgTurnaround}
  Avg Waiting:       ${results.avgWaiting}
  CPU Utilization:   ${results.cpuUtilization}%
  Throughput:        ${results.throughput}

📋 PROCESS DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${results.processes.map(p => 
  `  ${p.pid}: Arrival=${p.arrival}, Burst=${p.burst}, Completion=${p.completion}, Turnaround=${p.turnaround}, Waiting=${p.waiting}`
).join('\n')}

📊 GANTT CHART:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${results.gantt.map(b => `${b.pid}(${b.start}-${b.end})`).join(' → ')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Made with ❤️ by Virendra (2026)
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cpu-simulator-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report exported! 📄');
  };

  // ============= IMPROVED COMPARE ALGORITHMS =============
  const compareAlgorithms = () => {
    if (processes.length === 0) {
      toast.error('Add processes first!');
      return;
    }

    const algos = [
      { value: 'fcfs', label: 'FCFS', icon: '⏳' },
      { value: 'sjf', label: 'SJF', icon: '⚡' },
      { value: 'rr', label: 'Round Robin', icon: '🔄' },
      { value: 'priority', label: 'Priority', icon: '⭐' },
      { value: 'srtf', label: 'SRTF', icon: '🎯' },
    ];
    
    const comparisonResults = [];
    const metricsData = {};
    
    algos.forEach(algo => {
      const procList = processes.map(p => 
        new Process(`P${p.id}`, p.arrival, p.burst, p.priority || 0, p.queue || 0)
      );
      
      let result;
      switch(algo.value) {
        case 'fcfs': result = simulateFCFS(procList); break;
        case 'sjf': result = simulateSJF(procList); break;
        case 'rr': result = simulateRR(procList, 2); break;
        case 'priority': result = simulatePriority(procList); break;
        case 'srtf': result = simulateSRTF(procList); break;
        default: result = simulateFCFS(procList);
      }
      
      const totalTime = Math.max(...result.processes.map(p => p.completion));
      const avgTurnaround = result.processes.reduce((sum, p) => sum + p.turnaround, 0) / result.processes.length;
      const avgWaiting = result.processes.reduce((sum, p) => sum + p.waiting, 0) / result.processes.length;
      const totalBurst = result.processes.reduce((sum, p) => sum + p.burst, 0);
      const cpuUtilization = (totalBurst / totalTime) * 100;
      
      const metrics = {
        totalTime,
        avgTurnaround: parseFloat(avgTurnaround.toFixed(2)),
        avgWaiting: parseFloat(avgWaiting.toFixed(2)),
        cpuUtilization: parseFloat(cpuUtilization.toFixed(2)),
        throughput: parseFloat((result.processes.length / totalTime).toFixed(2))
      };
      
      metricsData[algo.value] = metrics;
      
      comparisonResults.push({
        ...algo,
        metrics,
        gantt: result.gantt,
        processes: result.processes
      });
    });
    
    // Find best performers
    const bestTurnaround = Math.min(...Object.values(metricsData).map(m => m.avgTurnaround));
    const bestWaiting = Math.min(...Object.values(metricsData).map(m => m.avgWaiting));
    const bestUtilization = Math.max(...Object.values(metricsData).map(m => m.cpuUtilization));
    
    comparisonResults.forEach(result => {
      result.isBestTurnaround = result.metrics.avgTurnaround === bestTurnaround;
      result.isBestWaiting = result.metrics.avgWaiting === bestWaiting;
      result.isBestUtilization = result.metrics.cpuUtilization === bestUtilization;
    });
    
    setCompareResults(comparisonResults);
    setCompareMode(true);
    toast.success(`Compared ${comparisonResults.length} algorithms! 📊`);
  };

  // ============= RUN SIMULATION =============
  const runSimulation = async () => {
    if (processes.length === 0) {
      toast.error('Please add at least one process!');
      return;
    }
    
    setLoading(true);
    try {
      const procList = processes.map(p => 
        new Process(`P${p.id}`, p.arrival, p.burst, p.priority || 0, p.queue || 0)
      );
      
      let result;
      switch(algorithm) {
        case 'fcfs': result = simulateFCFS(procList); break;
        case 'sjf': result = simulateSJF(procList); break;
        case 'rr': result = simulateRR(procList, quantum); break;
        case 'priority': result = simulatePriority(procList); break;
        case 'srtf': result = simulateSRTF(procList); break;
        case 'mlq': result = simulateMLQ(procList); break;
        case 'mlfq': result = simulateMLFQ(procList); break;
        default: result = simulateFCFS(procList);
      }
      
      const totalTime = Math.max(...result.processes.map(p => p.completion));
      const avgTurnaround = result.processes.reduce((sum, p) => sum + p.turnaround, 0) / result.processes.length;
      const avgWaiting = result.processes.reduce((sum, p) => sum + p.waiting, 0) / result.processes.length;
      const totalBurst = result.processes.reduce((sum, p) => sum + p.burst, 0);
      const cpuUtilization = (totalBurst / totalTime) * 100;
      
      const resultsData = {
        processes: result.processes,
        gantt: result.gantt,
        executionLog: result.executionLog,
        totalTime,
        avgTurnaround: avgTurnaround.toFixed(2),
        avgWaiting: avgWaiting.toFixed(2),
        cpuUtilization: cpuUtilization.toFixed(2),
        throughput: (result.processes.length / totalTime).toFixed(2)
      };
      
      setResults(resultsData);
      setCurrentStep(0);
      
      const saved = await saveSimulation({
        algorithm,
        processes: processes.map(p => ({
          pid: p.pid,
          arrival: p.arrival,
          burst: p.burst,
          priority: p.priority || 0
        })),
        results: resultsData
      });
      
      if (saved.success) {
        toast.success('Simulation saved! 💾');
      }
      
    } catch (error) {
      toast.error('Simulation failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ============= LOAD HISTORY =============
  const loadHistory = async () => {
    try {
      const response = await getSimulations();
      if (response.success) {
        setHistory(response.data);
        setShowHistory(true);
        toast.success(`Loaded ${response.data.length} simulations`);
      }
    } catch (error) {
      toast.error('Failed to load history');
    }
  };

  // ============= STEP THROUGH EXECUTION =============
  const nextStep = () => {
    if (results && results.executionLog && currentStep < results.executionLog.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.success('End of execution log');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // ============= ALGORITHM OPTIONS =============
  const algorithms = [
    { value: 'fcfs', label: 'FCFS' },
    { value: 'sjf', label: 'SJF' },
    { value: 'srtf', label: 'SRTF' },
    { value: 'rr', label: 'Round Robin' },
    { value: 'priority', label: 'Priority' },
    { value: 'mlq', label: 'Multilevel Queue' },
    { value: 'mlfq', label: 'MLFQ' },
  ];

  // ============= INPUT FIELDS CONFIG =============
  const inputFields = [
    { 
      key: 'arrival', 
      label: 'Arrival Time', 
      icon: <Clock className="w-4 h-4" />,
      placeholder: 'e.g., 0, 2, 5',
      example: '0',
      tooltip: 'When the process arrives in the ready queue'
    },
    { 
      key: 'burst', 
      label: 'Burst Time', 
      icon: <Zap className="w-4 h-4" />,
      placeholder: 'e.g., 3, 5, 8',
      example: '5',
      tooltip: 'Total CPU time required by the process'
    },
    { 
      key: 'priority', 
      label: 'Priority', 
      icon: <Hash className="w-4 h-4" />,
      placeholder: 'e.g., 1 (highest)',
      example: '1',
      tooltip: 'Higher number = Higher priority (for Priority algorithms)'
    },
    { 
      key: 'queue', 
      label: 'Queue Level', 
      icon: <Briefcase className="w-4 h-4" />,
      placeholder: '0 = System, 1 = User',
      example: '0',
      tooltip: 'Queue level for Multi-Level Queue scheduling'
    },
  ];

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  // ============= RENDER =============
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-wrap justify-between items-center gap-4 mb-6"
        >
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }}>
              <Cpu className={`w-10 h-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </motion.div>
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>CPU Simulator</h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Visualize CPU Scheduling Algorithms</p>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCode(!showCode)}
              className={`p-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${darkMode ? 'bg-gray-700 text-green-400 hover:bg-gray-600' : 'bg-gray-200 text-green-600 hover:bg-gray-300'}`}
            >
              <Code className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={compareAlgorithms}
              className={`p-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${darkMode ? 'bg-gray-700 text-purple-400 hover:bg-gray-600' : 'bg-gray-200 text-purple-600 hover:bg-gray-300'}`}
            >
              <GitBranch className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={exportToPDF}
              className={`p-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${darkMode ? 'bg-gray-700 text-red-400 hover:bg-gray-600' : 'bg-gray-200 text-red-600 hover:bg-gray-300'}`}
            >
              <Download className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={loadHistory}
              className={`p-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${darkMode ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' : 'bg-gray-200 text-blue-600 hover:bg-gray-300'}`}
            >
              <History className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={runSimulation}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${darkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
            >
              {loading ? (
                <motion.span 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ⏳
                </motion.span>
              ) : (
                <Play className="w-5 h-5" />
              )}
              {loading ? 'Running...' : 'Run'}
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Algorithm Selector */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={`rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h3 className={`font-semibold text-lg mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                <ListChecks className="w-5 h-5" />
                Algorithm
              </h3>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
              >
                {algorithms.map(algo => (
                  <option key={algo.value} value={algo.value}>
                    {algo.label}
                  </option>
                ))}
              </select>
              {algorithm === 'rr' && (
                <div className="mt-3">
                  <label className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Time Quantum:</label>
                  <input
                    type="number"
                    value={quantum}
                    onChange={(e) => setQuantum(parseInt(e.target.value) || 2)}
                    className={`ml-2 px-2 py-1 border rounded w-16 focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                    min="1"
                  />
                </div>
              )}
              <div className="mt-4">
                <button
                  onClick={() => setStepMode(!stepMode)}
                  className={`w-full py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                >
                  <RefreshCw className="w-4 h-4" />
                  {stepMode ? 'Exit Step Mode' : 'Step Mode'}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Process Table with Enhanced Input */}
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={`rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                <BarChart3 className="w-5 h-5" />
                Process Input
                <span className={`text-xs ml-2 px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                  {processes.length} processes
                </span>
              </h2>

              {/* Enhanced Interactive Input Fields */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {inputFields.map((field) => (
                  <motion.div 
                    key={field.key}
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <label className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center gap-1 mb-1`}>
                      {field.icon}
                      {field.label}
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="cursor-help"
                        title={field.tooltip}
                      >
                        <HelpCircle className="w-3 h-3 opacity-50" />
                      </motion.div>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={newProcess[field.key]}
                        onChange={(e) => setNewProcess({ ...newProcess, [field.key]: e.target.value })}
                        onFocus={() => setFocusedInput(field.key)}
                        onBlur={() => setFocusedInput(null)}
                        placeholder={field.placeholder}
                        className={`w-full px-3 py-2 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          darkMode 
                            ? 'bg-gray-700 text-gray-200 border-gray-600 placeholder-gray-400' 
                            : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'
                        } ${focusedInput === field.key ? 'ring-2 ring-blue-500' : ''}`}
                      />
                      <AnimatePresence>
                        {focusedInput === field.key && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8, y: -5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -5 }}
                            className={`absolute -bottom-6 left-0 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
                          >
                            e.g., {field.example}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addProcess} 
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" /> Add Process
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addRandomProcess} 
                  className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 transition-all duration-200"
                >
                  <Sparkles className="w-4 h-4" /> Random
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearAll} 
                  className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-all duration-200"
                >
                  Clear All
                </motion.button>
              </div>

              {/* Process Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`text-left text-sm border-b ${darkMode ? 'text-gray-400 border-gray-700' : 'text-gray-600 border-gray-200'}`}>
                      <th className="pb-3">PID</th>
                      <th className="pb-3">Arrival</th>
                      <th className="pb-3">Burst</th>
                      <th className="pb-3">Priority</th>
                      <th className="pb-3">Queue</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processes.length === 0 ? (
                      <tr>
                        <td colSpan="6" className={`text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Plus className="w-8 h-8 mx-auto mb-2 opacity-30" />
                            No processes added. Add one above!
                          </motion.div>
                        </td>
                      </tr>
                    ) : (
                      processes.map((p, index) => (
                        <motion.tr
                          key={p.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ backgroundColor: darkMode ? '#374151' : '#F3F4F6' }}
                          className={`border-b ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-900'}`}
                        >
                          <td className="py-3 font-semibold flex items-center gap-2">
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Cpu className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                            </motion.div>
                            {p.pid}
                          </td>
                          <td className="py-3">{p.arrival}</td>
                          <td className="py-3">{p.burst}</td>
                          <td className="py-3">{p.priority || '-'}</td>
                          <td className="py-3">{p.queue || 0}</td>
                          <td className="py-3 text-right">
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteProcess(p.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="mt-6 space-y-6"
            >
              {/* Execution Log (Step Mode) */}
              {stepMode && results.executionLog && (
                <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className={`font-semibold text-lg mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    <Clock className="w-5 h-5" />
                    Execution Log - Step {currentStep + 1}/{results.executionLog.length}
                  </h3>
                  <div className={`p-4 rounded-lg font-mono text-sm ${darkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-900 text-green-400'}`}>
                    {results.executionLog[currentStep] || 'End of execution'}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button onClick={prevStep} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Previous
                    </button>
                    <button onClick={nextStep} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { label: 'Total Time', value: results.totalTime, color: 'green', icon: <Timer className="w-5 h-5" /> },
                  { label: 'Avg Turnaround', value: results.avgTurnaround, color: 'blue', icon: <Clock className="w-5 h-5" /> },
                  { label: 'Avg Waiting', value: results.avgWaiting, color: 'yellow', icon: <AlertTriangle className="w-5 h-5" /> },
                  { label: 'CPU Utilization', value: `${results.cpuUtilization}%`, color: 'purple', icon: <Cpu className="w-5 h-5" /> },
                  { label: 'Throughput', value: results.throughput, color: 'indigo', icon: <TrendingUp className="w-5 h-5" /> },
                ].map((metric, index) => (
                  <motion.div 
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`border rounded-lg p-4 text-center transition-all duration-200 ${darkMode ? 'bg-gray-800 border-gray-700' : `bg-${metric.color}-50 border-${metric.color}-200`}`}
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      {metric.icon}
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : `text-${metric.color}-600`}`}>{metric.label}</p>
                    </div>
                    <p className={`text-2xl font-bold ${darkMode ? `text-${metric.color}-400` : `text-${metric.color}-800`}`}>{metric.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Gantt Chart */}
              <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`font-semibold text-lg mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  <GanttChartSquare className="w-5 h-5" />
                  Gantt Chart
                </h3>
                <div className={`rounded-lg p-4 overflow-x-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  <div className="flex items-end min-w-max">
                    {results.gantt.map((block, index) => {
                      const colors = ['#4fc3f7', '#81c784', '#ffb74d', '#f06292', '#9575cd', '#4dd0e1'];
                      const color = colors[index % colors.length];
                      const width = ((block.end - block.start) / results.totalTime) * 100;
                      const minWidth = 60;
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scaleY: 1.1, zIndex: 10 }}
                          className="relative group"
                          style={{ width: `${Math.max(width, 5)}%`, minWidth: `${minWidth}px` }}
                        >
                          <div 
                            className="h-12 rounded-lg flex items-center justify-center text-white font-semibold text-sm transition-transform hover:scale-y-110 cursor-pointer"
                            style={{ backgroundColor: color }}
                          >
                            {block.pid}
                            <span className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                              {block.start}-{block.end}
                            </span>
                          </div>
                          <div className={`text-xs mt-1 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {block.start}-{block.end}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Detailed Results Table */}
              <div className={`rounded-xl shadow-sm p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className={`font-semibold text-lg mb-4 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  <Clock className="w-5 h-5" />
                  Detailed Results
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`text-left ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
                        <th className="p-3">Process</th>
                        <th className="p-3">Arrival</th>
                        <th className="p-3">Burst</th>
                        <th className="p-3">Completion</th>
                        <th className="p-3">Turnaround</th>
                        <th className="p-3">Waiting</th>
                        <th className="p-3">Response</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.processes.map((p, index) => (
                        <tr key={index} className={`border-b ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-900 hover:bg-gray-50'}`}>
                          <td className="p-3 font-semibold">{p.pid}</td>
                          <td className="p-3">{p.arrival}</td>
                          <td className="p-3">{p.burst}</td>
                          <td className="p-3">{p.completion}</td>
                          <td className="p-3">{p.turnaround}</td>
                          <td className="p-3">{p.waiting}</td>
                          <td className="p-3">{p.response}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============================================================ */}
        {/* IMPROVED COMPARE MODE */}
        {/* ============================================================ */}
        <AnimatePresence>
          {compareMode && compareResults.length > 0 && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className={`mt-6 rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Trophy className={`w-6 h-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Algorithm Comparison
                  </h3>
                  <span className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                    {compareResults.length} algorithms
                  </span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCompareMode(false)} 
                  className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                >
                  ✕
                </motion.button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-blue-600'}`}>🏆 Best Turnaround</p>
                  <p className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    {compareResults.find(r => r.isBestTurnaround)?.label || 'N/A'}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-blue-600'}`}>
                    {compareResults.find(r => r.isBestTurnaround)?.metrics.avgTurnaround || 'N/A'}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-green-600'}`}>⏱️ Best Waiting Time</p>
                  <p className={`text-xl font-bold ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                    {compareResults.find(r => r.isBestWaiting)?.label || 'N/A'}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-green-600'}`}>
                    {compareResults.find(r => r.isBestWaiting)?.metrics.avgWaiting || 'N/A'}
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-purple-600'}`}>⚡ Best CPU Utilization</p>
                  <p className={`text-xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                    {compareResults.find(r => r.isBestUtilization)?.label || 'N/A'}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-purple-600'}`}>
                    {compareResults.find(r => r.isBestUtilization)?.metrics.cpuUtilization || 'N/A'}%
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-orange-50'}`}>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-orange-600'}`}>📊 Total Algorithms</p>
                  <p className={`text-xl font-bold ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                    {compareResults.length}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-orange-600'}`}>
                    Compared successfully
                  </p>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`text-left text-sm border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <th className="pb-3 font-semibold">Algorithm</th>
                      <th className="pb-3 font-semibold text-center">Total Time</th>
                      <th className="pb-3 font-semibold text-center">Avg Turnaround</th>
                      <th className="pb-3 font-semibold text-center">Avg Waiting</th>
                      <th className="pb-3 font-semibold text-center">CPU Utilization</th>
                      <th className="pb-3 font-semibold text-center">Throughput</th>
                      <th className="pb-3 font-semibold text-center">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compareResults.map((result, index) => {
                      // Calculate score (lower is better for turnaround and waiting)
                      const score = (result.metrics.avgTurnaround + result.metrics.avgWaiting) / 2;
                      const isBest = result.isBestTurnaround || result.isBestWaiting || result.isBestUtilization;
                      
                      return (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ backgroundColor: darkMode ? '#374151' : '#F3F4F6' }}
                          className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                        >
                          <td className="py-3 font-semibold flex items-center gap-2">
                            <span className="text-xl">{result.icon}</span>
                            {result.label}
                            {isBest && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-yellow-400"
                              >
                                👑
                              </motion.span>
                            )}
                          </td>
                          <td className="py-3 text-center">{result.metrics.totalTime}</td>
                          <td className={`py-3 text-center ${result.isBestTurnaround ? 'font-bold text-green-500' : ''}`}>
                            {result.metrics.avgTurnaround}
                            {result.isBestTurnaround && <CheckCircle2 className="w-4 h-4 inline ml-1 text-green-500" />}
                          </td>
                          <td className={`py-3 text-center ${result.isBestWaiting ? 'font-bold text-blue-500' : ''}`}>
                            {result.metrics.avgWaiting}
                            {result.isBestWaiting && <CheckCircle2 className="w-4 h-4 inline ml-1 text-blue-500" />}
                          </td>
                          <td className={`py-3 text-center ${result.isBestUtilization ? 'font-bold text-purple-500' : ''}`}>
                            {result.metrics.cpuUtilization}%
                            {result.isBestUtilization && <CheckCircle2 className="w-4 h-4 inline ml-1 text-purple-500" />}
                          </td>
                          <td className="py-3 text-center">{result.metrics.throughput}</td>
                          <td className="py-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              {score < 5 ? (
                                <span className="text-green-500">🌟 Excellent</span>
                              ) : score < 10 ? (
                                <span className="text-blue-500">👍 Good</span>
                              ) : score < 15 ? (
                                <span className="text-yellow-500">📊 Average</span>
                              ) : (
                                <span className="text-red-500">⚠️ Needs Improvement</span>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Comparison Gantt Charts */}
              <div className="mt-6">
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  📊 Gantt Charts Comparison
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {compareResults.map((result, index) => {
                    const colors = ['#4fc3f7', '#81c784', '#ffb74d', '#f06292', '#9575cd'];
                    const maxTime = Math.max(...result.gantt.map(b => b.end));
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-3 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}
                      >
                        <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {result.icon} {result.label}
                          <span className="text-xs ml-2 opacity-50">
                            (Total: {result.metrics.totalTime})
                          </span>
                        </p>
                        <div className="flex h-8">
                          {result.gantt.map((block, i) => {
                            const width = ((block.end - block.start) / maxTime) * 100;
                            const minWidth = 20;
                            return (
                              <div
                                key={i}
                                className="h-full rounded flex items-center justify-center text-white text-xs font-bold"
                                style={{
                                  width: `${Math.max(width, 5)}%`,
                                  minWidth: `${minWidth}px`,
                                  backgroundColor: colors[i % colors.length]
                                }}
                              >
                                {block.pid}
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex justify-between text-xs mt-1 text-gray-500">
                          <span>0</span>
                          <span>{maxTime}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 text-center text-xs text-gray-500">
                🏆 Best performers are marked with 👑 and green/blue/purple badges
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Code Explanation Mode */}
        <AnimatePresence>
          {showCode && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowCode(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className={`rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-2xl font-bold flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    <Code className="w-6 h-6" />
                    Code Explanation
                  </h3>
                  <button onClick={() => setShowCode(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                    ✕
                  </button>
                </div>
                <div className={`p-4 rounded-lg font-mono text-sm ${darkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-900 text-green-400'}`}>
                  <pre className="whitespace-pre-wrap">
{`// ${algorithm.toUpperCase()} Algorithm Implementation

function simulate${algorithm.toUpperCase()}(processes) {
  // Step 1: Sort processes by arrival time
  const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
  
  // Step 2: Initialize variables
  let currentTime = 0;
  const gantt = [];
  const completed = [];
  
  // Step 3: Process each process
  while (completed.length < sorted.length) {
    // Step 4: Get available processes
    const available = sorted.filter(p => 
      p.arrival <= currentTime && !completed.includes(p)
    );
    
    // Step 5: Select process based on algorithm
    // FCFS: First come first serve
    // SJF: Shortest job first
    // RR: Round robin with quantum
    // Priority: Highest priority first
    // SRTF: Shortest remaining time first
    
    // Step 6: Execute process
    // Step 7: Calculate metrics
    // Step 8: Update Gantt chart
  }
  
  return { processes, gantt };
}`}
                  </pre>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History Modal */}
        <AnimatePresence>
          {showHistory && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowHistory(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className={`rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-2xl font-bold flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    <History className="w-6 h-6" />
                    Simulation History
                  </h2>
                  <button 
                    onClick={() => setShowHistory(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ✕
                  </button>
                </div>
                
                {history.length === 0 ? (
                  <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No simulations saved yet. Run a simulation first!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {history.map((sim, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`border rounded-lg p-4 transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
                      >
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <p className={`font-semibold text-lg ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                              #{sim.id} - {sim.algorithm.toUpperCase()}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {sim.processes?.length || 0} processes • Total Time: {sim.totalTime || 'N/A'}
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              {sim.createdAt ? new Date(sim.createdAt).toLocaleString() : 'Unknown date'}
                            </p>
                          </div>
                          <div className={`text-right text-sm px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                              Avg Turnaround: {sim.metrics?.avgTurnaround || 'N/A'}
                            </p>
                            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                              CPU Utilization: {sim.metrics?.cpuUtilization || 'N/A'}%
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-12 pt-6 border-t text-center ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'}`}
        >
          <p className="text-sm flex items-center justify-center gap-2">
            Made with 
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-red-500"
            >
              ❤️
            </motion.span>
            by <span className="font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Virendra</span>
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity }}>⚡</motion.span>
            &copy; 2026
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;