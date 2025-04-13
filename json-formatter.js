console.log("Json Formatter...");
const main = async () => {
    try {
        const res = await fetch(window.location.href);
        const cloneResponse= await res.clone();
        const resContnentType = cloneResponse.headers.get("Content-Type");
        if(! resContnentType.includes("application/json")){
            return;
        }
        const result = JSON.stringify(await res.json(), null, 2);
        const prettyJson = `<pre style="white-space: pre-wrap; word-wrap: break-word;">${result}</pre>`;
        document.body.innerHTML = prettyJson;
        // return ;

    } catch (err){
        console.log(err);
    }
}

main();




