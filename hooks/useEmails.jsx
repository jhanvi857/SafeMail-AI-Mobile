import { useEffect, useState, useRef } from "react";

export function useEmails() {
  const [emails, setEmails] = useState([]);
  const notifiedIds = useRef(new Set());

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await fetch("http://localhost:3000/predict-emails/emails", {
          method: "GET",
          credentials: "include", 
        });
        const data = await res.json();

        const emailList = Array.isArray(data) ? data : data.emails ?? [];

        setEmails(emailList);

        emailList.forEach((e) => {
          if (!notifiedIds.current.has(e.id)) {
            if (
              "Notification" in window &&
              Notification.permission === "granted"
            ) {
              new Notification(`New email: ${e.subject}`, {
                body: `Prediction: ${e.ml.label}`,
              });
            }
            notifiedIds.current.add(e.id);
          }
        });
      } catch (err) {
        console.error("Failed to fetch emails:", err);
      }
    };

    Notification.requestPermission();
    fetchEmails();
    const interval = setInterval(fetchEmails, 15000);

    return () => clearInterval(interval);
  }, []);

  return emails;
}
