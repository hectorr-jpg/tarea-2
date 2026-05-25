document.addEventListener('DOMContentLoaded', () => {
  // -------------------- FIBONACCI (CONEJOS) --------------------
  const fibonacciForm = document.getElementById('fibonacciForm');
  const nDiasInput = document.getElementById('nDias');
  const fibonacciResultDiv = document.getElementById('fibonacciResult');

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

  fibonacciForm.addEventListener('submit', (e) => {
    e.preventDefault();
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

  // -------------------- VERIFICADOR DE CONTRASEÑA SEGURA (CON PRIMO OBLIGATORIO) --------------------
  const passwordInput = document.getElementById('passwordInput');
  const strengthBar = document.getElementById('strengthBar');
  const passwordStrengthMessage = document.getElementById('passwordStrengthMessage');

  // Elementos de criterios (incluyendo el nuevo para número primo)
  const criteriaLength = document.getElementById('criteriaLength');
  const criteriaLower = document.getElementById('criteriaLower');
  const criteriaUpper = document.getElementById('criteriaUpper');
  const criteriaDigit = document.getElementById('criteriaDigit');
  const criteriaSpecial = document.getElementById('criteriaSpecial');
  const criteriaPrime = document.getElementById('criteriaPrime');

  // Función auxiliar para saber si un número es primo
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

  // Función que verifica si la contraseña contiene AL MENOS UN NÚMERO PRIMO
  // (como subcadena contigua de dígitos)
  function contieneNumeroPrimo(password) {
    // Buscar todas las secuencias de dígitos dentro de la contraseña
    const matches = password.match(/\d+/g);
    if (!matches) return false;
    
    for (let seq of matches) {
      // Convertir a número (parseInt elimina ceros a la izquierda de forma natural)
      // Pero consideramos que "05" es 5 (primo), parseInt funciona correctamente
      let num = parseInt(seq, 10);
      if (esPrimo(num)) return true;
      
      // También hay que evaluar subcadenas dentro de la misma secuencia numérica
      // por ejemplo "113" contiene 11 y 13 que son primos, aunque 113 también es primo
      // pero para cubrir casos como "237" (2,3,7,23,37) necesitamos revisar todas las subcadenas.
      // Mejor extraer todas las subcadenas de dígitos posibles.
      for (let i = 0; i < seq.length; i++) {
        for (let j = i + 1; j <= seq.length; j++) {
          let subNum = parseInt(seq.substring(i, j), 10);
          if (esPrimo(subNum)) return true;
        }
      }
    }
    return false;
  }

  // Función principal que evalúa la contraseña (con PRIMO OBLIGATORIO)
  function evaluatePasswordStrength(password) {
    // Criterios individuales
    const hasMinLength = password.length >= 8;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasPrime = contieneNumeroPrimo(password);
    
    // Actualizar lista visual de requisitos
    criteriaLength.innerHTML = hasMinLength ? '✅ Al menos 8 caracteres' : '❌ Al menos 8 caracteres';
    criteriaLower.innerHTML = hasLower ? '✅ Al menos una minúscula' : '❌ Al menos una minúscula';
    criteriaUpper.innerHTML = hasUpper ? '✅ Al menos una mayúscula' : '❌ Al menos una mayúscula';
    criteriaDigit.innerHTML = hasDigit ? '✅ Al menos un número' : '❌ Al menos un número';
    criteriaSpecial.innerHTML = hasSpecial ? '✅ Al menos un carácter especial (!@#$%^&*)' : '❌ Al menos un carácter especial (!@#$%^&*)';
    criteriaPrime.innerHTML = hasPrime ? '✅ Contiene un número primo (obligatorio)' : '❌ DEBE contener un número primo (2,3,5,7,11,13...)';
    
    // Calcular puntaje total (sobre 6 criterios)
    let score = 0;
    if (hasMinLength) score++;
    if (hasLower) score++;
    if (hasUpper) score++;
    if (hasDigit) score++;
    if (hasSpecial) score++;
    if (hasPrime) score++;
    
    let strengthPercent = (score / 6) * 100;
    let barColor = '';
    let messageClass = '';
    let strengthText = '';
    
    // Caso especial: si no hay primo, la contraseña es automáticamente DÉBIL (requisito obligatorio)
    if (!hasPrime) {
      strengthPercent = (score / 6) * 100; // igual mostramos el porcentaje real pero con mensaje crítico
      barColor = '#dc3545';
      messageClass = 'error';
      passwordStrengthMessage.innerHTML = '❌ CONTRASEÑA NO VÁLIDA: Debes incluir al menos un número primo (ej: 2,3,5,7,11,13...). La seguridad es obligatoria.';
      strengthBar.style.width = `${strengthPercent}%`;
      strengthBar.style.backgroundColor = barColor;
      // También actualizamos el resto de la interfaz
      passwordStrengthMessage.className = `message ${messageClass}`;
      return;
    }
    
    // Si tiene primo, evaluamos fuerza con los 6 criterios
    if (score <= 2) {
      strengthText = '🔴 DÉBIL - Muy pocos criterios cumplidos';
      barColor = '#dc3545';
      messageClass = 'error';
      passwordStrengthMessage.innerHTML = `⚠️ Contraseña DÉBIL (${score}/6). Agrega más variedad de caracteres.`;
    } else if (score <= 4) {
      strengthText = '🟡 MEDIA - Puede mejorar';
      barColor = '#ffc107';
      messageClass = 'warning';
      passwordStrengthMessage.innerHTML = `🟡 Contraseña MEDIA (${score}/6). Intenta cumplir todos los requisitos.`;
    } else {
      strengthText = '🟢 FUERTE - Excelente contraseña';
      barColor = '#28a745';
      messageClass = 'success';
      passwordStrengthMessage.innerHTML = `✅ ¡Perfecto! Contraseña FUERTE (${score}/6). Incluye primo y todos los criterios.`;
    }
    
    strengthBar.style.width = `${strengthPercent}%`;
    strengthBar.style.backgroundColor = barColor;
    passwordStrengthMessage.className = `message ${messageClass}`;
  }

  // Evento en tiempo real para la contraseña
  passwordInput.addEventListener('input', (e) => {
    const password = e.target.value;
    evaluatePasswordStrength(password);
  });

  // Llamada inicial (contraseña vacía)
  evaluatePasswordStrength('');

  // Enlaces del footer
  const repoLink = document.getElementById('repoLink');
  const liveLink = document.getElementById('liveLink');
  repoLink.href = 'https://github.com/hectorr-jpg/tarea-2.git';
  liveLink.href = 'https://tusitio.github.io/problema-conejos-seguridad';
});
