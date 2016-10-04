function clearImage() {

}
$(function() {

    // Create the preview image
    $('body').on('change',".image-preview-input input:file",function (){
        var img = $('#dynamic');
        var file = this.files[0];
        var reader = new FileReader();

        // Set preview image into the popover data-content
        reader.onload = function (e) {
            $(".image-preview-filename").val(file.name);
            if(file.size>3000000){
                $(".previewMsg").html("حجم الصورة كبير جدا");
            }else{
                $('.previewMsg').html("");
                img.attr('src', e.target.result);
            }
        };
        reader.readAsDataURL(file);
    });
});
