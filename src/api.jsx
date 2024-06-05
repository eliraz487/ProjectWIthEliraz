const API_BASE_URL = 'http://localhost:3000';

export const registerUser = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error('Failed to register user');
  }
};

export const sendValidationEmail = async (email) => {
  const response = await fetch(`${API_BASE_URL}/send-validation-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    throw new Error('Failed to send validation email');
  }
};

export const validateUserCode = async (email, code) => {
  const response = await fetch(`${API_BASE_URL}/validate-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, code }),
  });
  if (!response.ok) {
    throw new Error('Failed to validate code');
  }
  return response.json();
};

// Get all religions
export const getReligions = async () => {
  const response = await fetch(`${API_BASE_URL}/religions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch religions');
  }
  return response.json();
};

export const getGenders = async () => {
  const response = await fetch(`${API_BASE_URL}/genders`);
  if (!response.ok) {
    throw new Error('Failed to fetch genders');
  }
  return response.json();
};

export const getCities = async () => {
  const response = await fetch(`${API_BASE_URL}/cities`);
  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }
  return response.json();
};

export const getEconomicSituations = async () => {
  const response = await fetch(`${API_BASE_URL}/economic-situations`);
  if (!response.ok) {
    throw new Error('Failed to fetch economic situations');
  }
  return response.json();
};

export const getEducations = async () => {
  const response = await fetch(`${API_BASE_URL}/educations`);
  if (!response.ok) {
    throw new Error('Failed to fetch educations');
  }
  return response.json();
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error('Failed to login');
  }
  return response.json();
};
