# Guía de Prueba - Validador de Fletes

## 🎯 Cómo probar sin PDF real

Si no tienes un PDF disponible, puedes crear uno fácilmente. Aquí te muestro varios métodos:

### Método 1: Crear PDF desde un documento de Word
1. Abre Microsoft Word
2. Escribe lo siguiente:
   ```
   FACTURA EJEMPLO
   
   Factura No. 12345
   Valor: $50000.00
   Ciudad Destino: Bogotá
   ```
3. Guarda el archivo como PDF (Archivo > Guardar como > PDF)
4. Usa ese PDF en la aplicación

### Método 2: Crear PDF desde Google Docs
1. Ve a docs.google.com
2. Crea un nuevo documento
3. Escribe:
   ```
   FACTURA DE VENTA
   
   Factura No. 98765
   Valor: $100000
   Ciudad Destino: Medellín
   ```
4. Descárgalo como PDF (Archivo > Descargar > PDF)

### Método 3: Usar un servicio online
- Usa un generador de PDF online (ej: html2pdf.com)
- Pega este contenido:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Factura</title>
</head>
<body>
    <h1>FACTURA</h1>
    <p><strong>Factura No.:</strong> 54321</p>
    <p><strong>Valor:</strong> $75000.00</p>
    <p><strong>Ciudad Destino:</strong> Cali</p>
</body>
</html>
```
- Convierte a PDF y descárgalo

## ✅ Ejemplo de Prueba Completa

1. **Crear un PDF** con el contenido:
   ```
   Factura No. 50000
   Valor: $200000
   Ciudad Destino: Barranquilla
   ```

2. **Abrir index.html** en tu navegador

3. **Paso 1**: Subir el PDF
   - Click en "Subir Archivo"
   - Selecciona tu PDF

4. **Paso 2**: Seleccionar factura
   - Elige la factura del dropdown

5. **Paso 3**: Calcular
   - Ingresa flete: **$15000**
   - Click "Calcular"

6. **Resultado esperado**:
   - Porcentaje: **7.50%**
   - Estado: Flete normal (color amarillo)

## 📊 Casos de Prueba

### Caso 1: Flete Bajo (< 5%)
- Valor Factura: $100,000
- Valor Flete: $4,000
- Porcentaje: 4% ✅ Verde

### Caso 2: Flete Normal (5-10%)
- Valor Factura: $100,000
- Valor Flete: $7,500
- Porcentaje: 7.5% 🟨 Amarillo

### Caso 3: Flete Alto (> 10%)
- Valor Factura: $100,000
- Valor Flete: $15,000
- Porcentaje: 15% 🟠 Naranja

## 🔧 Troubleshooting

### El PDF no se carga
- Asegúrate que es un PDF válido
- El navegador debe tener JavaScript habilitado
- Intenta con un PDF diferente

### No extrae los datos correctamente
- Verifica que el PDF contenga texto (no sea imagen escaneada)
- Usa palabras clave como "Factura", "Valor", "Ciudad"
- Los datos pueden aparecer en minúsculas

### El cálculo no funciona
- Asegúrate de ingresar un número válido
- No uses caracteres especiales en el valor

---

**¡La aplicación está lista para usar!** 🚀
