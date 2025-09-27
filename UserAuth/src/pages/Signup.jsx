import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { fullName: "", email: "", password: "" },
    validate: {
      fullName: (value) => (value.trim().length < 2 ? "Full name is too short" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 6 ? "Password must be at least 6 chars" : null),
    },
  });

  const handleSignup = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Prevent duplicate emails
    const exists = users.find((u) => u.email.toLowerCase() === values.email.toLowerCase());
    if (exists) {
      alert("User already exists with this email.");
      return;
    }

    // Save new user
    users.push(values);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Please login.");
    navigate("/login");
  };

  // If already logged in, redirect away
  if (localStorage.getItem("isLoggedIn") === "true") {
    navigate("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={form.onSubmit(handleSignup)}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Sign Up</h2>

        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          {...form.getInputProps("fullName")}
          className="mb-4"
          required
        />

        <TextInput
          label="Email"
          placeholder="Enter your email"
          {...form.getInputProps("email")}
          className="mb-4"
          required
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          {...form.getInputProps("password")}
          className="mb-6"
          required
        />

        <Button type="submit" fullWidth>
          Sign Up
        </Button>

        <Button
          variant="default"
          fullWidth
          className="mt-4"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </Button>
      </form>
    </div>
  );
}

export default Signup;
