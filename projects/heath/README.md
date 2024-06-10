## Spot the Shocka!
## Table of Contents
1. [Project Overview](#project-overview)
2. [Current Features](#current-features)
3. [Getting Started](#getting-started)
4. [How To Use](#how-to-use)
5. [Current Known Issues](#current-known-issues)
6. [Future Goals](#future-goals)
7. [Contributing](#contributing)

## Project Overview
The Interactive Image Website is a tool designed to enhance workplace safety by allowing users to mark specific areas on images with flags. These flags can be annotated with notes, making it easier to identify and communicate potential hazards. The project utilizes Fabric.js for canvas functionalities, Tailwind CSS for styling, and Theme UI for managing themes.

## Current Features
- **Theme Management**: Users can switch between light and dark themes, as well as select different color schemes.
- **Interactive Flags**: Users can place small and large flags on the image, which are color-coded and come with an input box for annotations.
- **Sidebar Navigation**: A collapsible sidebar for easy navigation.
- **Resizable and Draggable Flags**: Flags can be dragged and resized, ensuring flexibility in marking areas on the image.
- **Recall Functions**: Functions to recall the last placed flag or all flags.
- **Responsive Design**: The interface adapts to different screen sizes, providing a consistent user experience.

## Getting Started
### Prerequisites
- A web browser (Google Chrome, Mozilla Firefox, etc.)
- Basic knowledge of HTML, CSS, and JavaScript
- Local server for testing (optional, but recommended for full functionality)

### Installation
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/interactive-image-website.git
    ```
2. **Navigate to the Project Directory**:
    ```bash
    cd interactive-image-website
    ```
3. **Open `index.html` in Your Web Browser**:
    - You can simply open the `index.html` file in your web browser to view the project.
    - For better testing, consider using a local server.

## How To Use
1. **Opening the Sidebar**:
    - Click on the "☰ Open Sidebar" button to open the sidebar.
    - Use the sidebar to navigate to different sections such as "Spot the Shocka!", "Submit Answers", "Admin Login", "Image Upload", and "About".

2. **Selecting a Theme**:
    - Click on the "Themes" button in the top banner to open the theme dropdown menu.
    - Select a theme from the options available. The site will change colors based on the selected theme.
    - Use the toggle switch in the top right to switch between light and dark mode.

3. **Placing Flags**:
    - Click on the image to place a flag. The flag will be placed at the location of the click.
    - Use the checkbox to toggle between small yellow flags and larger red flags.
    - Enter any notes or annotations in the input box that appears with the flag.

4. **Recalling Flags**:
    - Use the "Recall Last" button to remove the last placed flag.
    - Use the "Recall All" button to remove all flags from the image.

## Current Known Issues
1. **Flag Positioning**: Flags sometimes do not appear exactly where the mouse is clicked.
2. **Theme Application**: Some elements may not update their styles immediately after changing themes.
3. **Dropdown Menu**: The dropdown menu for themes might not be fully visible on smaller screens.
4. **Sidebar**: The sidebar does not always close when clicking outside of it.

## Future Goals
1. **Improved Flag Positioning**: Ensure flags are placed accurately based on mouse clicks.
2. **Enhanced Theme Management**: Improve the application of themes to all elements.
3. **Mobile Responsiveness**: Enhance the mobile responsiveness of the dropdown menu and sidebar.
4. **User Authentication**: Implement user authentication for the admin section.
5. **Backend Integration**: Integrate a backend service to save and load user data.

## Contributing
We welcome contributions from the community. To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

For any questions or issues, please contact [your email].

---

Feel free to modify this README file to better fit your project's specifics and your preferences. Let me know if there's anything else you need!
