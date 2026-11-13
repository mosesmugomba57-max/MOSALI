import { useEffect, useRef, useState } from 'react';
import { downloads } from '../../data/downloads';
import { DownloadCard } from '../../components/downloads/DownloadCard/DownloadCard';

export function Downloads() {

    // HAPA tunaweka downloads kwenye state
    const [downloadList, setDownloadList] = useState(downloads);
    const[activeMenu, setActiveMenu] = useState(null);
    const pageRef = useRef(null);
    useEffect(() => {

    function handleClickOutside(event) {

        // Uki-click sehemu ambayo SI button ya ⋮
        if (!event.target.closest(".menu-button")) {
            setActiveMenu(null);
        }

    }

    document.addEventListener("click", handleClickOutside);

    return () => {
        document.removeEventListener("click", handleClickOutside);
    };

}, []);

    // HII function itafute movie
    function handleDelete(id) {
        setDownloadList(current =>
            current.filter(download => download.id !== id)
        );
        setActiveMenu(null);
    }

    return (

        <div 
        ref={pageRef}
        className="min-h-screen bg-black px-8 pb-10 pt-24">

            <h1 className="text-4xl font-bold text-white mb-8">
                My Downloads
            </h1>

            <div className="space-y-5">

                {downloadList.map((download) => (

                    <DownloadCard
                        key={download.id}
                        download={download}
                        onDelete={handleDelete}
                        activeMenu={activeMenu}
                        setActiveMenu={setActiveMenu}
                    />

                ))}

            </div>

        </div>

    );

}