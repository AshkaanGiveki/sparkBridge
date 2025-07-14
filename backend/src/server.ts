import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`✅ Backend server is running at: http://localhost:${PORT}`);
});
