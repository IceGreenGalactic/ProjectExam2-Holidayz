# Holidaze - Accommodation Booking Frontend

![image](/src/assets/images/Screenshot-Holidaze.png)

**Holidaze** is a modern, responsive accommodation booking website that allows users to browse venues, make bookings, and manage their profiles. The platform also features a powerful admin interface for venue managers to handle their venues and bookings. This project focuses on the front-end application that communicates with the **Holidaze API**.

## Description

The **Holidaze** platform provides two main interfaces:

- **Customer-facing website** – Allows users to view, search, and book venues, along with managing their profile and viewing weather forecasts for their selected venues.
- **Admin interface** – Allows venue managers to register, create, update, and delete their venues and manage bookings.

Key features include:

- Searchable venue listings with filters by location, price, and amenities.
- Detailed venue information, including availability, price, and an interactive map.
- A booking system for customers to select dates, add guests, and view booking details.
- An admin interface to manage venues and bookings.
- User authentication via email, with email validation.
- Weather forecasts for venue locations, giving customers an idea of what to expect during their stay.

The front-end application was built with **React** and communicates with an existing API to fetch and display venue and booking data.

## Built With

- [React.js](https://reactjs.org/) - Core library for building user interfaces.
- [React Router](https://reactrouter.com/) - For handling navigation between different pages and views.
- [React Bootstrap](https://react-bootstrap.github.io/) - For UI components like modals, forms, and grids.
- [Styled Components](https://styled-components.com/) - For component-level styling.
- [React-Leaflet](https://react-leaflet.js.org/) - For embedding interactive maps displaying venue locations.
- [Weather API](https://openweathermap.org/api) - Integrated to display the weather forecast for the venue’s city.
- [Vite](https://vitejs.dev/) - A fast, modern build tool for React projects.
- [ESLint & Prettier](https://eslint.org/) - For code linting and formatting to maintain code quality.
- [Husky & Lint-Staged](https://github.com/okonet/lint-staged) - For pre-commit hooks and automatic code formatting.

## Features

### **Customer Features:**

- **Venue Search and Filters**: Customers can search for venues based on location, price, amenities, etc., and filter results to match specific criteria.
- **Venue Details Page**: Displays detailed information about a venue, including location, price, available dates, and an interactive map.
- **Booking Form**: Allows registered customers to book a venue for a specific date range and select the number of guests.
- **Booking Management**: Registered customers can view edit and delete their bookings.
- **Customer Profile**: Customers can create a profile, upload an avatar, and view upcoming bookings.
- **Weather Forecast**: Displays the weather forecast for the selected venue’s city to help customers plan their stay.
- **Booking Confirmation**: A page showing detailed information about a user's booking, including venue details, guest count, and cost.

### **Admin Features (Venue Managers):**

- **Venue Management**: Venue managers can register, create, update, and delete the venues they manage.
- **Booking Management**: Managers can view and manage bookings for their venues.

### **Common Features:**

- **User Authentication**: Users can register, log in, and log out. Only users with valid `stud.noroff.no` emails can register as either a customer or venue manager.
- **Responsive Design**: The app is mobile-first and adapts to various screen sizes, ensuring a seamless experience across devices.
- **Random Location Generator**: If a venue is missing location data, a random location is chosen from a predefined list of countries to fill in the gaps.

## Getting Started

### Installing

1. Clone the repository:

   ```
   git clone https://github.com/your-username/holidayz-frontend.git
   cd holidayz-frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

### Running

To run the app locally, use the following commands:

```
npm run dev
```

The app will start at **http://localhost:5173** (the port may vary, depending on your system's availability).

## Contributing

We welcome contributions! If you'd like to help improve the project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -m 'Add feature'`).
4. Push the changes to your fork (`git push origin feature-name`).
5. Create a pull request to submit your changes.

Please ensure that all new code adheres to the project's code style and is properly tested.

## API Integration

The application communicates with several API endpoints:

- **Auth API**: Manages user authentication (register, login, logout, profile management).
- **Venue API**: Handles venue data (create, update, delete, search).
- **Booking API**: Manages customer bookings (create, view, manage).
- **Weather API**: Fetches the weather forecast for the venue’s city.

### Map and Weather Functionality

- **Interactive Maps**: The app integrates with **React-Leaflet** to display an interactive map showing the venue's location on a map.
- **Weather Integration**: The weather forecast for the venue’s city is fetched from an external **Weather API** and displayed on the venue details page. This provides users with real-time weather information for their selected venue's location.
- **Random Location Generator**: If a venue does not have any location data, a random location is selected from a predefined list to populate missing location information.

## Contact

- [My LinkedIn page](https://www.linkedin.com/in/kristine-tyrholm-7902172a4)
- [My Portforlio](https://kristinetyrholm.netlify.app)
