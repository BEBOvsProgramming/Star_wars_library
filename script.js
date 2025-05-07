
let select = document.querySelector(".select-name")
let selectType = document.querySelector(".select-type")
let image = document.querySelector(".image")
let discription = document.querySelector(".discription")
let download = document.querySelector(".link-holder")


try {

    selectType.addEventListener("change", (e) => {
        let content = e.target.value
        let api = `https://starwars-databank-server.vercel.app/api/v1/${content}`
        get(api)
    })

    async function get(api) {
        const response = await fetch(api)
        console.log(api)
        const data = await response.json()
        console.log(data)
        select.innerHTML = "" // Clear previous options

        for (let opj of data.data) {
            let option = document.createElement("option")
            option.innerText = opj.name
            option.value = opj.name
            select.appendChild(option)

            const infnite = document.createElement("div")
            infnite.classList.add("infnite")
            const listt = document.createElement("ul")
            const list1 = document.createElement("li")
            const list2 = document.createElement("li")
            let image = document.createElement("img")

            image.src = opj.image
            list1.innerText = opj.name
            list2.innerText = opj.description
            listt.appendChild(list1)
            listt.appendChild(list2)
            infnite.appendChild(image)
            infnite.appendChild(listt)
            document.querySelector(".infnite-container").appendChild(infnite)
        }
        showAndDownload(data.data)
    }

} catch (error) {
    console.log(error)
}

function showAndDownload(data) {
    select.addEventListener("change", async (e) => {
        let selected = data.find((item) => item.name === e.target.value);
        image.src = selected.image;
        discription.innerText = selected.description;
        image.style = ""
        download.style.display = "none"


        // Fetch the image and create a blob
        const response = await fetch(selected.image);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        // Update the download link
        const downloadLink = document.querySelector(".download");
        downloadLink.href = blobUrl; // Use the blob URL
        downloadLink.download = "image.jpg"; // Set the default filename
        mega(image)
    });
}

function mega(image) {
    image.addEventListener("click", function () {
        image.style.width = "100vw"; // Full width of the viewport
        image.style.height = "85vh"; // Full height of the viewport
        setTimeout(() => {
            download.style.display = "block"
        }, 1000)
    })
}



