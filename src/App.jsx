
import './App.css'
import NodeFlow from './components/NodeFlow'
import Header from './components/Header' // Import it

function App() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', // The container fills the screen
      width: '100vw',
      overflow: 'hidden' // Prevents accidental scrolling
    }}>
      {/* 1. Header takes up fixed 60px */}
      <Header />

      {/* 2. NodeFlow takes up ALL remaining space */}
      <div style={{ flex: 1, width: '100%', position: 'relative' }}>
        <NodeFlow />
      </div>
    </div>
  )
}

export default App
