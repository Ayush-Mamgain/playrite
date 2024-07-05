# Playrite

Playrite is an innovative platform similar to Stake.com, designed for hassle-free betting on local tournaments. It allows users to create matches and share links for others to place bets, providing a seamless and engaging betting experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Improvements](#project-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Match Creation and Betting**: Users can create matches and share invite code for others to place bets.
- **Realtime Updates**: Integration with Socket.io for instant updates.
- **Token-Based Authentication**: Secure authentication and authorization using JSON Web Tokens (JWT).
- **User Stats and Data Monitoring**: Comprehensive tracking and display of user statistics.
- **Instant Deposits and Withdrawals**: Fast and secure transactions using Razorpay APIs.
- **Global State Management**: Efficient state management with React-Redux and Redux Toolkit.
- **RESTful API Integration**: Manage API calls seamlessly with Axios.
- **Route Management**: Efficient navigation and route management using React-Router.

## Tech Stack

- **Frontend**: React, Redux Toolkit, React-Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Realtime Communication**: Socket.io
- **Authentication**: JSON Web Tokens (JWT)
- **Payments**: Razorpay APIs

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/playrite.git
    cd playrite
    ```

2. **Install dependencies**:
    ```sh
    # For backend
    cd server
    npm install

    # For frontend
    cd ../client
    npm install
    ```

3. **Configure environment variables**:
   Create a `.env` file in the `server` directory and add the necessary environment variables.

4. **Run the application**:
    ```sh
    # Start backend server
    cd server
    npm start

    # Start frontend server
    cd ../client
    npm start
    ```

## Usage

1. **Create Matches**: Users can create matches and generate shareable links.
2. **Place Bets**: Users with the link can place bets on the matches.
3. **Track Results**: Realtime updates keep users informed about match status and results.
4. **Manage Funds**: Users can deposit and withdraw funds instantly using Razorpay.

## Project Improvements

- **Form Management**: Implementing `react-hook-form` for efficient and uncontrolled form management.
- **Profile Management**: Adding RESTful APIs to allow users to update their profile details.

## Contributing

We welcome contributions to enhance Playrite. Please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

- **Project Link**: [https://github.com/yourusername/playrite](https://github.com/yourusername/playrite)
- **Email**: yourname@example.com

---

*This README was generated with ❤️ by [Your Name](https://github.com/yourusername).*
