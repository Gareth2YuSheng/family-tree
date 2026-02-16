import React from 'react';
import { Handle, Position } from '@xyflow/react';

import './UnionNode.css';


export default function UnionNode({ data }) {
  // Determine color based on relationship type
//   const isDivorced = data.Relationship === 'Divorced';
//   const bgColor = isDivorced ? '#d9534f' : '#555'; // Red for divorced, Grey for married

  return (
    <div className="uNode" style={{}}>
      <Handle type="target" position={Position.Top} style={{ background: 'transparent', border: 'none', top: '10px'}} isConnectable={false} />

      {/* <span className="uNodeLabel">
        {isDivorced ? 'D' : ''} 
      </span> */}

      <Handle type="source" position={Position.Bottom} style={{ background: 'transparent', border: 'none', bottom: '10px' }} isConnectable={false} />
    </div>
  );
}