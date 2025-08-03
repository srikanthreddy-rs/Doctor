## Challenges Faced

During the development of the **Doctor Booking Application**, the following challenges were encountered:

### 1. Setting Up Project Structure (React + TypeScript)
- Adapting TypeScript with React required careful typing of props, states, and API responses.
- Managing types across multiple components without cluttering the codebase was challenging.

### 2. Designing Responsive UI with Tailwind CSS
- Balancing aesthetic layout and responsiveness across devices (mobile, tablet, desktop).
- Understanding Tailwind's utility-first approach and combining multiple classes efficiently.
- Consistency in card spacing, button styling, and form responsiveness was iterative.

### 3. Implementing Search Functionality
- Handling case-insensitive search for both doctor names and specializations.
- Optimizing search performance with debouncing (optional) was considered but not implemented due to time constraints.

### 4. Dynamic Routing to Doctor Profile
- Managing routing using `react-router-dom` for dynamic doctor details page.
- Correctly extracting `doctorId` from URL params and mapping it to the corresponding doctor data.

### 5. Booking Form & Validation
- Designing a clean and intuitive appointment booking form with proper validations:
  - Valid name and email format.
  - Ensuring selected date/time is in the future.
- Maintaining form state and providing real-time feedback on validation errors.

### 6. Backend Integration (Bonus)
- Setting up a basic **Node.js + Express** server to serve doctor data and accept appointments.
- Dealing with CORS issues while making frontend-backend API calls.
- Parsing and validating incoming form data on the server.

### 7. Confirmation & Feedback UX
- Displaying a smooth confirmation message post-booking without redirecting or reloading.
- Maintaining clean UX for both success and error states.

### 8. Git & Deployment
- Managing GitHub repo and branches for organized development.
- Ensuring environment variables, build folders, and CORS settings were correctly configured for deployment.


