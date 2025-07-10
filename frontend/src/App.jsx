import React from 'react'; // Adicione esta linha
import UserProfile from './components/UserProfile';
import './index.css';

function App() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <UserProfile />
    </div>
  );
}

export default App;