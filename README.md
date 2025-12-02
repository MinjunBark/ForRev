# ForRev

## Overview

ForRev is a modern, full-stack event management system designed to streamline the process of creating, organizing, and managing events. Built with a sleek dark-themed interface, ForRev provides users with an intuitive platform to handle all aspects of event planning - from creating events with detailed information to tracking attendees and managing event logistics. The system features a comprehensive dashboard that displays all events in an organized card-based layout, making it easy to view and manage multiple events at a glance.

The application consists of a React-based frontend (forrev-ui) and a backend API (forrev-api) that work together to provide a seamless event management experience. Whether you're organizing parties, corporate events, or social gatherings, ForRev offers the tools you need to keep everything organized in one place.

## Features

### User Authentication
- **Secure Sign Up/Sign In**: User registration with username, email, and password
- **Session Management**: Secure user sessions with personalized dashboards
- **User Profiles**: Each user gets their own profile with avatar display

### Event Management
- **Create Events**: Intuitive modal interface for creating new events with:
  - Event title
  - Detailed description
  - Location information
  - Start and end date/time pickers
  
- **View Events**: Dashboard displaying all events in a card-based grid layout showing:
  - Event title and description
  - Start and end times
  - Location information
  - Event creator and attendees
  - Creation and update timestamps
  
- **Edit Events**: Modify existing event details through an easy-to-use edit modal
- **Delete Events**: Remove events with a single click
- **Event Status**: Visual indicators showing whether events are created by you or if you're attending

### Dashboard Features
- **Event Counter**: Real-time display of total number of events
- **Responsive Grid Layout**: Events displayed in an organized card grid
- **Event Highlighting**: Visual distinction with blue borders for better organization
- **Quick Actions**: Easy access to create, edit, and delete functions
- **Sidebar Navigation**: Quick access to Events and Invite sections
- **User Welcome Message**: Personalized greeting with username display

### User Interface
- **Modern Dark Theme**: Sleek black and dark gray color scheme with cyan/blue accents
- **Responsive Design**: Clean, organized layout that works across different screen sizes
- **Intuitive Modals**: Popup interfaces for creating and editing events
- **Visual Feedback**: Color-coded buttons and hover effects for better user experience
- **Icon Integration**: Location pins and user avatars for visual clarity

## Screenshots

### Sign In Page
![Sign In](https://github.com/MinjunBark/ForRev/blob/master/ForRev%20screenshots/Screenshot%202025-11-13%20at%2012.24.55%E2%80%AFPM.png)
*Clean authentication page with username and password fields*

### Sign Up Page
![Sign Up](https://github.com/MinjunBark/ForRev/blob/master/ForRev%20screenshots/Screenshot%202025-11-13%20at%2012.25.05%E2%80%AFPM.png)
*User registration page with username, email, and password fields*

### Events Dashboard
![Events Dashboard](https://github.com/MinjunBark/ForRev/blob/master/ForRev%20screenshots/Screenshot%202%20(Updated%20endpoints%20%2B%20features)/dashboard.png)
*Main dashboard showing all events in a grid layout with event cards displaying titles, dates, locations, and attendees*

### Create Event Modal
![Create Event](https://github.com/MinjunBark/ForRev/blob/master/ForRev%20screenshots/Screenshot%202025-11-13%20at%204.22.56%E2%80%AFPM.png)
*Modal interface for creating new events with fields for title, description, location, and date/time selection*

### Update Event Modal
![Update Event](https://github.com/MinjunBark/ForRev/blob/master/ForRev%20screenshots/Screenshot%202025-11-13%20at%204.23.53%E2%80%AFPM.png)

### Event Details
![Event Details](https://github.com/MinjunBark/ForRev/blob/master/ForRev%20screenshots/Screenshot%202025-11-13%20at%204.23.41%E2%80%AFPM.png)
*Detailed view of an event showing all information including start/end times, location, creator, and action buttons for editing or deleting*

### Profile Navigation
![Profile Navigation](https://github.com/MinjunBark/ForRev/blob/master/ForRev%20screenshots/Screenshot%202%20(Updated%20endpoints%20%2B%20features)/profile%20nav.png)
*User profile / Logout 

### Profile Dashboard
![Profile Dashboard](https://github.com/MinjunBark/ForRev/blob/master/ForRev%20screenshots/Screenshot%202%20(Updated%20endpoints%20%2B%20features)/Profile%20dashboard.png)
*Personal dashboard showing all events + invited events 


## Technology Stack

### Frontend (forrev-ui)
- React.js
- Modern CSS with dark theme
- Responsive design principles

### Backend (forrev-api)
- RESTful API architecture
- User authentication and authorization
- Event CRUD operations


## Usage

1. **Sign Up**: Create a new account with username, email, and password
2. **Sign In**: Log in with your credentials
3. **Create Events**: Click the "+ Create Event" button to add new events
4. **Manage Events**: View all your events on the dashboard
5. **Edit Events**: Click on any event card and use the "Edit Event" button to modify details
6. **Delete Events**: Remove events using the "Delete Event" button
7. **Track Attendees**: See who's attending each event directly on the event cards

## Future Enhancements

- Event invitation system
- Calendar view integration
- Event reminders and notifications
- Photo uploads for events
- Event categories and filtering
- Search functionality
- Mobile app version
