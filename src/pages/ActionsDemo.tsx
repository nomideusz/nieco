import { createSignal } from "solid-js";
import { action, useAction, useSubmission, redirect } from "@solidjs/router";

// Simple Title component replacement for solid-meta
const Title = (props: { children: string }) => {
  if (typeof document !== 'undefined') {
    document.title = props.children;
  }
  return null;
};

// Simple echo action that returns the message
const echo = action(async (formData: FormData) => {
  // Simulate server delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const message = formData.get("message") as string;
  
  // Return error if message is empty
  if (!message || message.trim() === "") {
    return new Error("Message cannot be empty");
  }
  
  return message;
});

// Admin access check action with redirect
const checkAdmin = action(async (formData: FormData) => {
  // Simulate server delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const username = formData.get("username") as string;
  
  if (username === "admin") {
    // In a real app, this would redirect to an admin page
    throw redirect("/dashboard?role=admin");
  }
  
  return new Error("Invalid username. Try 'admin'");
});

// Programmatic action example
const programmaticEcho = action(async (message: string) => {
  // Simulate server delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return `Echo: ${message}`;
});

const ActionsDemo = () => {
  const [showAdminForm, setShowAdminForm] = createSignal(false);
  
  // For form submissions
  const echoSubmission = useSubmission(echo);
  const adminSubmission = useSubmission(checkAdmin);
  
  // For programmatic action calls
  const myEcho = useAction(programmaticEcho);
  const programmaticSubmission = useSubmission(programmaticEcho);
  
  const handleProgrammaticAction = () => {
    myEcho("Hello from Solid!");
  };

  return (
    <div class="container mx-auto p-4">
      <Title>Actions Demo</Title>
      <h1 class="text-2xl font-bold mb-6">Solid.js Actions Demo</h1>
      
      <div class="grid gap-8">
        <section class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Form Action - Echo Message</h2>
          <p class="mb-4">Submit a message to see it echoed back:</p>
          
          <form action={echo} method="post" class="mb-4">
            <div class="mb-3">
              <label for="message" class="block mb-1">Message:</label>
              <input 
                type="text" 
                name="message" 
                id="message"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button 
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>

          {echoSubmission.pending && (
            <p class="text-gray-600">Processing...</p>
          )}
          
          {echoSubmission.result && (
            <div class="mt-4 p-4 bg-green-100 rounded">
              <h3 class="font-semibold">Result:</h3>
              <p>{echoSubmission.result instanceof Error ? 
                <span class="text-red-600">{echoSubmission.result.message}</span> : 
                echoSubmission.result}
              </p>
            </div>
          )}
        </section>

        <section class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Programmatic Action</h2>
          <p class="mb-4">Call an action programmatically:</p>
          
          <button 
            onClick={handleProgrammaticAction}
            class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
          >
            Trigger Action
          </button>
        
          {programmaticSubmission.pending && (
            <p class="text-gray-600 mt-2">Processing...</p>
          )}
        
          {programmaticSubmission.result && (
            <div class="mt-4 p-4 bg-green-100 rounded">
              <h3 class="font-semibold">Result:</h3>
              <p>{programmaticSubmission.result}</p>
            </div>
          )}
        </section>
        
        <button 
          onClick={() => setShowAdminForm(!showAdminForm())}
          class="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded mb-4"
        >
          {showAdminForm() ? "Hide Admin Form" : "Show Admin Form"}
        </button>
      
        {showAdminForm() && (
          <section class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-4">Action with Redirect</h2>
            <p class="mb-4">Try logging in as "admin" to be redirected:</p>
            
            <form action={checkAdmin} method="post">
              <div class="mb-3">
                <label for="username" class="block mb-1">Username:</label>
                <input 
                  type="text" 
                  name="username" 
                  id="username"
                  class="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button 
                type="submit"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Log In
              </button>
            </form>
            
            {adminSubmission.pending && (
              <p class="text-gray-600 mt-2">Processing...</p>
            )}
            
            {adminSubmission.result && adminSubmission.result instanceof Error && (
              <div class="mt-4 p-4 bg-red-100 rounded">
                <h3 class="font-semibold">Error:</h3>
                <p class="text-red-600">{adminSubmission.result.message}</p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default ActionsDemo; 