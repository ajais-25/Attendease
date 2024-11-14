import React, { useState, useRef } from "react";
import { Check, Paperclip, Search, X } from "lucide-react";


export default function AdminDashboard() {
  const [notice, setNotice] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const fileInputRef = useRef < HTMLInputElement > null;

  const handleSubmit = () => {
    setIsDialogOpen(true);
  };

  const handleSend = () => {
    setIsDialogOpen(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    setNotice("");
  };

  const handleAttachment = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Space for sidebar */}
      <div className="w-64 bg-white border-r" />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">
              Proff. Dr. Moumita Chakraborty
            </h1>
            <p className="text-sm text-gray-600">Admin (HOD_CST-CSIT)</p>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Quick Search..."
              className="w-full pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                Notify Students
                <span className="text-gray-400">✎</span>
              </h2>

              <textarea
                placeholder="Enter text......"
                className="w-full min-h-[300px] p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
              />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    multiple
                    accept=".pdf,image/*"
                  />
                  <button
                    onClick={handleAttachment}
                    className="p-2 border rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <span className="text-sm text-gray-600">Attach files</span>
                </div>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Check className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Confirmation Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold mb-2">
                Confirm your notice
              </h3>
              <p className="text-gray-600 mb-4">
                Please review your notice before sending it to the students.
              </p>
              <div className="mt-4 p-4 rounded-lg bg-gray-100 max-h-60 overflow-y-auto">
                {notice || "No content"}
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={handleSend}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {showAlert && (
          <div className="fixed bottom-4 right-4 w-96 bg-white border rounded-lg shadow-lg p-4">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <div>
                <h4 className="font-semibold">Success</h4>
                <p className="text-sm text-gray-600">
                  Your notice has been sent to the students.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
