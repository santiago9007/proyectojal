# 🚚 Validador de Fletes por Factura

Una aplicación web moderna para calcular el porcentaje de flete respecto al valor de tu factura.

## ✨ Características

- ✅ **Lectura de PDFs**: Carga un archivo PDF y extrae automáticamente la información de la factura
- 📊 **Cálculo automático**: Calcula el porcentaje de flete respecto al valor de la factura
- 🎨 **Interfaz moderna**: Diseño responsive y atractivo
- 📱 **Totalmente funcional**: Sin necesidad de servidor backend
- 🔍 **Validación inteligente**: Detecta si el flete es bajo, normal o alto

## 🚀 Cómo usar

### 1. Abrir la aplicación

- Abre el archivo `index.html` en tu navegador web
- O usa un servidor local (recomendado para mejor rendimiento)

### 2. Subir un PDF

1. Haz clic en "Subir Archivo" en la sección 1
2. Selecciona un archivo PDF que contenga información de factura
3. El sistema extraerá automáticamente:
   - Número de factura
   - Valor de la factura
   - Ciudad de destino

### 3. Seleccionar factura

- Elige la factura extraída del dropdown
- Verifica los detalles mostrados

### 4. Calcular flete

- Ingresa el valor del flete en la sección 3
- Haz clic en "Calcular" o presiona Enter
- Verifica el resultado:
  - **Verde (< 5%)**: Flete bajo
  - **Amarillo (5-10%)**: Flete normal
  - **Naranja (> 10%)**: Flete alto

## 📋 Formato esperado del PDF

El PDF debe contener información similar a esta:

```
Factura No. 12345
Valor: $50,000.00
Ciudad Destino: Bogotá
```

El sistema buscará estos patrones:

- **Número**: Factura / Invoice / No.
- **Valor**: Valor / Monto / Total / Amount
- **Ciudad**: Ciudad Destino / City Destination

## 🛠️ Tecnologías

- HTML5
- CSS3 (Responsive Design)
- JavaScript (Vanilla JS)
- PDF.js para lectura de PDFs

## 📦 Archivos

- `index.html` - Estructura HTML
- `app.js` - Lógica de la aplicación
- `style.css` - Estilos y diseño
- `README.md` - Este archivo

## 🔧 Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet (para cargar PDF.js)

## 📝 Notas

- La aplicación funciona completamente en el navegador
- No se envía información a servidores
- Compatible con dispositivos móviles
- Los datos no se guardan (se limpian al recargar)

## ✨ Mejoras futuras

- Soporte para múltiples PDFs
- Gráficas de análisis
- Exportar resultados a CSV/PDF
- Historial de cálculos (Local Storage)

---

**¡Versión 1.0 - Totalmente Funcional!** ✅
