import React, { useState } from "react";
import { Bell, Calendar, Plus, X } from "lucide-react";
import { Button } from "../components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/Dialog";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Dashboard() {
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  const getColor = (score) => {
    if (score >= 75) return "#4CAF50"; // Green for scores >= 75%
    if (score >= 50) return "#FFC107"; // Yellow for scores between 50% and 74%
    return "#F44336"; // Red for scores < 50%
  };

  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return { day, month, year };
  };

  const handleSaveNote = () => {
    if (note.trim()) {
      const newNote = { id: Date.now().toString(), text: note };
      setSavedNotes([...savedNotes, newNote]);
      setNote("");
      setIsAddNoteOpen(false);
    }
  };

  const handleDeleteNote = (id) => {
    setSavedNotes(savedNotes.filter((note) => note.id !== id));
  };

  const handleDeleteExam = () => {
    console.log("Exam deleted");
  };

  return (
    <div className="flex h-[100vh] w-[64vw] ml-64 bg-[#E8EBF8]">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 overflow-y-auto">
        <div className="flex items-center justify-between bg-white rounded-lg p-4">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <div className="flex flex-col items-end">
              <h3 className="font-medium">Swapnamoy Midya</h3>
              <p className="text-sm text-muted-foreground">Student</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <p className="text-base font-semibold">Percentage</p>
                <p className="text-sm font-semibold text-gray-500">Present</p>
              </div>
              <div className="h-16 w-16 relative">
                <CircularProgressbar
                  value={72}
                  text={`${72}%`}
                  styles={buildStyles({
                    pathColor: getColor(72),
                    textColor: getColor(72),
                    trailColor: "#e0e0e0",
                  })}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col space-y-2">
              <p className="text-base font-semibold">Number of days present</p>
              <p className="text-2xl font-bold text-red-500">32/44</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="bg-white p-6 rounded-lg shadow col-span-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <h3 className="text-xl font-semibold">Today:</h3>
              </div>
              <div className="space-y-1">
                <h2 className="text-3xl font-bold text-[#4B5EAA]">
                  {getCurrentDate().day}th
                </h2>
                <h2 className="text-3xl font-bold text-[#4B5EAA]">
                  {getCurrentDate().month.toUpperCase()}
                </h2>
                <h2 className="text-3xl font-bold text-[#4B5EAA]">
                  {getCurrentDate().year}
                </h2>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow col-span-3">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <h3 className="text-xl font-semibold">Notifications:</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">New message unread</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Dr. Moumita Chakraborty
                      </p>
                      <p className="text-sm text-gray-500">16 Oct</p>
                    </div>
                    <Button className="px-0.5 py-0.5 text-xs w-min">
                      Mark as read
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    All project groups are instructed to show their project
                    updates before 30th October positively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="space-y-10">
            <h3 className="text-xl font-semibold">Upcoming Classes:</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-4 rounded-lg border p-4">
                <div className="h-12 w-12 rounded bg-pink-100 flex items-center justify-center text-pink-600">
                  lc
                </div>
                <div>
                  <p className="font-medium">AI/ML Lab</p>
                  <div className="flex space-x-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
                    <span className="inline-block h-2 w-2 rounded-full bg-yellow-500" />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 rounded-lg border p-4">
                <div className="h-12 w-12 rounded bg-purple-100 flex items-center justify-center" />
                <div>
                  <p className="font-medium">Theory Of Computation</p>
                  <div className="flex space-x-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-yellow-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed top-0 right-0 w-[300px] h-screen bg-white p-4 border-l">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
            <div className="text-center">
              <h3 className="font-medium">Swapnamoy Midya</h3>
              <p className="text-sm text-gray-500">Student</p>
            </div>
            <button
              onClick={() => setIsAddNoteOpen(true)}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Note
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <h3 className="text-xl font-semibold">Notes:</h3>
          <div className="space-y-2">
            {savedNotes.map((note) => (
              <div
                key={note.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <p className="text-sm">{note.text}</p>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isAddNoteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Note</h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full h-32 p-2 border rounded-md mb-4"
              placeholder="Enter your note here..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsAddNoteOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
