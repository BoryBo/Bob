# Bob

## Shift Planning Web App

![image](./client/public/ROBOSCRUBS.PNG)

### Overview

Bob is a tool designed to help managers scheduling employees' shifts over a period of 28 days. Bob allows users to customise the number of employees, shift types, and the number of required shifts for each day. Bob then generates a schedule that ensures coverage for all shifts, as well as employees' wellbeing, by capping the maximum number of hours and ensuring each has a sufficient numbers of hours off work.

### Features

Bob has the following features:

- Employee Input: Users can input the names of employees who will be scheduled for shifts.
- Shift Input: Users can input the different types of shifts that need to be scheduled (e.g. morning shift, evening shift, overnight shift).
- Shift Requirements Input: Users can input the number of required shifts for each day, for each shift type.
- Schedule Generation: Once the user inputs all the necessary information, the app generates a schedule that ensures all required shifts are covered.
- Schedule Display: The generated schedule is displayed to the user in an easy-to-read calendar-like format.

## Tech stack

The Shift Planning Web App is built using the following technologies:

- Frontend: Frontend: [![React](https://img.shields.io/badge/React-blue?logo=react&logoColor=white)](https://reactjs.org/)
  [![React Router](https://img.shields.io/badge/React%20Router-red?logo=reactrouter&logoColor=white)](https://reactrouter.com/en/main)
- Styling: [![CSS3](https://img.shields.io/badge/CSS3-blue?logo=css3&logoColor=white)]()
- Backend:
  [![Express.js](https://img.shields.io/badge/Express.js-grey?logo=express&logoColor=white)](https://expressjs.com/)
  [![Sequelize](https://img.shields.io/badge/Sequelize-blue?logo=sequelize&logoColor=white)](https://sequelize.org/)
- Database: [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
- Version Control: [![Git](https://img.shields.io/badge/Git-white?logo=git&logoColor=orange)]()

### Critical User Journey

The following is an example user flow for the Shift Planning Web App:

1. User opens the app and is presented with a form to input available employees, shift types, and required shifts for each day.

2. User inputs the necessary information and submits the form.

3. The app generates a rota based on the inputs provided and displays it to the user.

## Running the app

In order to install all the required dependencies, open a terminal from the root folder and run:

```bash
npm install
```

Once the installation is completed, simply run:

```bash
npm run start:server-client
```
