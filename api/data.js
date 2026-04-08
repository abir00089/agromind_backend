let sensorData = {
  soil_moisture: 0,
  temperature: 0,
  humidity: 0,
  ph: 0,
  pump: 1
};

export default function handler(req, res) {

  // 📥 RECEIVE DATA FROM ESP32
  if (req.method === "POST") {
    const { soil_moisture, temperature, humidity, ph, pump } = req.body;

    if (
      soil_moisture === undefined ||
      temperature === undefined ||
      humidity === undefined ||
      ph === undefined ||
      pump === undefined
    ) {
      return res.status(400).json({ error: "Missing fields" });
    }

    sensorData = {
      soil_moisture,
      temperature,
      humidity,
      ph,
      pump
    };

    console.log("📡 Data received:", sensorData);

    return res.status(200).json({
      message: "Data received successfully"
    });
  }

  // 📤 SEND DATA TO FRONTEND
  if (req.method === "GET") {
    return res.status(200).json(sensorData);
  }

  // ❌ METHOD NOT ALLOWED
  return res.status(405).json({ message: "Method not allowed" });
}
