import React, { useState, useEffect } from 'react';

function PromoBar() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const { hours, minutes, seconds } = prev;
        
        if (seconds > 0) return { ...prev, seconds: seconds - 1 };
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
        
        clearInterval(timer);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      backgroundColor: '#ff95cb',
      color: 'white',
      padding: '10px',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      flexWrap: 'wrap'
    }}>
      <div>
        <span style={{ marginRight: '10px' }}>🎉</span>
        3 CUOTAS SIN INTERÉS
      </div>
      <div>
        <span style={{ marginRight: '10px' }}>✈️</span>
        ENVÍO GRATIS EN COMPRAS SUPERIORES A $149.000
      </div>
      <div style={{ fontWeight: 'bold' }}>
        ⏰ Oferta termina en: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </div>
    </div>
  );
}

export default PromoBar;