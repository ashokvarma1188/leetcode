import React, { useState, useEffect } from 'react';

const RemoveDuplicatesAnimation = () => {
  // Initial array with duplicates
  const initialArray = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
  
  // State for animation
  const [nums, setNums] = useState([...initialArray]);
  const [j, setJ] = useState(0);
  const [i, setI] = useState(1);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState("Initial array with duplicates");
  
  // Function to reset animation
  const resetAnimation = () => {
    setNums([...initialArray]);
    setJ(0);
    setI(1);
    setStep(0);
    setCompleted(false);
    setMessage("Initial array with duplicates");
  };
  
  // Function to perform a single step of the algorithm
  const performStep = () => {
    if (completed) return;
    
    if (i >= nums.length) {
      setCompleted(true);
      setMessage(`Algorithm completed! Final unique count: ${j + 1}`);
      return;
    }
    
    setMessage(`Comparing nums[${j}] = ${nums[j]} and nums[${i}] = ${nums[i]}`);
    
    if (nums[j] !== nums[i]) {
      // Update j and copy the element
      const newJ = j + 1;
      setMessage(`nums[${j}] ≠ nums[${i}], incrementing j to ${newJ} and setting nums[${newJ}] = ${nums[i]}`);
      
      // Create a new array with the updated value
      const newNums = [...nums];
      newNums[newJ] = nums[i];
      
      setNums(newNums);
      setJ(newJ);
    } else {
      setMessage(`nums[${j}] = nums[${i}], skipping...`);
    }
    
    // Always increment i
    setI(i + 1);
    setStep(step + 1);
  };
  
  // Handle play/pause
  useEffect(() => {
    let timer;
    if (playing && !completed) {
      timer = setTimeout(performStep, speed);
    }
    return () => clearTimeout(timer);
  }, [playing, i, j, step, completed]);
  
  // Get cell background color based on index
  const getCellColor = (index) => {
    if (index === j) return "#00cc44"; // Green for j
    if (index === i) return "#cc6600"; // Orange for i
    if (index <= j) return "#0088cc"; // Blue for processed unique elements
    return "#333333"; // Dark gray for unprocessed elements
  };
  
  return (
    <div className="flex flex-col items-center p-6 bg-black text-white w-full h-full min-h-96">
      <h2 className="text-2xl font-bold mb-6">Remove Duplicates Animation</h2>
      
      <div className="mb-8 w-full max-w-3xl">
        <div className="mb-2 text-lg text-center">{message}</div>
        
        {/* Array visualization */}
        <div className="flex justify-center mb-4">
          {nums.map((num, index) => (
            <div 
              key={index} 
              className="relative flex items-center justify-center w-12 h-12 m-1 rounded-md text-white font-bold text-lg transition-all duration-300"
              style={{ backgroundColor: getCellColor(index) }}
            >
              {num}
              <div className="absolute -bottom-6 text-xs font-mono">{index}</div>
            </div>
          ))}
        </div>
        
        {/* Index pointers */}
        <div className="flex justify-center items-center mb-6">
          <div className="flex items-center mr-6">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span>j = {j}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
            <span>i = {i}</span>
          </div>
        </div>
        
        {/* Algorithm explanation */}
        <div className="bg-gray-900 p-4 rounded-md mb-4 font-mono text-sm">
          <div className="text-gray-400">// Algorithm:</div>
          <div>int j = 0;</div>
          <div>for (int i = 1; i {'<'} nums.length; i++) {'{'}</div>
          <div className="ml-4">if (nums[j] != nums[i]) {'{'}</div>
          <div className="ml-8">nums[++j] = nums[i];</div>
          <div className="ml-4">{'}'}</div>
          <div>{'}'}</div>
          <div>return ++j; // Length of array with unique elements</div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex space-x-4">
        <button 
          onClick={() => setPlaying(!playing)} 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          {playing ? "Pause" : "Play"}
        </button>
        <button 
          onClick={performStep} 
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
          disabled={completed}
        >
          Step
        </button>
        <button 
          onClick={resetAnimation} 
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
        >
          Reset
        </button>
        <select 
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="px-4 py-2 bg-gray-800 rounded"
        >
          <option value="2000">Slow</option>
          <option value="1000">Medium</option>
          <option value="500">Fast</option>
        </select>
      </div>
      
      {completed && (
        <div className="mt-6 p-4 bg-green-900 rounded-md">
          <div className="font-bold">Final result:</div>
          <div>Original array length: {initialArray.length}</div>
          <div>New length with unique elements: {j + 1}</div>
          <div>Unique elements: [{nums.slice(0, j + 1).join(', ')}]</div>
        </div>
      )}
    </div>
  );
};

export default RemoveDuplicatesAnimation;
