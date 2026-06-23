// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const saveSimulation = async (data) => {
  try {
    const response = await fetch(`${API_URL}/simulations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error('Save error:', error);
    throw error;
  }
};

export const getSimulations = async () => {
  try {
    const response = await fetch(`${API_URL}/simulations`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const deleteSimulation = async (id) => {
  try {
    const response = await fetch(`${API_URL}/simulations/${id}`, {
      method: 'DELETE'
    });
    return await response.json();
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};

export const deleteAllSimulations = async () => {
  try {
    const response = await fetch(`${API_URL}/simulations`, {
      method: 'DELETE'
    });
    return await response.json();
  } catch (error) {
    console.error('Delete all error:', error);
    throw error;
  }
};
