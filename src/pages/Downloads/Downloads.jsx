
import { useEffect, useState } from "react";
import { downloads } from "../../data/downloads";
import { DownloadCard } from "../../components/downloads/DownloadCard/DownloadCard";

export function Downloads() {

    const [downloadList, setDownloadList] = useState(downloads);

    const [activeMenu, setActiveMenu] = useState(null);

    // Close menu when clicking outside
    useEffect(() => {

        function handleClickOutside(event) {

            if (!event.target.closest(".menu-button")) {
                setActiveMenu(null);
            }

        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };

    }, []);

    // Delete download
    function handleDelete(id) {

        setDownloadList(current =>
            current.filter(download => download.id !== id)
        );

        setActiveMenu(null);
    }

    return (

        <div className="min-h-screen bg-black px-8 py-10">

            <h1 className="text-4xl font-bold text-white mb-8">
                My Downloads
            </h1>

            {downloadList.length === 0 ? (

                <div className="text-center py-20">

                    <h2 className="text-2xl text-white font-bold">
                        No Downloads Yet
                    </h2>

                    <p className="text-gray-400 mt-3">
                        Your downloaded movies will appear here.
                    </p>

                </div>

            ) : (

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

            )}

        </div>

    );

}
