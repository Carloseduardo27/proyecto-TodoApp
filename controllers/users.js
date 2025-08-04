// Importar módulos necesarios
const usersRouter = require('express').Router();// Importar el modelo de usuario
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const nodemailer = require('nodemailer');
const { PAGE_URL } = require('../config'); // Importar la URL de la página desde el archivo de configuración

//                                           crear un  usuario
//1. validar que los campos no estén vacíos y se hace desestructuracion de objetos
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  if (!name || !email || !password) {
    return response
      .status(400)
      .json({ error: 'Todos los espacios son requeridos' });
  }

  //2. Verificar si el email ya existe
  const userExists = await User.findOne({ email });

  //Si el usuario ya existe, retornar un error
  if (userExists) {
    return response
      .status(400)
      .json({ error: 'El email ya se encuentra en uso' });
  }

  //3. Encriptar la contraseña con la libreria bcrypt y un metodo .has, primero se define el numero de rondas y luego
  //se usa la función .hash para encriptar la contraseña
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  //4. Crear un nuevo usuario tomando como referencia el esquema de los modelos
  const newUser = new User({
    name,
    email,
    passwordHash,
  });

  //5. Se guarda el usuario en la base de datos con el metodo de mongoose (.save)
  const savedUser = await newUser.save();

  //6. Se Generar un token de acceso con la libreria jwt y el metodo .sign se usa para generar una firma que garantiza la integridad con el id y el y la clave secreta
  const token = jwt.sign(
    { id: savedUser.id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1d',
    }
  );
  //7. se configura el transportador para enviar el correo electronico con el metodo de nodenailer createTransport 
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      //.env: es un objeto que contiene las variables de entorno definidas en el archivo .env
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  //8. se envia un correo de verificacion con el metodo de nodemailer sendMail
  await transporter.sendMail({
    from: process.env.EMAIL_USER, //de
    to: savedUser.email, //a
    subject: 'Verificacion de usuario',
    html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar correo</a>`,
  });
  //Retornar una respuesta al cliente
  return response
    .status(201)
    .json('Usuario creado. por favor verifica tu correo');
});




// Ruta para verificar el usuario mediante un token que se envia al correo electronico
usersRouter.patch('/:id/:token', async (request, response) => {
  // Verificar el token y actualizar el usuario
  try {
    const token = request.params.token;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decodedToken.id;
    await User.findByIdAndUpdate(id, { verified: true });
    return response.sendStatus(200);

  } catch (error) {
    const id = request.params.id;
    const { email } = await User.findById(id);

    //Firmar el nuevo token
        const token = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
        });
    
    //Enviar el email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    //Enviar el email de verificacion
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verificacion de usuario',
      html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verificar correo</a>`,
    });
    
    //Retornar un error al cliente
return response.status(400).json({ error: 'El link ya expiro. Se ha enviado un nuevo link de verificacion' });
  }
});

// Ruta para obtener todos los usuarios
module.exports = usersRouter;