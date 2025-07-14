import Navbar from "@/components/layout/Navbar";
import "../styles/globals.css";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
