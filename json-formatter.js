
const getLengthOfObject = (obj) => Object.keys(obj).length;

const loopArray = (arr, parentNode) => {
    for (let i = 0; i < arr.length; i++) {
        const newNode = document.createElement('div');
        newNode.innerHTML = `<strong>${i}</strong>:`;
        parentNode.append(newNode);
        if (typeof arr[i] === "object" && !Array.isArray(arr[i])) {
            loopObject(arr[i], newNode);
        } else if (Array.isArray(arr[i])) {
            loopArray(arr[i], newNode);
        }
    }
    return parentNode;
}

const loopObject = (obj, parentNode) => {
    Object.keys(obj).forEach(key => {
        if(typeof obj[key] === "object" && ! Array.isArray(obj[key])) {
            const newNode = document.createElement('div');
            newNode.innerHTML = `<strong>${key}</strong>:`;
            parentNode.append(newNode);
            loopObject(obj[key], newNode);
        } else if(Array.isArray(obj[key])) {
            console.log(obj[key]);
            loopArray(obj[key], parentNode);
        } else {
            const newNode = document.createElement('div');
            (typeof obj[key] === 'string') ?
                    newNode.innerHTML = `<strong>${key}</strong>: "${obj[key]}"`
                :   newNode.innerHTML = `<strong>${key}</strong>: ${obj[key]}`
            parentNode.append(newNode);
        }

    })
    return parentNode;
}


const  generateHtml = (value) =>  {
    const root = document.createElement('span');
    if(typeof value === "object" && ! Array.isArray(value)){
        console.log("Object");
        return loopObject(value, root);
    } else if (Array.isArray(value)) {
        console.log("Array");
        return loopArray(value, root);
    }
}

const main = async () => {
    try {
        const res = await fetch(window.location.href);
        const cloneResponse= await res.clone();
        const resContnentType = cloneResponse.headers.get("Content-Type");
        if(! resContnentType.includes("application/json")){
            return;
        }
        const result = await res.json();
        const html = generateHtml(result);
        document.querySelector('pre').remove();
        document.querySelector('.json-formatter-container').remove();
        document.body.append(html);
    } catch (err){
        console.log(err);
    }
}

main();




