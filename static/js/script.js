$(document).ready(function() {
    let image_id = null;

    // Initialize noUiSlider for Hue
    let hueSlider = document.getElementById('hue-range');
    noUiSlider.create(hueSlider, {
        start: [0, 179],
        connect: true,
        step: 1, // Ensure the slider moves in whole number increments
        range: {
            'min': 0,
            'max': 179
        },
        format: {
            to: function(value) {
                return Math.round(value);
            },
            from: function(value) {
                return Math.round(value);
            }
        }
    });
    hueSlider.noUiSlider.on('update', function(values, handle) {
        $('#hue-value').text(`Hue: ${values[0]} - ${values[1]}`);
        processImage();
    });

    // Initialize noUiSlider for Saturation
    let saturationSlider = document.getElementById('saturation-range');
    noUiSlider.create(saturationSlider, {
        start: [0, 255],
        connect: true,
        step: 1, // Ensure the slider moves in whole number increments
        range: {
            'min': 0,
            'max': 255
        },
        format: {
            to: function(value) {
                return Math.round(value);
            },
            from: function(value) {
                return Math.round(value);
            }
        }
    });
    saturationSlider.noUiSlider.on('update', function(values, handle) {
        $('#saturation-value').text(`Saturation: ${values[0]} - ${values[1]}`);
        processImage();
    });

    // Initialize noUiSlider for Value
    let valueSlider = document.getElementById('value-range');
    noUiSlider.create(valueSlider, {
        start: [0, 255],
        connect: true,
        step: 1, // Ensure the slider moves in whole number increments
        range: {
            'min': 0,
            'max': 255
        },
        format: {
            to: function(value) {
                return Math.round(value);
            },
            from: function(value) {
                return Math.round(value);
            }
        }
    });
    valueSlider.noUiSlider.on('update', function(values, handle) {
        $('#value-value').text(`Value: ${values[0]} - ${values[1]}`);
        processImage();
    });

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
                $('#original-image').attr('src', '/uploads/' + image_id + '.png?' + new Date().getTime());
                console.log('Original image URL:', '/uploads/' + image_id + '.png?' + new Date().getTime());
                processImage(); // Automatically process the image after upload
            }
        });
    });

    function processImage() {
        if (!image_id) return;

        let hue_values = hueSlider.noUiSlider.get();
        let saturation_values = saturationSlider.noUiSlider.get();
        let value_values = valueSlider.noUiSlider.get();

        let data = {
            image_id: image_id,
            hue_min: Math.round(hue_values[0]),
            hue_max: Math.round(hue_values[1]),
            saturation_min: Math.round(saturation_values[0]),
            saturation_max: Math.round(saturation_values[1]),
            value_min: Math.round(value_values[0]),
            value_max: Math.round(value_values[1]),
            dilate: $('#dilate').is(':checked'),
            dilate_number: $('#dilate-number').val()
        };

        $.ajax({
            url: '/process',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                $('#masked-image').attr('src', response.masked_image_url + '?' + new Date().getTime());
                $('#mask-image').attr('src', response.mask_image_url + '?' + new Date().getTime()); // Add mask image for debugging
                console.log('Masked image URL:', response.masked_image_url + '?' + new Date().getTime());
                console.log('Mask image URL:', response.mask_image_url + '?' + new Date().getTime());
            }
        });
    }

    $('#dilate').on('change', function() {
        if ($(this).is(':checked')) {
            $('#dilate-options').show();
        } else {
            $('#dilate-options').hide();
        }
        processImage();
    });

    $('#dilate-number').on('input', function() {
        $('#dilate-number-value').text($(this).val());
        processImage();
    });
});
