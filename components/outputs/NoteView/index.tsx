import { useState } from "react";
import { StepNoteType } from "reactronica";

export const useRecordNotes = (): [Note[], (note: StepNoteType[]) => void] => {
  const [notes, setNotes] = useState([]);

  const recordNotes = (newNote) => {
    setNotes((p) => [...p, newNote]);
  };
  return [notes, recordNotes];
};

type Note = { name: string };
export const NoteView = ({ notesBeingPlayed }) => {
  return (
    <div className="flex justify-end sm:w-full">
      {notesBeingPlayed.map((noteOrChord: Note[], i) => {
        const isLatest = notesBeingPlayed.length - 1 === i;

        return (
          <p
            className={`px-3 border-l-2 ${i === 0 && "border-blue-500"} ${
              isLatest ? "text-red-600" : "text-gray-600"
            }`}
            key={"chord" + i}
          >
            {noteOrChord.map((notes, j) => (
              <span className="mr-2" key={"note" + j}>
                {notes.name}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
};
