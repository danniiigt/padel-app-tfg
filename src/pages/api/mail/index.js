import nodemailer from "nodemailer";

export default function handler(req, res) {
  switch (req.method) {
    case "POST":
      handlePostPista(req, res);
      break;

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}

const message = {
  to: "danielgonzalezt13@gmail.com",
  from: "danielgonzaleztormo@gmail.com",
  subject: "Nuevo Mensaje de Soporte",
  text: "Nuevo Mensaje de Soporte",
  html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Título del correo electrónico</title>
    <style>
      /* Fuente */
      body {
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #444444;
      }
      /* Estilos de la tabla */
      table {
        border-collapse: collapse;
        width: 100%;
        max-width: 600px;
        margin: auto;
      }
      th,
      td {
        text-align: left;
        padding: 15px;
        border-bottom: 1px solid #dddddd;
      }
      th {
        background-color: #3454d1;
        color: #ffffff;
      }
      /* Estilos del botón */
      .boton {
        display: inline-block;
        background-color: #ffc914;
        color: #ffffff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body style="background-color: #ffffff">
    <table>
      <thead>
        <tr>
          <th>Nuevo mensaje de soporte</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <h3>Daniel, tiene un nuevo mensaje de soporte</h3>
            <hr>
            <ul>
              <li><b>Nombre:</b> Pepe</li>
              <li><b>Email:</b> pepe@pepe.gmail.com</li>
              <li><b>Sujeto:</b> Me la bufa todo!</li>
            </ul>
            <hr>
            <p>
              <b>Mensaje: </b>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit debitis quidem officia inventore consequatur nobis, reprehenderit facere voluptatum necessitatibus quibusdam voluptatem alias. Tempora, numquam commodi. Eos dicta in porro? Iste sunt impedit unde voluptas possimus doloremque porro illo! Architecto reprehenderit quo eos voluptatem maxime fuga et sint unde inventore. Qui sint, laudantium exercitationem praesentium magni alias dolores? Nisi saepe repellat sapiente architecto voluptas, reiciendis libero facere blanditiis consequatur assumenda sed delectus praesentium laborum unde et quisquam sint accusamus quidem nam laudantium beatae provident deserunt perspiciatis quaerat! Quae exercitationem earum quam nobis aut quod odit officiis voluptatem, eos quas beatae minus?
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <center>
      <a class="boton" href="#">A FUMAR PETARDOS!</a>
    </center>
  </body>
</html>
`,
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  service: "gmail",
  auth: {
    user: "danielgonzaleztormo@gmail.com",
    pass: "dqmgdbwuatgsjdok",
  },
});

const handlePostPista = async (req, res) => {
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);

      res.status(404).json({
        error: `Connection refused at ${err.address}`,
      });
    } else {
      res.status(250).json({
        success: `Message delivered to ${info.accepted}`,
      });
    }
  });
};
