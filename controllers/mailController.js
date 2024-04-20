const nodemailer = require("nodemailer");
const { createObjectCsvWriter } = require("csv-writer");
const fs = require("fs");

const sendMail = async (dataArray) => {
  if (dataArray.length === 0) {
    console.log("No data to send");
  }
  try {
    const csvWriter = createObjectCsvWriter({
      path: "data.csv",
      header: [
        { id: "name", title: "Name" },
        { id: "phoneNumber", title: "Phone Number" },
        { id: "email", title: "Email" },
        { id: "hobbies", title: "Hobbies" },
      ],
    });
    await csvWriter.writeRecords(dataArray);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_SENDER_EMAIL,
        pass: process.env.SMTP_SENDER_PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: "Mehul Jain",
        address: process.env.SMTP_SENDER_EMAIL,
      },
      to: "mehuljain0503@gmail.com",
      subject: "Your Required Data",
      html: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Your required data</title>
                    </head>
                    <body>
                        <h2>Hi!</h2>
                        <p>Please find attached the CSV file.</p>
                    </body>
                </html>
            `,
      attachments: [
        {
          filename: "data.csv",
          content: fs.createReadStream("data.csv"),
        },
      ],
    };

    const res = await transporter.sendMail(mailOptions);
    console.log("Email sent Successfully", res);

    fs.unlinkSync("data.csv");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMail };
