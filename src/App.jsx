import { useState, useEffect } from "react";
import Quran from "./assets/quran.json";
import Bismillah from "./assets/bismillah2.png";
import RingLoader from "react-spinners/RingLoader";
import Footer from "./Footer";

function getAyahyNum(verse) {
    return String.fromCharCode("\uF500".charCodeAt(0) + verse - 1);
}

function App() {
    const [surah, setSurah] = useState();
    const [surahNum, setSurahNum] = useState();
    const [totalAyahs, setTotalAyahs] = useState(0);
    const [currAyah, setCurrAyah] = useState(-1);
    const [loading, setLoading] = useState(false);

    const nextAyah = () => {
        if (currAyah < totalAyahs) {
            setCurrAyah(currAyah + 1);
        }
    };

    const resetAyah = () => {
        setCurrAyah(0);
    };

    const changeSurah = async (e) => {
        setCurrAyah(0);
        setSurahNum(e.target.value);
        setTotalAyahs(Quran[e.target.value - 1]["total_verses"]);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch(
                `https://api.quran.com/api/v4/quran/verses/indopak?chapter_number=${surahNum}`
            );
            const newData = await response.json();
            setSurah(newData["verses"]);
            setLoading(false);
        };
        fetchData();
    }, [surahNum]);

    const buttonRowDisplay = (
        <div className=" flex flex-row justify-around">
            <button
                onClick={() => {
                    setCurrAyah(Math.max(currAyah - 1, 0));
                }}
                className=" btn btn-primary mb-4 mx-2"
            >
                Previous
            </button>
            <button onClick={resetAyah} className=" btn btn-error mb-4 mx-2">
                Reset
            </button>
            <button
                onClick={() => {
                    setCurrAyah(totalAyahs);
                }}
                className=" btn btn-info mb-4 mx-2"
            >
                Reveal All
            </button>
        </div>
    );

    function surahDisplay() {
        return (
            <div
                dir="rtl"
                className=" text-center border-2 border-dotted border-primary rounded-3xl p-5 bg-secondary mx-6 mb-6"
                onClick={nextAyah}
            >
                {surah.map((verse, idx) => {
                    return (
                        <span
                            key={verse["id"]}
                            className={` text-3xl font-indo leading-loose tracking-normal my-5 px-1  ${
                                idx + 1 > currAyah ? "blur-[7px]" : ""
                            }`}
                            dir="rtl"
                        >
                            {verse["text_indopak"] + getAyahyNum(idx + 1)}
                        </span>
                    );
                })}
            </div>
        );
    }

    return (
        <div className=" max-w-screen-sm md:mx-auto">
            <div className="navbar-center text-center bg-base-300 py-4 m-4 rounded-3xl">
                <button className="btn btn-ghost normal-case text-5xl font-indo">
                    Qur'an Helper
                </button>
            </div>

            <div className="App flex flex-col items-center ">
                <select
                    onChange={changeSurah}
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
                {currAyah > -1 && buttonRowDisplay}
                {currAyah > -1 &&
                    (loading ? (
                        <RingLoader
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    ) : (
                        surahDisplay()
                    ))}
                {currAyah === -1 && (
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

            <Footer />
        </div>
    );
}

export default App;
