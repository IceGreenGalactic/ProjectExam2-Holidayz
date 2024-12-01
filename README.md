# Holidaze - Accommodation Booking Frontend

**Holidaze** is a modern, responsive accommodation booking website that allows users to browse venues, make bookings, and manage their profiles. The platform also features a powerful admin interface for venue managers to handle their venues and bookings. This project focuses on the front-end application that communicates with the **Holidaze API**.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [File Structure](#file-structure)
- [User Stories](#user-stories)
- [API Integration](#api-integration)
- [Map and Weather Functionality](#map-and-weather-functionality)
- [Contributing](#contributing)
- [License](#license)

```

## Overview

The **Holidaze** platform provides two main interfaces:

1. **Customer-facing website** – Allows users to:
   - View a list of available venues
   - Search for and filter venues based on criteria such as location, meta tags, and other parameters
   - View venue details, including location on a map, calendar of availability, and weather conditions for the destination city
   - Book a venue for specific dates
   - View upcoming bookings and profile information
2. **Admin interface** – Allows venue managers to:
   - Register as a venue manager
   - Create, update, and delete their own venues
   - View and manage bookings for their venues

The front-end application was built with React and communicates with an existing API to fetch and display venue and booking data.

```

## Features

### **Customer Features:**

- **Venue Search and Filters**: Customers can search for venues based on location, price, amenities, etc. They can also filter and sort the search results.
- **Venue Details Page**: Displays detailed information about a venue, including its location, price, available dates, and an interactive map.
- **Booking Form**: Allows registered customers to book a venue for a selected date range, with the option to choose the number of guests.
- **Customer Profile**: Customers can create a profile, upload an avatar, and view upcoming bookings.
- **Weather Forecast**: Displays the weather forecast for the selected venue’s city.
- **Booking Confirmation**: A dedicated page showing detailed information about a user's booking, including venue details, guest count, and cost.

### **Admin Features (Venue Managers):**

- **Venue Management**: Venue managers can register, create, update, and delete venues they manage.
- **Booking Management**: Managers can view bookings for their venues and manage them as necessary.
- **Profile Management**: Venue managers can update their profile and avatar.

### **Common Features:**

- **User Authentication**: Users can register, log in, and log out. Only users with valid `stud.noroff.no` emails can register as either a customer or venue manager.
- **Responsive Design**: The app is designed to be mobile-first, with a fully responsive layout that adjusts to different screen sizes.
- **Modals for CRUD Operations**: All forms for managing profiles, venues, and bookings are handled using Bootstrap modals.
- **Random Location Generator**: For venues missing location data, a random location is chosen from a predefined list of countries.

```

## Technologies Used

- **React** – Core library for building user interfaces.
- **React Router** – For handling navigation between different pages and views.
- **React Bootstrap** – For UI components like modals, forms, and grids.
- **Styled Components** – For component-level styling.
- **React-Leaflet** – For embedding interactive maps displaying venue locations.
- **React Hook Form** – For handling form validation and submission.
- **Yup** – For form schema validation.
- **FontAwesome** – For adding icons to various UI elements.
- **Vite** – A fast, modern build tool for React projects.
- **Weather API** – Integrated to display the weather forecast for the venue’s city.
- **Husky & Lint-Staged** – For pre-commit hooks and automatic formatting of code.
- **ESLint & Prettier** – For code linting and formatting to maintain code quality.

```

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/holidayz-frontend.git
cd holidayz-frontend
```

2. Install dependencies

Make sure you have Node.js (v14 or above) installed on your machine. Then, run the following command to install the project dependencies:

```bash
npm install

```

3. Setup environment variables

Create a .env file in the root of the project and define any necessary environment variables. For example:

```bash
npm install

```

```bash
 REACT_APP_API_URL=https://api.holidaze.com REACT_APP_WEATHER_API_KEY=your-weather-api-key
```
Note: The .env file should look like this:
```bash
VITE_API_BASE_URL=https://api.holidaze.com
VITE_API_KEY=your-api-key
```

4. Run the app

Start the development server:

```bash
npm run dev
```

This will start the application on http://localhost:3000.

## User Stories

Here are the main user stories covered by the application:

1. **Customer-facing features:**
   - As a user, I want to search for venues and filter them based on location and price.
   - As a user, I want to view detailed information about a specific venue.
   - As a registered user, I want to book a venue for a specific date range.
   - As a user, I want to view my upcoming bookings.
   - As a user, I want to view the weather forecast for the venue's location.

2. **Admin-facing features:**
   - As a venue manager, I want to manage my venue (create, edit, delete).
   - As a venue manager, I want to view bookings for my venue.
   - As a venue manager, I want to update my profile and avatar.

```

## API Integration

The application communicates with the following API endpoints:

- **Auth API**: Manages user authentication (register, login, logout, and profile management).
- **Venue API**: Handles venue data (create, update, delete, search).
- **Booking API**: Manages customer bookings (create, view, manage).
- **Weather API**: Fetches the weather forecast for the venue’s location.

All API requests are handled using **Axios** for data fetching, and error handling is integrated throughout the app.

```

## Map and Weather Functionality

- The app integrates with **React-Leaflet** to display an interactive map showing the venue's location.
- The weather for each venue's city is fetched from an external **Weather API** and displayed to users on the venue detail page.
- A **random location generator** is used to populate missing location data for venues that don’t have coordinates or other location-specific information.

```

## Contributing

We welcome contributions! To contribute to the project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -m 'Add feature'`).
4. Push the changes to your fork (`git push origin feature-name`).
5. Create a pull request.

Please follow the code style and ensure all new code is properly tested.

```

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more information.
