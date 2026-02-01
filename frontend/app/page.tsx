'use client';

import { useState } from 'react';

export default function Home() {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [result, setResult] = useState<string>('ここに結果が出ます');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ num1, num2 }),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult('エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Microservices Calculator</h1>
        <p style={subTitleStyle}>Next.js ↔ Express(TS) ↔ Go</p>
        
        {/* 入力エリア */}
        <div style={inputGroupStyle}>
          <input 
            type="number" 
            value={num1} 
            onChange={(e) => setNum1(Number(e.target.value))} 
            style={inputStyle}
          />
          <span style={operatorStyle}>+</span>
          <input 
            type="number" 
            value={num2} 
            onChange={(e) => setNum2(Number(e.target.value))} 
            style={inputStyle}
          />
        </div>

        {/* ボタン */}
        <button 
          onClick={handleCalculate} 
          disabled={loading} 
          style={loading ? {...buttonStyle, ...disabledStyle} : buttonStyle}
        >
          {loading ? '計算中...' : 'Goで計算を実行'}
        </button>

        {/* 結果表示エリア */}
        <div style={resultContainerStyle}>
          <label style={labelStyle}>Execution Result:</label>
          <pre style={preStyle}>{result}</pre>
        </div>
      </div>
    </div>
  );
}

// --- 以下、デザイン用の設定（CSS-in-JS） ---

const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f0f2f5',
  fontFamily: 'system-ui, -apple-system, sans-serif',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '450px',
  textAlign: 'center',
};

const titleStyle: React.CSSProperties = {
  margin: '0 0 10px 0',
  fontSize: '24px',
  color: '#1a1a1a',
};

const subTitleStyle: React.CSSProperties = {
  margin: '0 0 30px 0',
  fontSize: '14px',
  color: '#666',
};

const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px',
  marginBottom: '20px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '18px',
  textAlign: 'center',
};

const operatorStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  backgroundColor: '#0070f3',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};

const disabledStyle: React.CSSProperties = {
  backgroundColor: '#ccc',
  cursor: 'not-allowed',
};

const resultContainerStyle: React.CSSProperties = {
  marginTop: '30px',
  textAlign: 'left',
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#888',
  textTransform: 'uppercase',
};

const preStyle: React.CSSProperties = {
  backgroundColor: '#f8f9fa',
  padding: '15px',
  borderRadius: '6px',
  border: '1px solid #eee',
  fontSize: '14px',
  overflowX: 'auto',
  color: '#333',
};