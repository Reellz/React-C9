import { useSignIn, useUser } from "@clerk/clerk-react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button, Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function Login() {
  const { signIn, isLoaded } = useSignIn();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 6 ? "Password must be at least 6 chars" : null),
    },
  });

  // --- LocalStorage login ---
  const handleLocalLogin = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase() === values.email.toLowerCase() &&
        u.password === values.password
    );

    if (foundUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      alert(`Welcome back, ${foundUser.fullName}!`);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  // --- Clerk login ---
  const handleClerkLogin = async (values) => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: "password",
        identifier: values.email,
        password: values.password,
        redirectUrl: "/dashboard",
      });
    } catch (err) {
      console.error(err);
      alert("Invalid credentials. Please try again.");
    }
  };

  // --- Google login ---
  const handleGoogleLogin = async () => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/dashboard",
      });
    } catch (err) {
      console.error(err);
      alert("Google login failed. Please try again.");
    }
  };

  // Decide which login flow to use
  const handleSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase() === values.email.toLowerCase() &&
        u.password === values.password
    );

    if (foundUser) {
      handleLocalLogin(values);
    } else {
      handleClerkLogin(values);
    }
  };

  // Redirect if already signed in
  if (isSignedIn || localStorage.getItem("isLoggedIn") === "true") {
    navigate("/dashboard");
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader size="xl" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login
        </h2>

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

        <Button type="submit" fullWidth className="mb-4">
          Login
        </Button>

        <div className="my-6 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <Button
          type="button"
          onClick={handleGoogleLogin}
          variant="outline"
          fullWidth
          className="flex items-center justify-center gap-2 mb-4"
        >
          <img
            src="/src/assets/google-icon.svg"
            alt="Google"
            className="h-5 w-5"
          />
          Sign in with Google
        </Button>

        <Button
          variant="default"
          fullWidth
          onClick={() => navigate("/signup")}
        >
          Don’t have an account? Sign Up
        </Button>
      </form>
    </div>
  );
}

export default Login;
