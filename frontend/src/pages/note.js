import { StarRating } from "../components";

export const Note = ({ note }) => {
    return (
        <div className="bg-zinc-100 shadow-md rounded-lg p-6">
            <div className="font-bold text-xl mb-2">{note.restName}</div>
            <div className=" mb-2">{note.dish}</div>
            <StarRating size={5} rating={note.rating} readonly />
            <div className="text-sm mb-2">{note.date}</div>
            <div>{note.body}</div>
        </div>
    );
};

export default Note;
