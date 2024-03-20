
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
// import { getSession } from 'next-auth/client'
import { getSession } from "next-auth/react";
// toster package
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const email = useRef();
  const password = useRef();
  const router = useRouter();

  const [emailv, setemailV] = useState("");
  const [passwordv, setpasswordV] = useState("");

  const passwordInput = (event) => {
    setpasswordV(event.target.value);
  };

  const emailInput = (event) => {
    setemailV(event.target.value);
  };

  async function submitForm(event) {
    event.preventDefault();
    setIsSubmitting(true);
    const emailI = email.current.value;
    const passwordI = password.current.value;

    const reBody = {
      password: passwordI,
      email: emailI,
    };
    if (emailI && passwordI) {
      const response = await signIn("credentials", {
        email: emailI,
        password: passwordI,
        redirect: false,
      });

      if (response.error == null) {
        router.push("/");
      } else {
        toast.error("Check email and password", {
          position: toast.POSITION.TOP_CENTER,
        });
        setIsSubmitting(false);
      }
    } else {
      toast.error("Check email and password", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <link rel="stylesheet" href="assets/css/login.css" />
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={submitForm}>
          <input
            type="email"
            placeholder="Email"
            ref={email}
            value={emailv}
            onChange={emailInput}
            required
          />
          <input
            type="password"
            placeholder="Password"
            ref={password}
            value={passwordv}
            onChange={passwordInput}
            required
          />
          <button
            type="submit"
            className="btn btn-primary btn-block btn-large"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Please wait..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
