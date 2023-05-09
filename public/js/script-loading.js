const loadScript = (FILE_URL, async = true, type = "text/javascript") => {
    return new Promise((resolve, reject) => {
        try {
            const scriptEle = document.createElement("script");
            scriptEle.type = type;
            scriptEle.async = async;
            scriptEle.src = FILE_URL;
            scriptEle.id = FILE_URL;

            scriptEle.addEventListener("load", (ev) => {
                resolve({status: true});
            });

            scriptEle.addEventListener("error", (ev) => {
                reject({
                    status: false,
                    message: `Failed to load the script ${FILE_URL}`
                });
            });

            // document.getElementById("additional-script").innerHTML = "";
            // document.getElementById("additional-script").appendChild(scriptEle);
            document.body.appendChild(scriptEle);
        } catch (error) {
            reject(error);
        }
    });
};
