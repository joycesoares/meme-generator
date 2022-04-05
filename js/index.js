let topTextInput,topTextSize, bottomTextSize, bottomTextInput, imageInput, generateBtn, canvas, ctx;

function generateMeme(img, topTextInput, bottomTextInput, topTextSize, bottomTextSize) {
    let fontSize;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';

    fontSize = canvas.width * topTextSize;
    ctx.font = fontSize + 'px impact';
    ctx.lineWidth = fontSize / 20;

    ctx.textBaseline = 'top';
    topTextInput.split('\n').forEach(function (t,i){
        ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width)
        ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width)
    })

    fontSize = canvas.width * bottomTextSize;
    ctx.font = fontSize + 'px impact';
    ctx.lineWidth = fontSize / 20;

    ctx.textBaseline = 'bottom';
    bottomTextInput.split('\n').reverse().forEach(function (t,i){
        ctx.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width)
        ctx.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width)
    })
}   


function init() {
    topTextInput = document.getElementById('text-top');
    topTextSize = document.getElementById('top-text-size');
    bottomTextSize = document.getElementById('bottom-text-size');
    bottomTextInput = document.getElementById('text-bottom');
    imageInput = document.getElementById('image-load');
    generateBtn = document.getElementById('btn-generate');
    canvas = document.getElementById('meme-finish');

    ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 0;

    generateBtn.addEventListener('click', function() {
        let reader = new FileReader();

        if(document.getElementById("image-load").files.length == 0) {

            function hideLoadingDiv() {
                setTimeout(function() { 
                    let msgAlert = document.getElementById("msg-alert");
                    msgAlert.textContent += "Image cannot be empty";
                    msgAlert.classList.add('hidden');
                }, 10000);
              }

        } else {
            reader.onload = function(){
                let img = new Image;
                img.src = reader.result;
                generateMeme(img, topTextInput.value, bottomTextInput.value, topTextSize.value, bottomTextSize.value);
            }
            reader.readAsDataURL(imageInput.files[0]);
        }
        hideLoadingDiv();
    })
}

init();