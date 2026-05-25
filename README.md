# tarea-2
# 🐇 Conejos Fibonacci + Verificador de Contraseña Segura (con número primo obligatorio)

Proyecto web interactivo que combina dos conceptos matemáticos fundamentales: la **sucesión de Fibonacci** (modelo de crecimiento poblacional de conejos) y la **seguridad basada en números primos** aplicada a la validación de contraseñas robustas.

## 🚀 Características principales

- **Calculadora de Fibonacci**: permite ingresar un número de días/meses y obtiene la cantidad de parejas y total de conejos según la sucesión clásica.
- **Verificador de contraseña segura**: evalúa la fortaleza de una contraseña en tiempo real basándose en seis criterios, siendo **obligatorio** que contenga al menos un número primo (ej: 2, 3, 5, 7, 11, 13…).
- **Diseño responsive**: se adapta a móviles, tablets y escritorio con distintas paletas de color.
- **Sin bloqueos**: ambos formularios (Fibonacci y validador) están visibles y funcionales simultáneamente, sin necesidad de “desbloquear” nada.

## 🧠 Conceptos aplicados

| Concepto | Aplicación en el proyecto |
|----------|----------------------------|
| Sucesión de Fibonacci | Cálculo del número de parejas de conejos en el día *n* (F(1)=1, F(2)=1, F(n)=F(n-1)+F(n-2)). |
| Números primos | La contraseña debe incluir un número primo (como subcadena numérica) para ser considerada válida. Esto refuerza la enseñanza sobre la importancia de los primos en criptografía. |
| Criterios de seguridad | Longitud ≥ 8, minúscula, mayúscula, dígito, carácter especial y número primo obligatorio. |

## 📁 Estructura del proyecto
