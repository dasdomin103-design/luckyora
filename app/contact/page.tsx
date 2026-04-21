export default function Contact() {
  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>

      <p className="mb-2">
        Email:
        <a href="mailto:luckyoralive@gmail.com" className="text-blue-400 ml-2">
          luckyoralive@gmail.com
        </a>
      </p>

      <p className="mb-4">
        Phone:
        <a href="tel:+918369372112" className="text-blue-400 ml-2">
          +91 8369372112
        </a>
      </p>

      <p className="text-gray-400">
        We usually respond within 24–48 hours.
      </p>
    </div>
  );
}
