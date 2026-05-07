const pdfjsLib = window['pdfjs-dist/build/pdf'];

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let currentInvoices = [];
let selectedInvoice = null;

// DOM Elements
const fileInput = document.getElementById('fileInput');
const btnUpload = document.getElementById('btnUpload');
const uploadMessage = document.getElementById('uploadMessage');
const sectionSelect = document.getElementById('section-select');
const invoiceSelect = document.getElementById('invoiceSelect');
const invoiceDetails = document.getElementById('invoiceDetails');
const sectionCalculate = document.getElementById('section-calculate');
const freightInput = document.getElementById('freightInput');
const btnCalculate = document.getElementById('btnCalculate');
const calculateMessage = document.getElementById('calculateMessage');
const sectionResult = document.getElementById('section-result');
const resultContent = document.getElementById('resultContent');

// ========== UTILITY FUNCTIONS ==========
function showMessage(element, message, type = 'info') {
  element.textContent = message;
  element.className = `message ${type}`;
}

function formatNumber(num) {
  return parseFloat(num).toLocaleString('es-CO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// ========== UPLOAD FILE ==========
async function uploadFile() {
  const file = fileInput.files[0];

  if (!file) {
    showMessage(uploadMessage, 'Por favor selecciona un archivo', 'error');
    return;
  }

  if (file.type !== 'application/pdf') {
    showMessage(uploadMessage, 'El archivo debe ser un PDF', 'error');
    return;
  }

  try {
    showMessage(uploadMessage, 'Procesando PDF...', 'info');

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();

    const textItems = textContent.items.map(item => item.str).join(' ');
    console.log('Contenido del PDF:', textItems);

    // =========================
    // NUMERO FACTURA
    // =========================
    const numeroFacturaMatch = textItems.match(/Nro\.?FJ\s*(\d+)/i);

    // =========================
    // CIUDAD
    // =========================
    const ciudadMatch = textItems.match(
      /CIUDAD:\s*([A-ZÁÉÍÓÚÑ\s]+?)\s+SUCURSAL:/i
    );

    // =========================
    // VALOR FACTURA (ROBUSTO)
    // =========================

    let valorFactura = '0.00';

    const start = textItems.toUpperCase().indexOf('VALOR A PAGAR');

    if (start !== -1) {

      const bloque = textItems.substring(start, start + 800);

      console.log('Bloque VALOR A PAGAR:', bloque);

      const numeros = bloque.match(
        /\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?/g
      );

      console.log('Numeros financieros:', numeros);

      if (numeros && numeros.length) {
        valorFactura = numeros[7]; 
      }
    }

    const extractedInvoice = {
      numero_factura: numeroFacturaMatch ? numeroFacturaMatch[1] : 'N/A',

      valor_factura: parseFloat(
        valorFactura.replace(/,/g, '')
      ),

      ciudad_destino: ciudadMatch ? ciudadMatch[1].trim() : 'N/A',

      archivo: file.name
    };

    console.log('Factura extraída:', extractedInvoice);

    currentInvoices = [extractedInvoice];

    showMessage(uploadMessage, '✅ Archivo procesado exitosamente', 'success');
    populateInvoiceSelect();
    sectionSelect.classList.remove('hidden');

  } catch (error) {
    console.error(error);
    showMessage(uploadMessage, 'Error procesando el PDF: ' + error.message, 'error');
  }
}

// ========== POPULATE INVOICE SELECT ==========
function populateInvoiceSelect() {
  invoiceSelect.innerHTML = '<option value="">-- Selecciona una factura --</option>';

  currentInvoices.forEach((invoice, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `Factura ${invoice.numero_factura} - ${invoice.ciudad_destino}`;
    invoiceSelect.appendChild(option);
  });

  invoiceSelect.addEventListener('change', handleInvoiceChange);
}

// ========== HANDLE INVOICE CHANGE ==========
function handleInvoiceChange() {
  const selectedIndex = invoiceSelect.value;

  if (selectedIndex === '') {
    invoiceDetails.classList.add('hidden');
    sectionCalculate.classList.add('hidden');
    sectionResult.classList.add('hidden');
    freightInput.value = '';
    calculateMessage.textContent = '';
    return;
  }

  selectedInvoice = currentInvoices[selectedIndex];
  displayInvoiceDetails();
  invoiceDetails.classList.remove('hidden');
  sectionCalculate.classList.remove('hidden');
}

// ========== DISPLAY INVOICE DETAILS ==========
function displayInvoiceDetails() {
  const html = `
    <div class="detail-row">
      <strong>Número de Factura:</strong>
      <span>${selectedInvoice.numero_factura}</span>
    </div>
    <div class="detail-row">
      <strong>Valor de Factura:</strong>
      <span>$${formatNumber(selectedInvoice.valor_factura)}</span>
    </div>
    <div class="detail-row">
      <strong>Ciudad Destino:</strong>
      <span>${selectedInvoice.ciudad_destino}</span>
    </div>
    <div class="detail-row">
      <strong>Archivo:</strong>
      <span>${selectedInvoice.archivo}</span>
    </div>
  `;
  invoiceDetails.innerHTML = html;
}

// ========== CALCULATE FREIGHT ==========
function calculateFreight() {
  if (!selectedInvoice) {
    showMessage(calculateMessage, 'Selecciona una factura primero', 'error');
    return;
  }

  const freightValue = parseFloat(freightInput.value);

  if (!freightInput.value || isNaN(freightValue) || freightValue < 0) {
    showMessage(calculateMessage, 'Por favor ingresa un valor válido de flete', 'error');
    return;
  }

  const percentage = (freightValue / selectedInvoice.valor_factura) * 100;

  displayResults({
    numeroFactura: selectedInvoice.numero_factura,
    valorFactura: selectedInvoice.valor_factura,
    valorFlete: freightValue,
    porcentaje: percentage,
    ciudad: selectedInvoice.ciudad_destino
  });

  showMessage(calculateMessage, '✅ Cálculo realizado exitosamente', 'success');
}

// ========== DISPLAY RESULTS ==========
function displayResults(data) {
  let resultClass = 'success';
  let assessment = '';

  if (data.porcentaje > 10) {
    resultClass = 'warning';
    assessment = 'El flete es alto respecto a la factura';
  } else if (data.porcentaje <= 5) {
    assessment = 'El flete es bajo respecto a la factura';
  } else {
    assessment = 'El flete está en un rango normal';
  }

  const html = `
    <div class="result-summary ${resultClass}">
      <h3>📊 Resumen del Cálculo</h3>
      <div class="result-grid">
        <div class="result-item">
          <strong>Factura:</strong>
          <span>${data.numeroFactura}</span>
        </div>
        <div class="result-item">
          <strong>Valor Factura:</strong>
          <span>$${formatNumber(data.valorFactura)}</span>
        </div>
        <div class="result-item">
          <strong>Valor Flete:</strong>
          <span>$${formatNumber(data.valorFlete)}</span>
        </div>
        <div class="result-item">
          <strong>Porcentaje:</strong>
          <span style="font-weight: bold; color: #2563EB;">${data.porcentaje.toFixed(2)}%</span>
        </div>
        <div class="result-item">
          <strong>Ciudad:</strong>
          <span>${data.ciudad}</span>
        </div>
        <div class="result-item">
          <strong>Evaluación:</strong>
          <span>${assessment}</span>
        </div>
      </div>
    </div>
  `;

  resultContent.innerHTML = html;
  sectionResult.classList.remove('hidden');
}

// ========== EVENTS ==========
btnUpload.addEventListener('click', uploadFile);
btnCalculate.addEventListener('click', calculateFreight);

freightInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    calculateFreight();
  }
});