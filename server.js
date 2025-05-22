const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs'); // Módulo para interactuar con el sistema de archivos (para orders.json)

const app = express();
const port = 3000;

// Middleware para parsear JSON en las peticiones (cuando el navegador envía datos al servidor)
app.use(bodyParser.json());

// Servir archivos estáticos del front-end (HTML, CSS, JS, imágenes)
// Esto le dice a Express que cualquier petición que no sea a una API (como /api/orders)
// debe buscar un archivo en la carpeta 'public'.
app.use(express.static('public'));

// --- Configuración de Nodemailer ---
// ¡REEMPLAZA ESTO CON TUS PROPIAS CREDENCIALES!
// Si usas Gmail y tienes la verificación en dos pasos activada,
// DEBES generar una "contraseña de aplicación" para usar aquí.
const transporter = nodemailer.createTransport({
  service: 'gmail', // Por ejemplo: 'gmail', 'outlook', o un servidor SMTP específico
  auth: {
    user: 'tioamericanoficial@gmail.com', // Tu dirección de correo electrónico
    pass: 'xggzgrrafwpxpmdx' // Tu contraseña o contraseña de aplicación
  }
});

// --- Ruta para recibir los pedidos (API) ---
// Cuando el front-end hace un POST a /api/orders, este código se ejecuta
app.post('/api/orders', async (req, res) => {
  const order = req.body; // Los datos del pedido que vienen del front-end
  console.log('Nuevo pedido recibido:', order);

  // --- 1. Guardar el pedido en un archivo JSON ---
  const ordersFilePath = 'orders.json'; // Nombre del archivo donde se guardarán los pedidos
  let existingOrders = [];

  try {
    // Intenta leer los pedidos existentes del archivo
    if (fs.existsSync(ordersFilePath)) {
      const data = fs.readFileSync(ordersFilePath, 'utf8');
      if (data) { // Si el archivo no está vacío, parsea el JSON
        existingOrders = JSON.parse(data);
      }
    }
  } catch (error) {
    console.error('Error al leer orders.json o parsear JSON:', error);
    // Si hay un error de lectura/parseo, se asume que no hay pedidos existentes o el archivo está corrupto
    existingOrders = [];
  }

  // Agrega el nuevo pedido con un ID único (timestamp) y la fecha/hora
  existingOrders.push({ id: Date.now(), timestamp: new Date().toISOString(), ...order });

  try {
    // Escribe todos los pedidos (incluyendo el nuevo) de vuelta al archivo
    fs.writeFileSync(ordersFilePath, JSON.stringify(existingOrders, null, 2));
    console.log('Pedido guardado en orders.json');
  } catch (error) {
    console.error('Error al escribir en orders.json:', error);
    // Podemos decidir si este error es crítico para detener la respuesta o no
    // Por ahora, lo registramos y seguimos intentando enviar el email
  }

  // --- 2. Enviar email de confirmación ---
  const mailOptions = {
    from: 'tu_correo@gmail.com', // Debe ser la misma dirección de correo que en 'auth.user'
    to: order.customer.email, // Email del cliente
    subject: `Confirmación de tu pedido en iPhone Store #${Date.now()}`,
    html: `
      <h2>¡Gracias por tu compra, ${order.customer.name}!</h2>
      <p>Tu pedido ha sido confirmado y pronto será procesado.</p>
      <h3>Detalles del Pedido:</h3>
      <ul>
        ${order.items.map(item => `<li>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
      </ul>
      <p><strong>Total: $${order.total.toFixed(2)}</strong></p>
      <p><strong>Datos de Contacto:</strong></p>
      <ul>
          <li>Email: ${order.customer.email}</li>
          <li>Dirección: ${order.customer.address}</li>
      </ul>
      <p>Te enviaremos más detalles a tu dirección de envío.</p>
      <p>Saludos cordiales,</p>
      <p>El equipo de iPhone Store</p>
    `
  };

  try {
    // Envía el correo electrónico
    await transporter.sendMail(mailOptions);
    console.log('Email enviado exitosamente a:', order.customer.email);
    // Si todo fue bien (guardar y enviar email), envía una respuesta de éxito al front-end
    res.status(200).json({ message: 'Pedido recibido y email enviado.', orderId: Date.now() });
  } catch (error) {
    console.error('Error al enviar el email:', error);
    // Si hubo un error en el email, envía una respuesta de error al front-end
    res.status(500).json({ message: 'Pedido recibido, pero hubo un error al enviar el email.', error: error.message });
  }
});

// --- Iniciar el Servidor ---
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log(`Tu tienda está en http://localhost:${port}/index.html`); // Para acceder desde el navegador
});