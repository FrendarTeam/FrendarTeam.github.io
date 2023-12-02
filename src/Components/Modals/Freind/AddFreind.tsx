import React from 'react';

export default function AddFreind() {
    const submitFreindCode = async () => {};

    return (
        <div className="flex justify-center items-center w-full">
            <div className="flex  justify-around w-full">
                <input
                    name="code"
                    className=" border-4 rounded-xl	border-slate-300 w-3/5	"
                />
                <div className="border-2 w-16 h-10 flex justify-center rounded-xl">
                    <button onClick={() => submitFreindCode()}>검색</button>
                </div>
            </div>
        </div>
    );
}
