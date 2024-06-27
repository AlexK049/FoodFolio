import pretzelImage from '../static/images/pretzel.png';
import notebook from '../static/images/notebook.png'

const Hud = ({ openNotes, title }) => {
    return (
        <div className="absolute h-full w-full top-0 left-0 pointer-events-none">
            <div className="absolute top-2 left-2 flex gap-2 items-center rounded-xl border-2 border-black py-1 px-2 bg-orange-100 shadow-lg">
                <img src={pretzelImage} className="w-10 h-10 object-cover" />
                <h1 className="text-2xl text-white font-bold text-zinc-800">{title}</h1>
            </div>
            <div className="absolute top-2 right-2">
                <button onClick={openNotes} className="bg-zinc-100 p-2 pointer-events-auto rounded-xl shadow-lg border-2 border-black hover:bg-zinc-200 ">
                    <img src={notebook} className="w-6 h-6" />
                </button>
            </div>
        </div>

    );
};

export default Hud;
