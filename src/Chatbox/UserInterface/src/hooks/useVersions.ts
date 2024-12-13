
import { useEffect, useState } from "react";
import { getVersionLocal, getVersions } from "@/service/Versions";

const useVersions = () => {
    const [versions, setVersions] = useState({
        version: "",
        description: "",
        isNewVersion: false
    });

    useEffect(() => {
        checkVersion();
    }, []);

    async function checkVersion() {
        const localVersion = await getVersionLocal();
        const serverVersion = await getVersions();

        if (localVersion.data !== serverVersion.version) {
            setVersions({
                version: serverVersion.version,
                description: serverVersion.description,
                isNewVersion: true,
            })
        } else {
            setVersions({
                version: serverVersion.version,
                description: serverVersion.description,
                isNewVersion: true,
            })
        }

    }

    return versions;
}

export default useVersions;