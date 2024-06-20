from flask import Flask, request, jsonify, send_from_directory, render_template
import os
import cv2
import uuid
import numpy as np

app = Flask(__name__, static_folder='static', template_folder='templates')
UPLOAD_FOLDER = 'uploads'
PROCESSED_FOLDER = 'processed'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_image():
    file = request.files['file']
    if file:
        image_id = str(uuid.uuid4())
        filepath = os.path.join(UPLOAD_FOLDER, f'{image_id}.png')
        file.save(filepath)
        return jsonify({'image_id': image_id})
    return jsonify({'error': 'No file uploaded'}), 400

@app.route('/process', methods=['POST'])
def process_image():
    data = request.json
    image_id = data['image_id']
    hue_min = int(data['hue_min'])
    hue_max = int(data['hue_max'])
    saturation_min = int(data['saturation_min'])
    saturation_max = int(data['saturation_max'])
    value_min = int(data['value_min'])
    value_max = int(data['value_max'])
    dilate = data['dilate']
    dilate_number = int(data['dilate_number'])

    print(f'Processing image with ID: {image_id}')
    print(f'Hue range: {hue_min}-{hue_max}')
    print(f'Saturation range: {saturation_min}-{saturation_max}')
    print(f'Value range: {value_min}-{value_max}')
    print(f'Dilate: {dilate} with {dilate_number} iterations')

    filepath = os.path.join(UPLOAD_FOLDER, f'{image_id}.png')
    if not os.path.exists(filepath):
        return jsonify({'error': 'Image not found'}), 404

    image = cv2.imread(filepath)
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    # Ensure the correct bounds
    lower_bound = np.array([hue_min, saturation_min, value_min])
    upper_bound = np.array([hue_max, saturation_max, value_max])
    mask = cv2.inRange(hsv, lower_bound, upper_bound)

    if dilate:
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
        for _ in range(dilate_number):
            mask = cv2.dilate(mask, kernel)

    result = cv2.bitwise_and(image, image, mask=mask)

    # Save the mask for debugging
    mask_filepath = os.path.join(PROCESSED_FOLDER, f'{image_id}_mask.png')
    cv2.imwrite(mask_filepath, mask)

    processed_filepath = os.path.join(PROCESSED_FOLDER, f'{image_id}.png')
    cv2.imwrite(processed_filepath, result)
    
    return jsonify({
        'original_image_url': f'/uploads/{image_id}.png',
        'masked_image_url': f'/processed/{image_id}.png',
        'mask_image_url': f'/processed/{image_id}_mask.png'
    })

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/processed/<filename>')
def processed_file(filename):
    return send_from_directory(PROCESSED_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True)
