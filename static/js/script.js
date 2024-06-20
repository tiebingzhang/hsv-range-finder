$(document).ready(function() {
    let image_id = null;

    $('#upload-form').on('submit', function(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('file', $('#image')[0].files[0]);

        $.ajax({
            url: '/upload',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                image_id = response.image_id;
                $('#original-image').attr('src', '/uploads/' + image_id + '.png');
            }
        });
    });

    $('#process-form').on('submit', function(e) {
        e.preventDefault();
        let data = {
            image_id: image_id,
            hue_min: $('#hue-min').val(),
            hue_max: $('#hue-max').val(),
            saturation_min: $('#saturation-min').val(),
            saturation_max: $('#saturation-max').val(),
            value_min: $('#value-min').val(),
            value_max: $('#value-max').val(),
            dilate: $('#dilate').is(':checked')
        };

        $.ajax({
            url: '/process',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                $('#masked-image').attr('src', response.masked_image_url);
            }
        });
    });
});
