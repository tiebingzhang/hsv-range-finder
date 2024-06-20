# HSV Range Finder

HSV Range Finder is a web application that allows users to upload an image, adjust the Hue, Saturation, and Value (HSV) ranges, and apply optional dilation to generate a masked image. The application uses Flask for the backend and `noUiSlider` for creating the multi-range sliders in the frontend.

## Features

- Upload an image and immediately see the original image and the masked image.
- Adjust HSV ranges using intuitive multi-range sliders.
- Apply dilation with a configurable number of iterations.
- View the original image, masked image, and mask image for debugging.

## Prerequisites

- Python 3.x
- `pip` (Python package installer)

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/tiebingzhang/hsv-range-finder.git
   cd hsv-range-finder
   ```

2. **Create a virtual environment:**

    ```sh
    python -m venv hsv-env
    ```
3. **Activate the virtual environment:**

    On Windows:

    ```sh
        hsv-env\Scripts\activate
    ```

    On macOS and Linux:

    ```sh
        source hsv-env/bin/activate
    ```

4. **Install the required packages:**

    ```sh
    pip install flask opencv-python-headless
    ```

5. **Running the Application**

    Start the Flask app:

    ```sh
        python app.py
    ```
    Open your browser and navigate to:

    ```sh
    http://127.0.0.1:5000/
    ```

## Project Structure

```sql
hsv-range-finder/
│
├── app.py
├── static/
│   ├── css/
│   └── js/
│       └── script.js
├── templates/
│   └── index.html
├── uploads/
├── processed/
└── README.md
```

    - app.py: The Flask backend that handles image upload and processing.
    - static/js/script.js: Contains the JavaScript for handling the frontend interactions.
    - templates/index.html: The main HTML file for the frontend.
    - uploads/: Directory where uploaded images are stored.
    - processed/: Directory where processed images are stored.

## Usage

- Upload an image:
  - Click on the file input to select an image from your computer.

- Adjust HSV ranges:
  - Use the sliders to adjust the Hue, Saturation, and Value ranges.

- Apply dilation (optional):
  - Check the "Dilate" checkbox to enable dilation.
  - Adjust the number of dilation iterations using the slider.

- View the results:
  - The original image, masked image, and mask image will be displayed on the right side of the page.

## Dependencies

    - Flask
    - OpenCV (cv2)
    - jQuery
    - noUiSlider
    - Bootstrap

## Contributing

    - Fork the repository.
    - Create a new branch (git checkout -b feature-branch).
    - Make your changes and commit them (git commit -am 'Add new feature').
    - Push to the branch (git push origin feature-branch).
    - Create a new Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Note
This application is developed entirely by chatGPT within an hour, with prompt and test feedback from human, but no code
written by human.
