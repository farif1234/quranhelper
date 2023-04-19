import { useState, useEffect } from "react";
import Quran from "./assets/quran.json";
import Bismillah from "./assets/bismillah2.png";

function getAyahyNum(verse) {
    return String.fromCharCode("\uF500".charCodeAt(0) + verse - 1);
}

function App() {
    const [surah, setSurah] = useState(Quran[0]);
    const [blurState, setBlurState] = useState([]);
    const [currAyah, setCurrAyah] = useState(-1);

    const nextAyah = () => {
        if (currAyah < blurState.length) {
            blurState[currAyah] = false;
            setBlurState(blurState);
            setCurrAyah(currAyah + 1);
            console.log(blurState);
        }
    };

    const resetAyah = () => {
        setCurrAyah(0);
        setBlurState(new Array(blurState.length).fill(true));
    };
    console.log(Quran);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         console.log(Quran[113]);
    //         const response = await fetch(
    //             `https://api.quran.com/api/v4/quran/verses/indopak?chapter_number=102`
    //         );
    //         const newData = await response.json();
    //         console.log(newData);
    //         setAyah(newData["verses"]);
    //     };
    //     fetchData();
    // }, []);

    return (
        <div className=" max-w-screen-sm md:mx-auto">
            <div className="navbar-center text-center bg-base-300 py-4 m-4 rounded-3xl">
                <nutton className="btn btn-ghost normal-case text-5xl font-indo">
                    Qur'an Helper
                </nutton>
            </div>

            <div className="App flex flex-col items-center ">
                <select
                    onChange={(e) => {
                        setCurrAyah(0);
                        setSurah(Quran[e.target.value - 1]);
                        setBlurState(
                            new Array(
                                Quran[e.target.value - 1]["total_verses"]
                            ).fill(true)
                        );
                    }}
                    className="select w-full max-w-xs bg-secondary rounded-lg my-5 mb-14"
                >
                    <option disabled selected>
                        Choose Surah
                    </option>
                    {Quran.map(({ id, name, transliteration }) => {
                        return (
                            <option value={id} key={id}>
                                {id}. {transliteration}, {name}
                            </option>
                        );
                    })}
                </select>
                <div className=" mb-10">
                    <img
                        className=" object-scale-down object-center  h-16 w-64"
                        src={Bismillah}
                    ></img>
                </div>
                {currAyah > -1 && (
                    <div className=" flex flex-row justify-around">
                        <button
                            onClick={() => {
                                setCurrAyah(Math.max(currAyah - 1, 0));
                            }}
                            className=" btn btn-primary mb-4 mx-2"
                        >
                            Previous
                        </button>
                        <button
                            onClick={resetAyah}
                            className=" btn btn-error mb-4 mx-2"
                        >
                            Reset
                        </button>
                    </div>
                )}
                {currAyah > -1 && (
                    <div
                        dir="rtl"
                        className=" text-center border-2 border-dotted border-primary rounded-3xl p-5 bg-secondary mx-6 mb-6"
                        onClick={nextAyah}
                    >
                        {surah["verses"].map((verse, idx) => {
                            const verse_num = verse["id"];
                            // console.log(verse_num);
                            return (
                                <span
                                    key={verse["id"]}
                                    // className=" text-3xl font-indo leading-loose my-5 px-3 "
                                    className={` text-3xl font-indo leading-loose tracking-normal my-5 px-1  ${
                                        idx + 1 > currAyah ? "blur-sm" : ""
                                    }`}
                                    dir="rtl"
                                >
                                    {verse["text"] + getAyahyNum(verse_num)}
                                </span>
                            );
                        })}
                    </div>
                )}
                {currAyah == -1 && (
                    <div className=" my-5 p-6">
                        <h1 className=" text-4xl font-indo text-center">
                            How To Use:
                        </h1>
                        <p className=" text-2xl font-indo text-center my-10">
                            1) Choose Surah above.
                        </p>
                        <p className=" text-2xl font-indo text-center">
                            2) While reciting, tap text to reveal next ayah.
                        </p>
                    </div>
                )}
                <p dir="rtl" className=" font-indo m-0 text-5xl"></p>
            </div>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-10 mb-4">
                <div>
                    <p>Created by Faihaan Arif</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
