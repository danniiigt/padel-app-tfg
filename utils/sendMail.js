import nodemailer from "nodemailer";

export const sendMail = async (emailTo, subject, title, body, userName) => {
  const message = {
    to: emailTo,
    from: "danielgonzaleztormo@gmail.com",
    subject: subject,
    text: subject,
    html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>${title}</title>
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
          <th>Reserva de Pista</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <h3>${userName}, tiene un nuevo mensaje de soporte</h3>
            <hr>
            <p>
              <b>Mensaje: </b>
              <br />
              <br />
              ${body}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
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

  try {
    const result = await transporter.sendMail(message);
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
};
