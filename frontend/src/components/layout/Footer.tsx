export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-auto">
      <div className="container mx-auto text-center text-sm font-light select-none">
        &copy; {new Date().getFullYear()} SparkBridge Store. All rights reserved. Designed & Developed by Ashkan Giveki.
      </div>
    </footer>
  );
}
