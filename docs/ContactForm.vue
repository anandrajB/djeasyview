<template>
  <div class="contact-form-container">
    <h2>Contact Us</h2>
    <form id="contact-form" @submit.prevent="handleSubmit">
      <input type="text" v-model="form.name" name="name" placeholder="Your Name" required>
      <input type="email" v-model="form.email" name="email" placeholder="Your Email" required>
      <textarea v-model="form.message" name="message" placeholder="Your Message" required></textarea>
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      // Here you would typically send the form data to a server
      // For demonstration, we'll just log it to the console
      console.log(this.form);

      // If you're using Netlify Forms, you'd also want to submit the form to Netlify:
      // const form = document.getElementById('contact-form');
      // const formData = new FormData(form);
      // fetch('/', {
      //   method: 'POST',
      //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
      //   body: new URLSearchParams(formData).toString()
      // }).then(() => console.log('Form successfully submitted')).catch((error) =>
      //   alert(error))

      alert('Form submitted! Check the console for details.');
      this.form = { name: '', email: '', message: '' };
    }
  }
}
</script>

<style scoped>
.contact-form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  color: #333;
}

#contact-form {
  display: flex;
  flex-direction: column;
}

#contact-form input,
#contact-form textarea {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

#contact-form textarea {
  height: 150px;
}

#contact-form button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

#contact-form button:hover {
  background-color: #45a049;
}
</style>