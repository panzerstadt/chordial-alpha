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
    <div className="flex justify-end w-full ">
      {notesBeingPlayed.map((noteOrChord: Note | Note[], i) => {
        if (Array.isArray(noteOrChord)) {
          // chord
          return (
            <p
              className={`px-3 border-l-2 ${i === 0 && "border-blue-500"}`}
              key={"chord" + i}
            >
              {noteOrChord.map((notes) => (
                <span className="mr-2 text-gray-700">{notes.name}</span>
              ))}
            </p>
          );
        }

        return <p key={i}>{noteOrChord.name}</p>;
      })}
    </div>
  );
};
