import React from 'react';

export default function FreindContaiter() {
    return (
        <div className="w-5/6 mb-4">
            <div
                className="
        flex 
       
        h-20
        rounded-xl border-2
        border-slate-400
        flex-row
        justify-around
        "
            >
                <div
                    id="profile-image-container"
                    className="flex items-center "
                >
                    <img
                        className="h-16 w-16  object-cover rounded-full"
                        src="https://i.namu.wiki/i/23IWDVBFIP9J3Gi288Tm_N_Ji-gxLuVuH0ti2BxMPx90ScamKjClMqSwUalYYRoOAjDrBj5rQy7RDF9H9td7LA.webp"
                        alt="profile"
                    />
                </div>
                <div
                    id="profile-info-container"
                    className="flex flex-col justify-center"
                >
                    <div className="flex flex-col ">
                        <div className="flex">여기는 닉네임</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
