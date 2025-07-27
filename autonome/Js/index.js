function scrollX()
{
    const containers = document.querySelectorAll('.scroll-x');

    containers.forEach(container => {
        container.addEventListener('wheel', function (e) {
        if (e.deltaY !== 0) {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        }
        }, { passive: false });
    });
}

async function LoadGalleries()
{
    const galleries = document.querySelectorAll('.gallery');

    for (const gallery of galleries) {
        await LoadGallery(gallery);
    }
}

async function LoadGallery(gallery)
{
    const MaxTry = 5;
    var Try = 0;
    var count = 1;

    while (Try != MaxTry)
    {
        console.log(' ddd ', count, Try);

        try {

            const response = await fetch(`Galleries/${gallery.getAttribute('gallery')}/Photo_${count}/photo.jpg`);

            if (response.ok) {
                console.log('Le fichier existe !');

                const photo = document.createElement('div');
                
                const img   = document.createElement('img');
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                img.src = imageUrl;

                const div   = document.createElement('div');

                const span  = document.createElement('span');
                span.textContent = await (await fetch(`Galleries/${gallery.getAttribute('gallery')}/Photo_${count}/text.txt`)).text();
                div.appendChild(span);

                gallery.appendChild(photo);

                if (count % 2 == 1)
                {
                    photo.appendChild(img);
                    photo.appendChild(div);
                } else {
                    photo.appendChild(div);
                    photo.appendChild(img);
                }

                Try = 0;
            } else {
                console.log('Le fichier n\'existe pas.');

                Try += 1;
            }
        } catch (error) {
            console.log('Erreur réseau');
            Try += 1;
        }

        count += 1;
    }
}

window.addEventListener('load',async function () {
    scrollX();
    LoadGalleries();
})