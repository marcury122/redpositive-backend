// Placeholder validation functions for form fields

// Validate form data
const validateForm = (formData) => {
        const errors = {};
      
        // Validate name
        if (!formData.name) {
          errors.name = 'Name is required';
        }
      
        // Validate phone number
        if (!formData.phoneNumber) {
          errors.phoneNumber = 'Phone number is required';
        }
      
        // Validate email
        if (!formData.email) {
          errors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
          errors.email = 'Invalid email format';
        }
      
        // Validate hobbies (optional)
        // Add validation logic for hobbies if needed
      
        return errors;
      };
      
      // Validate email format
      const isValidEmail = (email) => {
        // Simple email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
      
      module.exports = { validateForm };
      