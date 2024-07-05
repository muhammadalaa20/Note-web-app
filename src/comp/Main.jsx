import { useState } from "react";
import { nanoid } from "nanoid"
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
export default function Main() {
    const [notes, setNotes] = useState([])
    const [index, setIndex] = useState(-1)
    const [noteData, setNoteData] = useState(
        {
            title: "",
            content: "",
        }
    )

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setNoteData(prevNoteData => {
            return {
                ...prevNoteData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (!noteData.title || !noteData.content) {
            alert("Please fill in the field");
            return;
        }
        if (index === -1) {
            setNotes(prevNotes => { return [...prevNotes, noteData] })
        } else {
            const newNotes = [...notes]
            newNotes[index] = {
                title: noteData.title,
                content: noteData.content,
            };
            setNotes(newNotes)
            setIndex(-1)
        }
        setNoteData({
            title: "",
            content: "",
        })
    }

    const deleteNote = (id) => {
        setNotes((prevValues) => prevValues.filter((_, index) => index !== id));
    };

    const EditNote = (id) => {
        setIndex(id);
        setNoteData({
            title: notes[id].title,
            content: notes[id].content
        });
    };

    return (
        <>
            <div className="main flex flex-col w-full min-h-screen dark:bg-slate-800 dark:text-white">
                <div className="notes flex flex-wrap flex-auto gap-5 p-5">
                    <form action="" className="create--note flex flex-col  p-4 w-full items-center justify-start gap-4">
                        <input type="text"
                            name="title"
                            id="title"
                            className="border-2 p-2 xl:w-1/2 lg:w-1/2 w-full rounded-2xl dark:text-black"
                            value={noteData.title}
                            onChange={handleChange}
                            placeholder="Title"
                        />

                        <textarea
                            name="content"
                            id="content"
                            cols="30"
                            rows="5"
                            className="border p-2 xl:w-1/2 lg:w-1/2 w-full rounded-2xl dark:text-black"
                            value={noteData.content}
                            onChange={handleChange}
                            placeholder="Take a note..."
                        />
                        <button className="btn p-2 text-3xl hover:scale-110 relative -top-10 dark:text-slate-400" onClick={handleSubmit}>{index === -1 ? <FaRegSquarePlus /> : <BiSolidEdit />}</button>
                    </form>

                    {notes && notes.map((note, index) => {
                        return (
                            <div className="note flex flex-col bg-slate-400 p-3 min-w-[220px] h-auto" key={nanoid()}>
                                <div className="note--header flex justify-between items-center">
                                    <h1 className="title text-3xl bg- ">{note.title}</h1>
                                    <button className="btn p-2 text-3xl hover:scale-110" onClick={() => deleteNote(index)}><FaTimes /></button>
                                </div>
                                <div className="note--body flex justify-between items-center">
                                    <p className="content">{note.content}</p>
                                    <button className="btn p-2 text-3xl hover:scale-110" onClick={() => EditNote(index)}><BiSolidEdit /></button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}