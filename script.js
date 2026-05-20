document.addEventListener('DOMContentLoaded', () => {
  const passwordForm = document.getElementById('passwordForm');
  const primeInput = document.getElementById('primePass');
  const passwordMessageDiv = document.getElementById('passwordMessage');
  const rabbitSection = document.getElementById('rabbitProblemSection');
  
  const fibonacciForm = document.getElementById('fibonacciForm');
  const nDiasInput = document.getElementById('nDias');
  const fibonacciResultDiv = document.getElementById('fibonacciResult');
  
  const repoLink = document.getElementById('repoLink');
  const liveLink = document.getElementById('liveLink');
  repoLink.href = 'https://github.com/tuusuario/problema-conejos';
  liveLink.href = 'https://tusitio.github.io/problema-conejos';
  
  function esPrimo(num) {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    const limite = Math.sqrt(num);
    for (let i = 3; i <= limite; i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  }
  
  function fibonacci(n) {
    if (n <= 0) return 0;
    if (n === 1 || n === 2) return 1;
    let a = 1, b = 1;
    for (let i = 3; i <= n; i++) {
      let temp = a + b;
      a = b;
      b = temp;
    }
    return b;
  }
  
  passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const valor = parseInt(primeInput.value, 10);
    
    if (isNaN(valor) || valor <= 0) {
      passwordMessageDiv.innerHTML = '❌ Por favor ingresa un número entero positivo.';
      passwordMessageDiv.className = 'message error';
      rabbitSection.style.display = 'none';
      return;
    }
    
    if (esPrimo(valor)) {
      passwordMessageDiv.innerHTML = `✅ ¡Correcto! El número ${valor} es primo. Acceso concedido. Ahora puedes calcular la población de conejos.`;
      passwordMessageDiv.className = 'message success';
      rabbitSection.style.display = 'block';
      rabbitSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      passwordMessageDiv.innerHTML = `❌ El número ${valor} NO es primo. Intenta de nuevo con un número primo (pista: 2, 3, 5, 7, 11, 13...).`;
      passwordMessageDiv.className = 'message error';
      rabbitSection.style.display = 'none';
      fibonacciResultDiv.innerHTML = '';
    }
  });
  
  fibonacciForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (rabbitSection.style.display !== 'block') {
      fibonacciResultDiv.innerHTML = '🔒 Primero debes ingresar una contraseña que sea número primo para desbloquear el problema.';
      fibonacciResultDiv.style.color = '#b91c1c';
      return;
    }
    
    const n = parseInt(nDiasInput.value, 10);
    if (isNaN(n) || n < 1) {
      fibonacciResultDiv.innerHTML = '⚠️ Por favor ingresa un número de días válido (entero mayor o igual a 1).';
      fibonacciResultDiv.style.color = '#b85c00';
      return;
    }
    
    const fibValue = fibonacci(n);
    const totalConejos = fibValue * 2;
    
    fibonacciResultDiv.innerHTML = `
      <strong>📆 Día ${n}</strong><br>
      🐇 El ${n}-ésimo número de Fibonacci es: <strong style="font-size:1.4rem;">${fibValue}</strong><br>
      ➕ Esto representa <strong>${fibValue} parejas</strong> de conejos.<br>
      🐰 Total de conejos en el día ${n}: <strong style="font-size:1.3rem;">${totalConejos} conejos</strong>.<br>
      <span style="font-size:0.9rem;">(Fibonacci clásico: F(1)=1, F(2)=1, F(3)=2 ...)</span>
    `;
    fibonacciResultDiv.style.color = 'inherit';
    fibonacciResultDiv.style.background = 'rgba(0,0,0,0.03)';
    fibonacciResultDiv.style.padding = '1rem';
    fibonacciResultDiv.style.borderRadius = '1rem';
  });
  
  rabbitSection.style.display = 'none';
  passwordMessageDiv.innerHTML = '';
  fibonacciResultDiv.innerHTML = '';
});