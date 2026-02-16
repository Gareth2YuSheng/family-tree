import React, { useState, useEffect } from 'react';
import './PersonSearch.css'; // <--- Import CSS

export default function PersonSearch({ nodes, onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    
    const filtered = nodes.filter(node => 
      node.type === 'person' && 
      !node.id.startsWith('dummy') && 
      node.data.Full_Name && 
      node.data.Full_Name.toLowerCase().includes(lowerQuery)
    );

    setResults(filtered);
  }, [query, nodes]);

  const handleSelect = (node) => {
    setQuery(''); 
    setShowDropdown(false);
    onSelect(node); 
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        placeholder="Search Person..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
      />
      
      {showDropdown && results.length > 0 && (
        <div className="search-dropdown">
          {results.map(node => (
            <div 
              key={node.id} 
              className="search-item"
              onClick={() => handleSelect(node)}
            >
              {node.data.Full_Name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}