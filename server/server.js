import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { db } from "./firebaseConfig.js";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/send-email", async (req, res) => {
  const formData = req.body;

  // Destructure the form data
  const {
    fullName,
    email,
    phone,
    serviceType,
    otherService,
    brandDescription,
    deadline,
    brandName,
    deadlineDate,
    showcasePermission,
    additionalInfo,
  } = formData;

  // Basic email validation for the user's email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email address" });
  }

  try {
    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // Construct the email content
    const mailOptions = {
      from: `"Arwa Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // YOUR EMAIL
      subject: "New Book a Call Submission",
      text: `
You have a new enquiry submission:

Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Service Type: ${serviceType} ${
        serviceType === "other" ? `- ${otherService}` : ""
      }
Brand Description: ${brandDescription}
Deadline: ${deadline} ${deadline === "yes" ? `- ${deadlineDate}` : ""}
Brand Name: ${brandName}
Showcase Permission: ${showcasePermission}
Additional Info: ${additionalInfo}
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Notification email sent to you!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to send email",
        error: error.message,
      });
  }
});

app.get("/api/enquiries", async (req, res) => {
  try {
    const enquiriesRef = collection(db, "enquiries");
    const q = query(enquiriesRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const enquiries = [];
    snapshot.forEach((doc) => {
      enquiries.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
      });
    });

    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch enquiries",
        error: error.message,
      });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("/*", (req, res) =>
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
  );
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
