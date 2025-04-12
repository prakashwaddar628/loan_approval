export default function Footer() {
    return (
      <footer className="bg-gray-100 text-center py-6 mt-40 text-gray-600 text-sm shadow-inner bottom-0">
        <p>
          &copy; {new Date().getFullYear()} <span className="font-semibold text-blue-600">Loan Approval System</span>. All rights reserved.
        </p>
      </footer>
    );
  }
  