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

    function processImage() {
        if (!image_id) return;

        let data = {
            image_id: image_id,
            hue_min: $('#hue-min').val(),
            hue_max: $('#hue-max').val(),
            saturation_min: $('#saturation-min').val(),
            saturation_max: $('#saturation-max').val(),
            value_min: $('#value-min').val(),
            value_max: $('#value-max').val(),
            dilate: $('#dilate').is(':checked'),
            dilate_number: $('#dilate-number').val()
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
    }

    $('#hue-min, #hue-max, #saturation-min, #saturation-max, #value-min, #value-max').on('input', processImage);
    $('#dilate').on('change', function() {
        if ($(this).is(':checked')) {
            $('#dilate-options').show();
        } else {
            $('#dilate-options').hide();
        }
        processImage();
    });
    $('#dilate-number').on('input', processImage);
});
