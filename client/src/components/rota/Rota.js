import React, { useEffect, useState } from 'react';
import './rota.css';

function Rota () {
  const [rota, setRota] = useState();

  useEffect(() => {
    fetch('http://localhost:4000/rota')
      .then(response => response.json())
      .then(data => setRota(data))
      .catch(error => console.error(error));
  }, [setRota]);

  return (
    <div>Rota</div>
  );
}

export default Rota;