$(document).ready(function() {
    //Thumbnailer.config.shaderOpacity = 1;
    var tn1 = $('.mygallery').tn3({
        skinDir:"skins",
        imageClick:"fullscreen",
        image:{
        maxZoom:1.5,
        crop:true,
        clickEvent:"dblclick",
        transitions:[{
                type:"blinds"
            },{
                type:"grid"
            },{
                type:"grid",
                duration:460,
                easing:"easeInQuad",
                gridX:1,
                gridY:8,
                // flat, diagonal, circle, random
                sort:"random",
                sortReverse:false,
                diagonalStart:"bl",
                // fade, scale
                method:"scale",
                partDuration:360,
                partEasing:"easeOutSine",
                partDirection:"left"
            }]
        }
    });
});