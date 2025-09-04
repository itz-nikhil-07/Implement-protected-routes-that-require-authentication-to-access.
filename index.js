const app = document.getElementById('app');

// Simulate a fake user
const FAKE_USER = {
  username: 'admin',
  password: '1234'
};

// Render login form
function renderLogin() {
  app.innerHTML = `
    <div class="container">
      <h2>Login</h2>
      <input type="text" id="username" placeholder="Username" />
      <input type="password" id="password" placeholder="Password" />
      <button onclick="handleLogin()">Login</button>
    </div>
  `;
}

// Render protected dashboard
function renderDashboard() {
  app.innerHTML = `
    <div class="container">
      <h2>Dashboard</h2>
      <p>Welcome, ${FAKE_USER.username}!</p>
      <button onclick="logout()">Logout</button>
    </div>
  `;
}

// Route to dashboard only if logged in
function navigate(route) {
  const isAuthenticated = localStorage.getItem('auth') === 'true';

  if (route === 'dashboard') {
    if (isAuthenticated) {
      renderDashboard();
    } else {
      alert('Access denied. Please login first.');
      renderLogin();
    }
  } else {
    renderLogin();
  }
}

// Handle login
function handleLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === FAKE_USER.username && password === FAKE_USER.password) {
    localStorage.setItem('auth', 'true');
    navigate('dashboard');
  } else {
    alert('Invalid credentials');
  }
}

// Logout function
function logout() {
  localStorage.removeItem('auth');
  navigate('login');
}

// Initialize app
navigate('login');
