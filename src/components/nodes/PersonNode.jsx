import { Handle, Position } from '@xyflow/react';
import manIcon from '../../assets/man.png';
import womanIcon from '../../assets/woman.png';

import './PersonNode.css';

export default function PersonNode({ data }) {
  return (
    <div className="node">
      <Handle type="target" position={Position.Top} style={{ background: 'transparent', border: 'none', top: '10px' }} />
      
      <div className="nodeCircle">
        {data.Photo_URL ? (
          <img src={data.Photo_URL} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <img src={data.Sex === "Male" ? manIcon : womanIcon} alt="No Photo" style={{ width: '45px' }} />
          </div>
        )}
      </div>

      <div className="nodeLabel">
        <strong>{data.Full_Name}</strong>
        {/* <div style={{ fontSize: '10px', color: '#666' }}>{data.sex}</div> */}
        <div style={{ fontSize: '10px', color: '#666' }}>{data.Date_Of_Birth || "Unknown"}</div>
      </div>

      <Handle type="source" position={Position.Bottom} style={{ background: 'transparent', border: 'none', bottom: '10px' }} />
    </div>
  );
}