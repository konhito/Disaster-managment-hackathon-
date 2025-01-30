import express from "express";
import twilio from "twilio";
import cors from "cors";
import nodemailer from "nodemailer";
const app = express();

const port = 3000;
app.use(express.json());
app.use(cors());

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "arvindshahi555@gmail.com",
    pass: "iiek cjyi talz jmfy",
  },
});

const recipients = [
  "wasteartgallery@gmail.com",
  "arvindshahi555@gmail.com",
  "konhito0@gmail.com",
  "sanvikumari19@gmail.com",
];

async function main() {
  try {
    const info = await transporter.sendMail({
      from: '"Arvind Shahi" <arvindshahi555@gmail.com>',
      to: recipients.join(","),
      subject: "Verification",
      text: "OTP for the verification",
      html: `<p>Click the button below to verify:</p>
             <a href="https://your-verification-link.com" 
                style="background-color: blue; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                Click Here to Verify
             </a>`,
    });

    console.log("✅ Email sent successfully to:", recipients);
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const client = twilio(
  "AC166fb3a3223ba9baae80dc3ceb7d10e6",
  "6f30d2fc18e7a2dc49cbef89dad99ef0"
);

app.post("/send-sms", async (req, res) => {
  try {
    const { location } = req.body;
    main();
    const response = await client.messages.create({
      body: `Emergency! I need help at this location: ${location}`,
      from: "+18154860916",
      to: "+919399885012",
    });
    res.status(200).json({ message: "Message sent", sid: response.sid });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Define multiple recipients
